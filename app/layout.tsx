import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Invitación XV Años - Azu",
  description: "Te invito a celebrar mis XV años",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${dancingScript.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
