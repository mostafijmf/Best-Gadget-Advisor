import { Toaster } from 'react-hot-toast';
import { DM_Sans } from 'next/font/google';
import './globals.css';
const inter = DM_Sans({ weight: ['400'], subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL(process.env.CLIENT_URL),
  title: {
    default: 'Review Holder',
    template: `%s | Review Holder`
  },
  description: 'We are here To Make It Easier To Find The Best Product For Your Needs.',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} bg-gradient-to-l from-gray-50 from-30% via-emerald-50 via-50% to-blue-50 to-70%`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  )
}
