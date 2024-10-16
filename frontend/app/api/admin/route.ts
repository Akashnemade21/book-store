import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders);
  return Response.json({
    success: true,
    data: {
      admin: true,
    },
    error: {},
  });
}
