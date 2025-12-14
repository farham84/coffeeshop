import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import AdminSidebar from "../layoutComponents/adminSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffe",
  description: "created by farham",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cream2`}
      >
       
        <div className="min-h-screen flex">
          {/* سایدبار */}
          <AdminSidebar />

          {/* محتوا */}
          <div className="flex-1 p-8 overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
