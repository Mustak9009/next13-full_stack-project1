import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login','/register','/verifyEmail'];
    const token = request.cookies.get('token')?.value || ''; //Get cookie from browser storage

    //Check paths 
    if(isPublicPath.includes(path) && token){
        return NextResponse.redirect(new URL('/profile',request.url));
    }
    if(!isPublicPath.includes(path) && !token) {
        return NextResponse.redirect(new URL('/login',request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
   matcher:[ //run middleware according this path
       '/',
       '/profile/:path*',
       '/login',
       '/register',
       '/verifyEmail'
    ] 
}