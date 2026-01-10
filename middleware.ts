import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Skip middleware for login page and API auth route
  if (request.nextUrl.pathname === '/zlog/login' || 
      request.nextUrl.pathname === '/api/auth') {
    return response;
  }

  // Check if user is authenticated
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL('/zlog/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/zlog/:path*', '/api/admin/:path*'],
};
