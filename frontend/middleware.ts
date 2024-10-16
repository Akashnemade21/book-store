import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

export function middleware(req: NextRequest) {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);

  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    verifyToken(token);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/api/pro'],
};
