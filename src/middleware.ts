import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextRouter } from 'next/router';
// export { default } from "next-auth/middleware"
import { getSession } from 'next-auth/react';


const middleware = (request: NextRequest) => {
  let isAuthenticated = false
  if (request.cookies.get("user")?.value) {
    isAuthenticated = true
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};

export default middleware;
