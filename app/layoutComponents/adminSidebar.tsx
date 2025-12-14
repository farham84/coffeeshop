import Link from "next/link";
import { FaBox, FaShoppingCart, FaCheckCircle, FaUsers } from "react-icons/fa";

export default function AdminSidebar() {
  const menuItems = [
    { name: "مدیریت محصولات", icon: <FaBox />, href: "/adminpanel/manageproduct" },
    { name: "سفارش های فعال", icon: <FaShoppingCart />, href: "/" },
    { name: "سفارش های انجام شده", icon: <FaCheckCircle />, href: "/" },
    { name: "کاربران", icon: <FaUsers />, href: "/adminpanel/usersInfo" },
  ];

  return (
    <div className="top-0 left-0 h-full w-64 bg-coffeeDark shadow-lg text-cream flex flex-col p-4 rounded-md mr-5">
      <h1 className="text-2xl font-bold mb-8 text-center">پنل مدیریت</h1>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-coffeeMedium transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-md font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
