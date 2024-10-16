// /app/api/protected/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'You are authorized to access this route' });
}
