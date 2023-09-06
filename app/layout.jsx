import { Toaster } from 'react-hot-toast';
import { DM_Sans } from 'next/font/google';
import './globals.css';
const inter = DM_Sans({ weight: ['400'], subsets: ['latin'] });


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
