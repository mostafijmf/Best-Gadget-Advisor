import { Toaster } from "react-hot-toast";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = DM_Sans({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    title: {
        default: "Review Holder",
        template: `%s | Review Holder`,
    },
    description: "We are here To Make It Easier To Find The Best Product For Your Needs.",
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
};

export default async function RootLayout({ children }) {
    // await dbConnect();

    return (
        <html lang="en">
            <GoogleAnalytics />
            <body suppressHydrationWarning={true} className={`${inter.className}`}>
                <Toaster />
                {children}
            </body>
        </html>
    );
}
