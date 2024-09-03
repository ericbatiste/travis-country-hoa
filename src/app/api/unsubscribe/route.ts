import { NextRequest, NextResponse } from 'next/server';
import { unsubUserFromMailgunLists } from '@/utils/mailgun';

export async function POST(req: NextRequest) {
  try {
    const { email, monthlyCloseUp, questionnaire } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    await unsubUserFromMailgunLists(email, monthlyCloseUp, questionnaire);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}

