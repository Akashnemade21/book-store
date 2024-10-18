import { requestHandler } from '@/utils/apiUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { rating, bookId, reviewText, date } = await req.json();

  const body = JSON.stringify({ rating, bookId, reviewText, date });

  const { data, success } = await requestHandler(req, '/review', 'POST', false, body);

  if (success) {
    return NextResponse.json({ ...data, success: true });
  } else {
    return NextResponse.json({ message: 'API failed', data, success: false });
  }
  // const cookieHeader = req.headers.get('cookie');

  // let authToken: string = '';
  // if (cookieHeader) {
  //   const cookies = cookieHeader.split('; ').reduce(
  //     (acc, cookie) => {
  //       const [name, value] = cookie.split('=');
  //       acc[name] = value;
  //       return acc;
  //     },
  //     {} as Record<string, string>,
  //   );

  //   authToken = cookies['authToken'];
  // }

  // try {
  //   const response: any = await fetch(`${apiBaseUrl}/review/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: authToken,
  //     },
  //     body: JSON.stringify({ rating, bookId, reviewText, date }),
  //   });

  //   const data = await response.json();

  //   return NextResponse.json({ ...data, success: true });
  // } catch (error) {
  //   return NextResponse.json({ message: 'API failed', error, success: false });
  // }
}
