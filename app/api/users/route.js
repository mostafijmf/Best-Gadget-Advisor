import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.cookies.get("decodeId")?.value || '';
    // const data = req;
    // Find User
    // const user = await User.find({});
    // console.log({ headersList, token: 'asdfsa' });

    return NextResponse.json({ name: "Mostafij" })
};


