import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flipbook_id, session_id, page_number, time_spent, user_agent, referrer } = body;

    if (!flipbook_id || !session_id || page_number === undefined || !time_spent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    await supabase.from('flipbook_analytics').insert({
      flipbook_id,
      session_id,
      page_number,
      time_spent,
      user_agent,
      referrer,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to record analytics' }, { status: 500 });
  }
}
