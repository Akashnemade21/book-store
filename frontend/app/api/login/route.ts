import { apiBaseUrl } from '@/utils/apiUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const response: any = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const headers = new Headers();
    headers.append('Set-Cookie', `authToken=${data.token}; HttpOnly; Path=/; Max-Age=3600; }`);

    return NextResponse.json({ ...data, success: true }, { headers });
  } catch (error) {
    return NextResponse.json({ message: 'API failed', error, success: false });
  }
}
