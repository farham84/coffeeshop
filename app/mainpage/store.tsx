'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCoffee, FaCookieBite, FaBox, FaList } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import AddToCartButton from '../components/addCartButton';
import Cookies from 'universal-cookie';

interface Product {
  id: string;
  name: string;
  about: string;
  category: string;
  image: string;
  price?: number;
}

export default function ContentSection() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const cookies  = new Cookies()
  const token = cookies.get("Token")


  // دسته بندی اصلی
  const categories = [
    { name: 'همه', color: 'bg-[#5C3A21]', icon: <FaList /> },
    { name: 'کیک', color: 'bg-[#D4A055]', icon: <FaCookieBite /> },
    { name: 'نوشیدنی', color: 'bg-[#A87C4D]', icon: <FaCoffee /> },
    { name: 'پودر قهوه', color: 'bg-[#CFA67A]', icon: <FaBox /> },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://68249f320f0188d7e72a172a.mockapi.io/coffeeProduct');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('خطا در دریافت محصولات:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // فیلتر محصولات بر اساس دسته بندی و جستجو
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'همه' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full px-4 md:px-20 py-12 bg-[#FFF5E6]">

      {/* Search Input */}
      <motion.div
        className="w-full max-w-xl mx-auto mb-12 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-[#4B2E19] text-lg" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی محصولات..."
          className="w-full pl-10 p-3 rounded-lg shadow-md border border-[#E0CFA0] focus:outline-none focus:ring-2 focus:ring-[#D4A055] text-[#4B2E19] font-medium"
        />
      </motion.div>

      {/* Categories */}
      <motion.div
        className="flex gap-4 justify-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md cursor-pointer
              ${selectedCategory === cat.name ? cat.color : 'bg-neutral-300 text-black hover:bg-gray-400'}
            `}
            whileHover={{ scale: 1.05 }}
          >
            {cat.icon} {cat.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Products */}
      {loading ? (
        <p className="text-center text-[#4B2E19]">در حال بارگذاری محصولات...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-brownDark text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700 mb-2">دسته‌بندی: {product.category}</p>
              {product.price && <p className="text-gray-700 mb-4">قیمت: {product.price.toLocaleString()} تومان</p>}
              <p className="text-black mb-4 flex-1">{product.about}</p>

              {/* دکمه ثبت سفارش */}
              <AddToCartButton product={product.id} userId={token} />

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
