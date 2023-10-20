import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MenuComponent from '@/components/menu/menu'
import ErrorBoundary from './error-boundary'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aniflex',
  description: 'Aniflex - Watch Anime for free',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <MenuComponent />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
