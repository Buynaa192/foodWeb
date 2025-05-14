"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/components/userProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          theme="dark"
          className=" z-10 text-white w-full h-13 rounded-md bg-black"
          toastOptions={{
            className: "bg-black text-white",
          }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
