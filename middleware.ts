import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === 'admin';
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginPage = nextUrl.pathname === '/admin/login';
  const isAuthApi = nextUrl.pathname.startsWith('/api/auth');

  if (isAuthApi) return NextResponse.next();

  // Construct dynamic base URL from request headers to prevent incorrect canonical domain redirects in local dev
  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('host') || nextUrl.host;
  const baseUrl = `${proto}://${host}`;

  if (isAdminRoute && !isLoginPage && (!isLoggedIn || !isAdmin)) {
    return NextResponse.redirect(new URL('/admin/login', baseUrl));
  }

  if (isLoginPage && isLoggedIn && isAdmin) {
    return NextResponse.redirect(new URL('/admin', baseUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
