import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for server-side auth redirection
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. If authenticated and visiting homepage (/), redirect to dashboard
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. If NOT authenticated and visiting dashboard, redirect to login
  // Note: dashboard logic is currently in src/app/dashboard/page.tsx
  // We can also protect (dashboard) route group if needed
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
