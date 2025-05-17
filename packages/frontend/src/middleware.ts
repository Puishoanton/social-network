import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const guestRoutes = ['/auth', '/auth/login', '/auth/register'];

const protectedRoutes = ['/profile', '/my-posts',];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;

  const isAuthenticated = !!accessToken;
  if (isAuthenticated && guestRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/feed', req.url));
  }

  if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/my-posts/:path*',
    '/profile/:path*',
  ],
};
