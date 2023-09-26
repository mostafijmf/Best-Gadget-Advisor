import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/User";
import VerificationCode from "@/database/models/VerificationCode";
import { verifyEmail } from "@/libs/emailSender";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

dbConnect();

// <!-- Get user -->
export const GET = async () => {
    try {
        const { id } = JSON.parse(headers().get('userInfo'));
        const user = await User.findById({ _id: id }, '-password');
        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            const response = NextResponse.json({ success: "Logout successful!", logout: true }, { status: 200 })
            response.cookies.delete("accessToken")
            return response;
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};



// <!-- Update user information -->
export const PATCH = async (req) => {
    try {
        // <!-- Get user id from headers -->
        const { id } = JSON.parse(headers().get('userInfo'));
        const user = await User.findById({ _id: id });
        if (!user) return NextResponse.json({ error: "You are not allowed to change any data!" }, { status: 403 });

        // <!-- Get OTP from searchParams. If valid OTP exist user name & email will be updated -->
        const otp = req.nextUrl.searchParams.get("otp");
        if (otp) {
            const res = await VerificationCode.findOne({ user: id, code: Number(otp) });

            const currentDate = new Date();
            if (res.expirationTime < currentDate)
                return NextResponse.json({ error: "Invalid verification code!" }, { status: 408 });

            if (Number(res.code) !== Number(otp))
                return NextResponse.json({ error: "Invalid verification code!" }, { status: 403 });

            await User.findByIdAndUpdate({ _id: id }, {
                $set: {
                    name: res.name,
                    email: res.email
                }
            });
            await res.deleteOne();
            return NextResponse.json({ success: "Data updated successfully!", isOTPSend: false }, { status: 200 });
        };

        const body = await req.json();

        // <!-- Only user name will update if user don't want to change email -->
        if (body.email === user.email) {
            await User.findByIdAndUpdate({ _id: id }, {
                $set: body
            });
            return NextResponse.json({ success: "Data update successful!", isOTPSend: false }, { status: 200 });
        }


        // <!-- An Email will send with OTP user existing email if user want to change email -->
        const code = Math.round(Math.random() * 90000) + 10000;
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        verifyEmail({ email: user.email, code, base_url: process.env.NEXT_PUBLIC_BASE_URL })

        const res = await VerificationCode.updateOne(
            { email: body.email },
            {
                code,
                expirationTime,
                name: body.name,
                email: body.email,
                user: id
            },
            { upsert: true }
        );

        if (res) return NextResponse.json({
            success: `A verification code was just sent to ${user.email}`,
            isOTPSend: true
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};