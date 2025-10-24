import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ritam Reviews Dashboard',
  description: 'Unified review management for hotel managers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
