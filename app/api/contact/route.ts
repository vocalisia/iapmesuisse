import { Resend } from 'resend';
import { handleContact } from '@/lib/contact/handler';

export async function POST(request: Request) {
  return handleContact(request, async mail => {
    if (!process.env.RESEND_API_KEY) throw new Error('Contact provider unavailable');
    return new Resend(process.env.RESEND_API_KEY).emails.send(mail);
  });
}
