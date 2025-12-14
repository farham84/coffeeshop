'use client';

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  about: string;
  category: string;
  image: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const cookies = new Cookies();
  const userId = cookies.get("Token");

  useEffect(() => {
    if (!userId) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
      router.push("/login");
      return;
    }

    const fetchCartProducts = async () => {
      try {
        // 1️⃣ گرفتن اطلاعات کاربر
        const userRes = await fetch(`https://68249f320f0188d7e72a172a.mockapi.io/coffe/${userId}`);
        const user = await userRes.json();

        const cartData: { id: string; quantity: number }[] = user.cart || [];

        if (cartData.length === 0) {
          setCartProducts([]);
          setTotalPrice(0);
          setLoading(false);
          return;
        }

        // 2️⃣ گرفتن اطلاعات تمام محصولات
        const allProductsRes = await fetch("https://68249f320f0188d7e72a172a.mockapi.io/coffeeProduct");
        const allProducts: Product[] = await allProductsRes.json();

        // 3️⃣ ساخت cartProducts با quantity
        const filteredProducts: CartItem[] = cartData.map(item => {
          const prod = allProducts.find(p => p.id === item.id);
          return { ...prod!, quantity: item.quantity };
        });

        setCartProducts(filteredProducts);

        // 4️⃣ محاسبه جمع کل
        const total = filteredProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);

      } catch (error) {
        console.error(error);
        toast.error("خطا در دریافت محصولات سبد خرید");
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [userId]);

  // افزایش یا کاهش تعداد محصول
  const updateQuantity = async (productId: string, delta: number) => {
    setCartProducts(prev => {
      const newCart = prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      });

      const total = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);

      // همزمان بروزرسانی cart در MockAPI
      updateCartAPI(newCart);

      return newCart;
    });
  };

  // حذف محصول
  const removeProduct = async (productId: string) => {
    if (!userId) return;

    try {
      const userRes = await fetch(`https://68249f320f0188d7e72a172a.mockapi.io/coffe/${userId}`);
      const user = await userRes.json();

      const updatedCart = (user.cart || []).filter((item: any) => item.id !== productId);

      await fetch(`https://68249f320f0188d7e72a172a.mockapi.io/coffe/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, cart: updatedCart })
      });

      setCartProducts(prev => prev.filter(item => item.id !== productId));

      const total = cartProducts.filter(item => item.id !== productId)
                                 .reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);

      toast.success("محصول حذف شد");

    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف محصول");
    }
  };

  // بروزرسانی cart در MockAPI
  const updateCartAPI = async (newCart: CartItem[]) => {
    if (!userId) return;
    try {
      const userRes = await fetch(`https://68249f320f0188d7e72a172a.mockapi.io/coffe/${userId}`);
      const user = await userRes.json();

      const cartForAPI = newCart.map(item => ({ id: item.id, quantity: item.quantity }));

      await fetch(`https://68249f320f0188d7e72a172a.mockapi.io/coffe/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, cart: cartForAPI })
      });
    } catch (error) {
      console.error("خطا در بروزرسانی cart", error);
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">در حال بارگذاری سبد خرید...</p>;
  if (cartProducts.length === 0) return <p className="text-center text-lg mt-10">سبد خرید شما خالی است</p>;



  const payProduct = () => {


    toast.info("درگاه پرداخت تستی میباشد")

    
  }


  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">سبد خرید شما</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartProducts.map(item => (
          <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-xl shadow">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-gray-700">{item.category}</p>
              <p className="text-gray-900 font-bold">{item.price} تومان</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-200 px-2 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-200 px-2 rounded">+</button>
              </div>
            </div>
            <button 
              onClick={() => removeProduct(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-xl font-semibold">جمع کل: {totalPrice.toLocaleString()} تومان</p>
        <button 
        onClick={payProduct}
        className="mt-3 w-40 bg-[#A87C4D] text-white font-bold py-2 rounded-xl hover:bg-[#D4A055] transition"
        >ادامه به پرداخت</button>
      </div>
    </div>
  );
}
