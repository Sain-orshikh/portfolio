import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Skip middleware for login page and API auth route
  if (request.nextUrl.pathname === '/zlog/login' || 
      request.nextUrl.pathname === '/api/auth') {
    return NextResponse.next();
  }

  try {
    const response = NextResponse.next();
    
    // Session options specifically for middleware
    const sessionOptions = {
      password: process.env.SESSION_SECRET!,
      cookieName: 'zlog_session',
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 24 hours
      },
    };

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
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's an error, redirect to login
    return NextResponse.redirect(new URL('/zlog/login', request.url));
  }
}

export const config = {
  matcher: ['/zlog/:path*', '/api/admin/:path*'],
};
