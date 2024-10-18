import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split('; ').reduce(
      (acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
      },
      {} as Record<string, string>,
    );
    if (cookies['authToken']) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/home/:path*'],
};
