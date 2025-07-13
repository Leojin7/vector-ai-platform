import { NextRequest, NextResponse } from 'next/server';

// Named export version
export function middleware(request: NextRequest) {
  // Your middleware logic
  return NextResponse.next();
}

// OR default export version
// export default function middleware(request: NextRequest) {
//   return NextResponse.next();
// }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
