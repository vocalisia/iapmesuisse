import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'IAPME Suisse <noreply@iapmesuisse.ch>',
      to: process.env.CONTACT_EMAIL || 'contact@iapmesuisse.ch',
      replyTo: email,
      subject: `Nouveau contact de ${name}${company ? ` (${company})` : ''}`,
      html: `
        <h2>Nouveau message via iapmesuisse.ch</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ''}
        <p><strong>Message :</strong></p>
        <blockquote style="border-left:3px solid #1B2A4A;padding-left:12px;color:#444;">${message.replace(/\n/g, '<br>')}</blockquote>
        <hr>
        <small>Envoyé depuis iapmesuisse.ch le ${new Date().toLocaleString('fr-CH', { timeZone: 'Europe/Zurich' })}</small>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
