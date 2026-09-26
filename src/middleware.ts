import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('admin_session')?.value;
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const payload = await verifySession(sessionToken);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url), 303);
    }
  }

  if (request.nextUrl.pathname === '/login') {
    const payload = await verifySession(sessionToken);
    if (payload) {
      return NextResponse.redirect(new URL('/admin', request.url), 303);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
