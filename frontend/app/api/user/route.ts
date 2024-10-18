import { requestHandler } from '@/utils/apiUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { data, success } = await requestHandler(req, '/user', 'GET', true);
  if (success) {
    return NextResponse.json({ ...data, success: true });
  } else {
    return NextResponse.json({ message: 'API failed', data, success: false });
  }
}
