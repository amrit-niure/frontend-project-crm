import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname; 
  const isAuth = await getToken({ req }); 
  console.log('Authenticated User:', isAuth); 

  const isAuthPage = pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup');

  const sensitiveRoutes = ['/dashboard']; 
  const isAccessingSensitiveRoute = sensitiveRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Redirect authenticated users away from the login page to the dashboard
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next(); 
  }

  // Redirect unauthenticated users trying to access sensitive routes to the login page
  if (!isAuth && isAccessingSensitiveRoute) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }


  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next(); 
}

// Configure the middleware matcher to target specific routes
export const config = {
  matcher: ['/', '/auth/signin', '/dashboard/:path*'],
};
