import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Log the contact form submission
    console.log('=== New Contact Form Submission ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Company:', company);
    console.log('Message:', message);
    console.log('Date:', new Date().toISOString());
    console.log('===================================');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
