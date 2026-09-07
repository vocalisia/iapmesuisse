type Contact = { name: string; email: string; company: string; phone: string; website: string; message: string };
type Sender = (mail: { from: string; to: string; replyTo: string; subject: string; text: string }) => Promise<{ data?: { id: string } | null; error?: unknown }>;
const failure = (status: number, error: string) => Response.json({ success: false, error }, { status });
function field(value: unknown, max: number, required = false): string {
  if (value === undefined && !required) return '';
  if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000B-\u001F\u007F\u202A-\u202E\u2066-\u2069]/.test(value) || (required && !value.trim())) throw Error('Invalid field');
  return value.trim();
}
function validate(raw: unknown): Contact {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw Error('Invalid body');
  const v = raw as Record<string, unknown>;
  if (v.botcheck) throw Error('Invalid submission');
  const name = field(v.name, 120, true), email = field(v.email, 254, true), company = field(v.company, 180), phone = field(v.phone, 40), website = field(v.website, 500), message = field(typeof v.message === 'string' ? v.message.replace(/\r\n/g, '\n') : v.message, 10000, true);
  if (/[\r\n]/.test(name + email + company) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw Error('Invalid identity');
  if (phone && (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 9 || phone.replace(/\D/g, '').length > 15)) throw Error('Invalid phone');
  if (website) { const url = new URL(website); if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw Error('Invalid website'); }
  return { name, email, company, phone, website, message };
}
export async function handleContact(request: Request, send: Sender): Promise<Response> {
  let contact: Contact;
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) return failure(415, 'Format non pris en charge.');
    if (Number(request.headers.get('content-length')) > 32768) return failure(413, 'Message trop volumineux.');
    const reader = request.body?.getReader(); if (!reader) return failure(400, 'Informations manquantes.');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > 32768) { await reader.cancel(); return failure(413, 'Message trop volumineux.'); } chunks.push(part.value); }
    const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    contact = validate(JSON.parse(new TextDecoder().decode(bytes)));
  } catch { return failure(400, 'Vérifiez les informations du formulaire.'); }
  try {
    const result = await send({ from: 'IAPME Suisse <noreply@iapmesuisse.ch>', to: 'contact@vocalis.pro', replyTo: contact.email, subject: 'IAPME Suisse — Nouveau message de ' + contact.name,
      text: ['Nouveau message via iapmesuisse.ch', 'Nom : ' + contact.name, 'Email : ' + contact.email, 'Entreprise : ' + contact.company, 'Téléphone : ' + contact.phone, 'Site web : ' + contact.website, '', contact.message].join('\n') });
    if (result.error || !result.data?.id) return failure(502, 'Votre envoi n’a pas été confirmé.');
    return Response.json({ success: true });
  } catch { return failure(502, 'Votre envoi n’a pas été confirmé.'); }
}
