import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "No Offense, But",
  description: "No offense, but this is basically my diary I left unlocked on the internet. Sharing thoughts, reviews, and experiences.",
  keywords: ["blog", "personal", "thoughts", "reviews", "stories", "life"],
  authors: [{ name: "Harshala Rani" }],
  creator: "Harshala Rani",
  publisher: "No Offense, But",
  metadataBase: new URL('https://blog.harshalarani.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "No Offense, But",
    description: "No offense, but this is basically my diary I left unlocked on the internet. Sharing thoughts, reviews, and experiences.",
    url: 'https://blog.harshalarani.online',
    siteName: 'No Offense, But',
    images: [
      {
        url: '/icons/image.png', // Your social sharing image
        width: 1200,
        height: 630,
        alt: 'No Offense, But - Personal Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "No Offense, But",
    description: "No offense, but this is basically my diary I left unlocked on the internet.",
    images: ['/icons/image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/image.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/image.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/image.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icons/image.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
