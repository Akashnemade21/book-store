export const apiBaseUrl = process.env.BACKEND_URL;

import { NextRequest, NextResponse } from 'next/server';

export const requestHandler = async (
  req: NextRequest,
  apiUrl: string,
  method: string,
  requireAuth: boolean,
  body?: string,
) => {
  let headers: {
    'Content-Type': string;
    Authorization?: string;
  } = { 'Content-Type': 'application/json' };

  if (requireAuth) {
    const cookieHeader = req.headers.get('cookie');

    let authToken: string = '';
    if (cookieHeader) {
      const cookies = cookieHeader.split('; ').reduce(
        (acc, cookie) => {
          const [name, value] = cookie.split('=');
          acc[name] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      authToken = cookies['authToken'];
      headers = {
        'Content-Type': 'application/json',
        Authorization: authToken,
      };
    }
  }

  let requestConfig: {
    method: string;
    headers: {
      'Content-Type': string;
      Authorization?: string;
    };
    body?: string;
  } = {
    method: method,
    headers: headers,
  };

  if (method !== 'GET') {
    requestConfig = {
      method: method,
      headers: headers,
      body: body,
    };
  }

  try {
    const response = await fetch(`${apiBaseUrl}${apiUrl}`, requestConfig);

    const data = await response.json();

    return NextResponse.json({ ...data, success: true });
  } catch (error) {
    return NextResponse.json({ message: 'API failed', error, success: true });
  }
};
