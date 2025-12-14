// app/layout.tsx
'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./layoutComponents/navbar";

import { useState, useEffect } from "react";
import Loader from "./components/loading";

// 🔥 اضافه کردن Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="fa" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cream2`}>
        
        
        <Nav />

        
        {loading ? <Loader /> : children}

        {/* 🔥🔥 باید اینجا باشد تا Toast کار کند */}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          pauseOnHover={false}
          theme="colored"
        />

      </body>
    </html>
  );
}
