import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    console.log('Middleware triggered for:', req.nextUrl.pathname);

    // Allow access to login and registration endpoints
    if (req.nextUrl.pathname.startsWith('/api/users/login') || req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/api/users/register')) {
        console.log('Login route. Allowing access.');
        return NextResponse.next();
    }

    const token = req.cookies.get('jwtToken'); // Adjust this based on where your token is stored

    // If no token, redirect to login
    if (!token) {
        console.log('No token found. Redirecting to /login');
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    console.log('Token found. Allowing request.');
    // Allow the request to proceed
    return NextResponse.next();
}

// Apply the middleware only to protected routes
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|login).*)'], // Allow static assets
    //matcher: ['/((?!login|public).*)'], // Protect all routes except `/auth` and `/public`
};
