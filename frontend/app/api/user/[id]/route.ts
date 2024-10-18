import { requestHandler } from '@/utils/apiUtils';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;

  await requestHandler(req, `/user/${userId}`, 'GET', true);
}
