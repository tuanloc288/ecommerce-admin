import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ModalProvider } from '@/providers/ModalProvider'
import { ToasterProvider } from '@/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CMS Admin Dashboard',
  description: 'Admin dashboard for multiple e-commerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ModalProvider />
        <ToasterProvider/>
        <body className={`${inter.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
