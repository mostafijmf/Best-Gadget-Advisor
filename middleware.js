import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get("accessToken")?.value || '';
    if (!token) return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });

    // <!-- Verify Token -->
    let decodeId;
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN));
        decodeId = payload.id;
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });
    };


    if (pathname === '/api/create-admin') {
        const response = NextResponse.next();
        response.headers.set('userId', decodeId);
        return response
    };
}

// Matching Paths
export const config = {
    matcher: [
        '/api/create-admin',
        '/api/users',
    ]
}