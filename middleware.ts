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

  if (isAdminRoute && !isLoginPage && (!isLoggedIn || !isAdmin)) {
    return NextResponse.redirect(new URL('/admin/login', nextUrl));
  }

  if (isLoginPage && isLoggedIn && isAdmin) {
    return NextResponse.redirect(new URL('/admin', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
