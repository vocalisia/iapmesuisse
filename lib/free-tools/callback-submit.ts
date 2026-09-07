import { callbackPayload, type Callback, type Diagnosis } from './agent-diagnostic';
export async function submitCallback(diagnosis: Diagnosis, callback: Callback, sourcePath: string, send: typeof fetch = fetch): Promise<void> {
  const payload = callbackPayload(diagnosis, callback, sourcePath);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await send('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
    const result = await response.json();
    if (!response.ok || result?.success !== true) throw new Error('Votre envoi n’a pas été confirmé. Réessayez plus tard ou utilisez la page Contact.');
  } catch {
    throw new Error('Votre envoi n’a pas été confirmé. Vos informations sont conservées dans ce formulaire ; vous pouvez réessayer ou utiliser la page Contact.');
  } finally { clearTimeout(timer); }
}
