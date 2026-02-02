'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaCoffee , FaUser, FaClipboardList, FaShoppingCart, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import Cookies from "universal-cookie";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cookie = new Cookies();

  useEffect(() => {
    const token = cookie.get("Token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative bg-cream shadow-xl rounded-2xl m-5 px-6 py-4 md:px-8 flex items-center md:justify-between gap-6">

      {/* همبرگر موبایل */}
     

      {/* لوگو همیشه سمت راست */}
      <div className="ml-auto flex items-center cursor-pointer hover:scale-105 transition-transform duration-300">
        <img src="/coffee.png" alt="coffee icon" className="w-10 h-10" />
        <p 
          className="font-serif font-extrabold tracking-widest text-cream drop-shadow-lg hover:text-honey mx-1 flex items-center flex-nowrap"
          style={{ fontSize: 'clamp(0.9rem, 3vw, 2rem)' }}
        >
          <span className="text-coffeeMedium italic ml-1">Coffee</span> Jojo
        </p>
        <img src="/coffee.png" alt="coffee icon" className="w-10 h-10" />
      </div>


      {/* همبرگر موبایل */}
      <button 
        className="md:hidden text-3xl text-coffeeMedium"
        onClick={toggleMenu}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* منو دسکتاپ */}
      <div className="hidden md:flex gap-10">
        <NavLinks isLoggedIn={isLoggedIn} />
      </div>

      {/* منو موبایل */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-cream shadow-xl rounded-b-2xl flex flex-col items-center py-4 gap-4 md:hidden z-50">
          <NavLinks isLoggedIn={isLoggedIn} mobile />
        </div>
      )}
    </div>
  );
}

// کامپوننت لینک‌ها برای دسکتاپ و موبایل
// کامپوننت لینک‌ها برای دسکتاپ و موبایل
function NavLinks({ isLoggedIn, mobile }: { isLoggedIn: boolean, mobile?: boolean }) {
  // کلاس اصلی لینک‌ها
  const linkClass = `group ${mobile ? "flex items-center gap-2 text-lg" : "flex flex-col items-center relative text-3xl"} text-cream hover:text-honey transition-colors duration-300`;

  // کلاس span متن
  const spanClass = mobile
    ? "ml-2" // موبایل کنار آیکون
    : "absolute -bottom-6 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"; // دسکتاپ زیر آیکون

  return (
    <>
      <Link href="/" className={linkClass}>
        <FaHome className="text-3xl" />
        <span className={spanClass}>{mobile ? "خانه" : "خانه"}</span>
      </Link>

      <Link href="/about" className={linkClass}>
        <FaInfoCircle className="text-3xl" />
        <span className={spanClass}>{mobile ? "درباره ما" : "درباره ما"}</span>
      </Link>

      <Link href="/menu" className={linkClass}>
        <FaCoffee className="text-3xl" />
        <span className={spanClass}>{mobile ? "منو" : "منو"}</span>
      </Link>

      {isLoggedIn ? (
        <>
          <Link href="/cart" className={linkClass}>
            <FaShoppingCart className="text-3xl" />
            <span className={spanClass}>{mobile ? "سبد خرید" : "سبد خرید"}</span>
          </Link>
          <Link href="/orders" className={linkClass}>
            <FaClipboardList className="text-3xl" />
            <span className={spanClass}>{mobile ? "سفارشات من" : "سفارشات من"}</span>
          </Link>
          <Link href="/account" className={linkClass}>
            <FaUser className="text-3xl" />
            <span className={spanClass}>{mobile ? "حساب من" : "حساب من"}</span>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" className={linkClass}>
            <FaSignInAlt className="text-3xl" />
            <span className={spanClass}>{mobile ? "ورود" : "ورود"}</span>
          </Link>
          <Link href="/register" className={linkClass}>
            <FaUserPlus className="text-3xl" />
            <span className={spanClass}>{mobile ? "ثبت نام" : "ثبت نام"}</span>
          </Link>
        </>
      )}
    </>
  );
}


