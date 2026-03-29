import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'IAPME Suisse <noreply@iapmesuisse.ch>',
      to: process.env.CONTACT_EMAIL || 'contact@iapmesuisse.ch',
      subject: `Nouvelle inscription newsletter : ${email}`,
      html: `
        <h2>Nouvelle inscription newsletter</h2>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <hr>
        <small>Inscrit depuis iapmesuisse.ch le ${new Date().toLocaleString('fr-CH', { timeZone: 'Europe/Zurich' })}</small>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
