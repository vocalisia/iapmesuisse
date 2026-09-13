import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (typeof email !== 'string' || !emailPattern.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Newsletter service is not configured' }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const safeEmail = escapeHtml(email);

    await resend.emails.send({
      from: 'IAPME Suisse <noreply@iapmesuisse.ch>',
      to: 'contact@vocalis.pro',
      subject: `Nouvelle inscription newsletter : ${email}`,
      html: `
        <h2>Nouvelle inscription newsletter</h2>
        <p><strong>Email :</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <hr>
        <small>Inscrit depuis iapmesuisse.ch le ${new Date().toLocaleString('fr-CH', { timeZone: 'Europe/Zurich' })}</small>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unable to process newsletter signup' }, { status: 500 });
  }
}
