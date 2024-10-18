import { requestHandler } from '@/utils/apiUtils';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  await requestHandler(req, '/user', 'GET', true);
}
