import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Outreachy-Projects App',
  description: 'Created by Neye',
  generator: 'Neye.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
