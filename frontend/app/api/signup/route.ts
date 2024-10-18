import { requestHandler } from '@/utils/apiUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, password, userType, profilePic, status } = await req.json();

  const body = JSON.stringify({ name, email, password, userType, profilePic, status });

  const { data, success } = await requestHandler(req, '/auth/register', 'POST', false, body);

  if (success) {
    return NextResponse.json({ ...data, success: true });
  } else {
    return NextResponse.json({ message: 'API failed', data, success: false });
  }
  // try {
  //   const response: any = await fetch(`${apiBaseUrl}/auth/register`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await response.json();

  //   return NextResponse.json({ ...data, success: true });
  // } catch (error) {
  //   return NextResponse.json({ message: 'API failed', error, success: false });
  // }
}
