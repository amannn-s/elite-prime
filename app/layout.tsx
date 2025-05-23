import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// font-[family-name:var(--font-geist-sans)]
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// font-[family-name:var(--font-geist-mono)]
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElitePrime",
  description: "One and only place to buy or sell luxury Properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
