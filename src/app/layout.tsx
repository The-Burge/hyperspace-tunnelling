import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { NavbarDefault } from '@/Components/NavBar'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Hyperspace Tunnelling Corp',
  description: 'Hyperspace Tunnelling Corp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarDefault />
        {children}
      </body>
    </html>
  )
}
