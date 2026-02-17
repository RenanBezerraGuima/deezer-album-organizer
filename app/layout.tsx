import React from "react"
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeHandler } from '@/components/theme-handler'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlbumShelf',
  description: 'Organize your music albums in collections using a fast, local-first catalog.',
  icons: {
    icon: [
      {
        url: 'icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistMono.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main-content"
          className="fixed -top-16 left-4 z-[9999] px-4 py-2 bg-primary text-primary-foreground focus:top-4 focus:outline-none transition-all duration-200 brutalist-shadow font-medium tracking-tighter"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeHandler />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
