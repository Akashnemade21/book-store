import { requestHandler } from '@/utils/apiUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;

  const { data, success } = await requestHandler(req, `/user/${userId}`, 'GET', true);

  if (success) {
    return NextResponse.json({ ...data, success: true });
  } else {
    return NextResponse.json({ message: 'API failed', data, success: false });
  }
}
