import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeFromMailgunLists } from '@/utils/mailgun';
import { updateMailingListUser } from '@/utils/supabase/actions';

export async function POST(req: NextRequest) {
  try {
    const { email, monthlyCloseUp, questionnaire } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await unsubscribeFromMailgunLists(email, monthlyCloseUp, questionnaire);

    await updateMailingListUser(email, monthlyCloseUp, questionnaire);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}

