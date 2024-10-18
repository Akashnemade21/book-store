import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `authToken=${''}; HttpOnly; Path=/; Max-Age=3600; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
    );

    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    return NextResponse.json({ message: 'API failed', error, success: false });
  }
}
