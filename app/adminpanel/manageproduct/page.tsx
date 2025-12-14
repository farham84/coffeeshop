'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteProduct } from "@/app/components/deleteProduct";

interface Product {
  id: string;
  name: string;
  about: string;
  category: string;
  image: string;
  price?: string;
}

export default function ManageProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 



  // گرفتن لیست یکتا از دسته بندی ها
  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://68249f320f0188d7e72a172a.mockapi.io/coffeeProduct");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // فیلتر کردن محصولات بر اساس دسته‌بندی انتخاب شده
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-cream2 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-brownDark">مدیریت محصولات</h1>
        <Link 
          href={"/adminpanel/manageproduct/addproduct"} 
          className="flex items-center gap-2 bg-cream2 text-black px-4 py-2 rounded-xl hover:bg-brownLight transition"
        >
          <FaPlus /> اضافه کردن محصول
        </Link>
      </div>

      {/* لیست دسته بندی ها */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-xl border transition-colors ${
            selectedCategory === "" 
              ? "bg-coffeeDark text-cream" 
              : "bg-white text-brownDark hover:bg-coffeeLight hover:text-black"
          }`}
        >
          همه
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl border transition-colors ${
              selectedCategory === cat 
                ? "bg-coffeeDark text-cream" 
                : "bg-neutral-300 text-black hover:black hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>


      {loading ? (
        <p>در حال بارگذاری محصولات...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-brownDark text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700 mb-4">دسته‌بندی: {product.category}</p>
              {product.price && <p className="text-gray-700 mb-4">قیمت: {product.price} تومان</p>}
              <p className="text-black">{product.about}</p>
              <div className="flex justify-end gap-3">
                {/* <Link href={`/adminpanel/manageproduct/editProduct?id=${product.id}`} className="flex items-center gap-1 text-blue-500 hover:text-blue-400">
                  <FaEdit /> ویرایش
                </Link> */}
                <button 
                  className="flex items-center gap-1 text-red-500 hover:text-red-400"
                  onClick={async () => {
                    const ok = confirm("آیا مطمئن هستی؟");

                    if (!ok) return;

                    const success = await deleteProduct(product.id);

                    if (success) {
                      toast.success("محصول حذف شد");
                      setProducts(prev => prev.filter(p => p.id !== product.id)); // بروزرسانی UI
                    } else {
                      toast.error("خطا در حذف محصول!");
                    }
                  }}
                >
                  <FaTrash /> حذف
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
