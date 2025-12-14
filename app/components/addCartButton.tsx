"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";




export default function AddToCartButton({ product, userId }) {

  const cookies = new Cookies()
  const token = cookies.get("Token")
  

  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
  if (!token) {
    toast.error("لطفا ابتدا وارد حساب خود شوید");
    return;
  }

  setLoading(true);

  try {
    // 1️⃣ گرفتن اطلاعات کاربر از MockAPI
    const userRes = await fetch(
      `https://68249f320f0188d7e72a172a.mockapi.io/coffe/${userId}`
    );
    const user = await userRes.json();

    // 2️⃣ بررسی اینکه محصول قبلا در cart هست یا نه
    let cart = user.cart || []; // فرض می‌کنیم الان cart فقط idها هستند
    const existingItemIndex = cart.findIndex((item: any) => item.id === product);

    if (existingItemIndex !== -1) {
      // اگر محصول هست → quantity را افزایش بده
      cart[existingItemIndex].quantity += 1;
    } else {
      // اگر محصول نیست → اضافه کن با quantity = 1
      cart.push({ id: product, quantity: 1 });
    }

    // 3️⃣ ارسال cart جدید به MockAPI
    await fetch(`https://68249f320f0188d7e72a172a.mockapi.io/coffe/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        cart: cart, // cart جدید با quantity
      }),
    });

    toast.success("محصول به سبد خرید اضافه شد");
  } catch (error) {
    console.error(error);
    toast.error("خطا در افزودن محصول به سبد");
  } finally {
    setLoading(false);
  }
};


  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="mt-auto w-full bg-[#A87C4D] text-white font-bold py-2 rounded-xl hover:bg-[#D4A055] transition"
    >
      {loading ? "در حال اضافه..." : "افزودن به سبد"}
    </button>
  );
}
