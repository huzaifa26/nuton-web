import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextRouter } from 'next/router';


const middleware =(request: NextRequest) => {
  const isAuthenticated = true// Your authentication logic here

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();

}

export const config = {
  matcher: '/dashboard',
};

export default middleware;