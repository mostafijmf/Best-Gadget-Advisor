import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const regForId = /^\/api\/admin\/blogs\/(?:([^\/]+?))\/?(?=\/|$)/i // check for path: '/api/admin/blogs/:id*'
    const adminPath = ['/admin', '/admin/create-blog', '/admin/all-blogs', '/admin/settings'];
    const apiAdminPath = ['/api/get-user', '/api/admin/create-admin', '/api/admin/users', '/api/admin/blogs'];


    // <!-- Verify Token -->
    const token = req.cookies.get("accessToken")?.value || '';
    let decodeId;
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN));
        decodeId = payload.id;

    } catch (error) {
        if (adminPath.includes(pathname)) return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url));
        if (pathname === '/login') return NextResponse.next();
        if (error.name === 'JWTExpired') {
            return NextResponse.json({ error: "Token has been expired!" }, { status: 401 });
        };
        return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });
    };


    if (decodeId && (pathname === '/login')) return NextResponse.redirect(new URL('/admin', req.url));


    if (apiAdminPath.includes(pathname) || regForId.test(pathname)) {
        const response = NextResponse.next();
        response.headers.set('userId', decodeId);
        return response
    }
}

// Matching Paths
export const config = {
    matcher: [
        '/admin',
        '/admin/create-blog',
        '/admin/all-blogs',
        '/admin/settings',
        '/login',
        '/api/admin/create-admin',
        '/api/admin/users',
        '/api/admin/blogs',
        '/api/admin/blogs/:id*',
        '/api/get-user',
    ]
};