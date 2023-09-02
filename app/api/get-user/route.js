import { headers } from "next/headers";
import { NextResponse } from "next/server";

// <!-- Get user token -->
export const GET = async (req) => {
    try {
        const userId = headers().get('userId');

        if (userId) return NextResponse.json({ loggedIn: true }, { status: 200 });
        else return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};