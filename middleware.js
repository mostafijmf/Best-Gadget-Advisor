import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const regForId = /^\/api\/admin\/blogs\/(?:([^\/]+?))\/?(?=\/|$)/i // check for path: '/api/admin/blogs/:id*'
    const adminPath = [
        '/admin',
        '/admin/create-blog',
        '/admin/all-blogs',
        '/admin/settings',
        '/admin/users',
        '/admin/settings'
    ];
    const apiAdminPath = [
        '/api/auth-user',
        '/api/admin/users',
        '/api/admin/blogs'
    ];



    // <!-- Active link for add user -->
    if (pathname === '/active-link') {
        const token = req.nextUrl.searchParams.get("token");
        try {
            const { payload } = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN)
            );
            const response = NextResponse.next();
            response.headers.set('payload', JSON.stringify(payload));
            return response;

        } catch (error) {
            const response = NextResponse.next();
            if (error.name === 'JWTExpired') {
                response.headers.set('error', 'The link has been expired!');
                return response;
            } else {
                response.headers.set('error', 'Invalid authentication. Please contact to admin.');
                return response;
            }
        }
    };


    // <!-- Verify Token -->
    const token = req.cookies.get("accessToken")?.value || '';
    let decode;
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN));
        decode = payload;

    } catch (error) {
        // <!-- Redirect to login page If user has invalid Token -->
        if (adminPath.includes(pathname)) return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url));
        if (pathname === '/login') return NextResponse.next();
        if (error.name === 'JWTExpired') {
            return NextResponse.json({ error: "Token has been expired!" }, { status: 401 });
        };
        return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });
    };

    // <!-- Redirect to dashboard If user has valid Token -->
    if (decode && (pathname === '/login')) return NextResponse.redirect(new URL('/admin', req.url));


    // <!-- Set header decoded user -->
    if (
        apiAdminPath.includes(pathname) ||
        regForId.test(pathname) ||
        adminPath.includes(pathname)
    ) {
        const response = NextResponse.next();
        response.headers.set('userInfo', JSON.stringify(decode));
        return response
    };


}

// Matching Paths
export const config = {
    matcher: [
        '/active-link',
        '/admin',
        '/admin/create-blog',
        '/admin/all-blogs',
        '/admin/users',
        '/admin/settings',
        '/login',
        '/api/admin/users',
        '/api/admin/blogs',
        '/api/admin/blogs/:id*',
        '/api/auth-user',
    ]
};