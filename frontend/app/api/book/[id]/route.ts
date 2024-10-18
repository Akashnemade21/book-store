import { requestHandler } from '@/utils/apiUtils';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const bookId = params.id;

  await requestHandler(req, `/book/${bookId}`, 'GET', true);

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
  //   const response: any = await fetch(`${apiBaseUrl}/book/${bookId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: authToken,
  //     },
  //   });

  //   const data = await response.json();

  //   return NextResponse.json({ ...data, success: true });
  // } catch (error) {
  //   return NextResponse.json({ message: 'API failed', error, success: false });
  // }
}
