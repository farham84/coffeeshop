'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaCoffee , FaUser, FaClipboardList, FaShoppingCart, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Cookies from "universal-cookie";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookie = new Cookies();

  useEffect(() => {
    const token = cookie.get("Token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="flex justify-between items-center text-cream px-8 py-5 shadow-xl rounded-2xl m-5 bg-cream">

      {/* سمت راست */}
      <div className="flex gap-10 mr-6 relative">
        {/* خانه */}
        <Link href="/" className="group flex flex-col items-center relative cursor-pointer">
          <FaHome className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
          <span className="absolute -bottom-6 text-sm text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            خانه
          </span>
        </Link>

        {/* درباره ما */}
        <Link href="/about" className="group flex flex-col items-center relative cursor-pointer">
          <FaInfoCircle className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
          <span className="absolute -bottom-6 text-sm text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            درباره ما
          </span>
        </Link>

        {/* منو */}
        <Link href="/menu" className="group flex flex-col items-center relative cursor-pointer">
          <FaCoffee className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
          <span className="absolute -bottom-6 text-sm text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            منو
          </span>
        </Link>
      </div>

      {/* لوگو */}
      <div className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300">
        <img src="/coffee.png" alt="coffee icon" className="w-10 h-10" />
        <p className="font-serif text-3xl font-extrabold tracking-widest text-cream drop-shadow-lg hover:text-honey">
          Jojo <span className="text-coffeeMedium italic">Coffee</span>
        </p>
        <img src="/coffee.png" alt="coffee icon" className="w-10 h-10" />
      </div>

      {/* سمت چپ */}
      <div className="flex gap-8 ml-6">
        {isLoggedIn ? (
          <>
            {/* سبد خرید */}
            <Link href="/cart" className="group flex flex-col items-center relative cursor-pointer">
              <FaShoppingCart className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
              <span className="absolute -bottom-6 text-sm text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                سبد خرید
              </span>
            </Link>

            {/* سفارشات من */}
            <Link href="/orders" className="group flex flex-col items-center relative cursor-pointer">
              <FaClipboardList className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
              <span className="absolute -bottom-6 text-sm text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                سفارشات من
              </span>
            </Link>

            {/* حساب من */}
            <Link href="/account" className="group flex flex-col items-center relative cursor-pointer">
              <FaUser className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
              <span className="absolute -bottom-6 text-sm text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                حساب من
              </span>
            </Link>
          </>
        ) : (
          <>
            {/* دکمه ورود */}
            <Link href="/login" className="group flex flex-col items-center relative cursor-pointer">
              <FaSignInAlt className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
              <span className="absolute -bottom-6 text-sm text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                ورود
              </span>
            </Link>

            {/* دکمه ثبت نام */}
            <Link href="/register" className="group flex flex-col items-center relative cursor-pointer">
              <FaUserPlus className="text-3xl text-cream hover:text-honey transition-colors duration-300" />
              <span className="absolute -bottom-6 text-sm text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                ثبت نام
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
