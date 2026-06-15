import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const uid = request.cookies.get("uid")?.value
    if(!uid){
        return NextResponse.redirect(new URL('/login',request.url))
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard','/profile','/settings']
}