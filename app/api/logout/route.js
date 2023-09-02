import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        const response = NextResponse.json({ success: "Logout successful!", logout: true }, { status: 200 })
        response.cookies.delete("accessToken")
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
};