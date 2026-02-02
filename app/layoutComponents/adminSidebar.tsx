'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaBox,
  FaShoppingCart,
  FaCheckCircle,
  FaUsers,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "مدیریت محصولات", icon: <FaBox />, href: "/adminpanel/manageproduct" },
    { name: "سفارش های فعال", icon: <FaShoppingCart />, href: "/adminpanel/orders-active" },
    { name: "سفارش های انجام شده", icon: <FaCheckCircle />, href: "/adminpanel/orders-done" },
    { name: "کاربران", icon: <FaUsers />, href: "/adminpanel/usersInfo" },
  ];

  return (
    <>
     
     <button
      onClick={() => setOpen(true)}
      className="
        md:hidden fixed top-25 left-4 z-50
        bg-gradient-to-br from-coffeeMedium to-coffeeDark
        text-cream
        p-3 rounded-2xl
        shadow-lg shadow-black/30
        active:scale-95 transition-all
      "
    >
      <FaBars className="text-xl" />
    </button>


     
      {open && (
    <div
      onClick={() => setOpen(false)}
      className="
        fixed inset-0 z-40 md:hidden
        bg-coffeeDark/70 backdrop-blur-sm
      "
    />
    )}


      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 right-0 z-50
          h-full w-64
          bg-gradient-to-b from-coffeeDark via-coffeeMedium to-coffeeDark
          text-cream shadow-2xl
          p-5 flex flex-col
          transform transition-transform duration-300
          rounded-l-3xl md:rounded-none
          ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold tracking-wide">☕ پنل مدیریت</h1>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-cream text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-cream text-black shadow-md"
                      : "hover:bg-coffeeLight/20"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-center text-cream/70 pt-6">
          Jojo Coffee Admin ☕
        </div>
      </aside>
    </>
  );
}
