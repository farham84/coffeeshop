'use client'

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  name: string;
  about: string;
  category: string;
  image: string;
  price: string;
}

export default function EditProduct() {

  const params = useSearchParams();
  const idm = params.get("id");   // 👈 این ID درست است

  const [productData, setProductData] = useState<Product>({
    name: "",
    about: "",
    category: "",
    image: "",
    price: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const categories = ["نوشیدنی", "کیک", "پودر قهوه"];

  const ProductSchema = Yup.object({
    name: Yup.string().required("نام محصول را وارد کنید").min(3),
    about: Yup.string().required("توضیحات الزامی است").min(5),
    category: Yup.string().required("دسته‌بندی را انتخاب کنید"),
    image: Yup.string().url("لینک عکس معتبر نیست").required("لینک عکس الزامی است"),
    price: Yup.number().required("قیمت محصول را وارد کنید")
  });

  useEffect(() => {
    if (!idm) {
      setError("آیدی محصول ارسال نشده");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://68249f320f0188d7e72a172a.mockapi.io/coffeeProduct/${idm}`);
        if (!res.ok) throw new Error("محصول پیدا نشد");
        const data: Product = await res.json();
        setProductData(data);
      } catch (err) {
        console.error(err);
        setError("مشکل در دریافت محصول یا id نامعتبر است");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idm]);

  const submitHandler = async (values: Product) => {

    if (!idm) {
      toast.error("آیدی محصول معتبر نیست");
      return;
    }

    try {
      const res = await fetch(
        `https://68249f320f0188d7e72a172a.mockapi.io/coffeeProduct/${idm}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        }
      );

      if (!res.ok) throw new Error("خطا در ویرایش محصول");

      toast.success("محصول با موفقیت ویرایش شد!");
      router.push("/adminpanel/manageproduct");
    } catch (err) {
      console.error(err);
      toast.error("مشکلی پیش آمد!");
    }
  };

  const MyTextInput = ({ label, ...props }: any) => (
    <div className="flex flex-col">
      <label className="text-brownDark mb-1 font-medium">{label}</label>
      <Field
        {...props}
        className="p-3 rounded-xl bg-[#f1e7d3] border border-[#d1c5ac] text-gray-800 focus:outline-none focus:ring-2 focus:ring-brownDark transition"
      />
      <ErrorMessage name={props.name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );

  if (loading) return <p className="text-center py-12">در حال بارگذاری محصول...</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;

  return (
    <div className="flex justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-[#e1d8c9]">
        <h1 className="text-brownDark text-3xl font-extrabold mb-3 text-center">ویرایش محصول</h1>
        <p className="text-center text-sm text-gray-600 mb-8">تغییرات خودتان را اعمال کنید</p>

        <Formik
          initialValues={productData}
          enableReinitialize
          validationSchema={ProductSchema}
          onSubmit={submitHandler}
        >
          {({ values }) => (
            <Form className="space-y-6">
              <MyTextInput label="نام محصول" name="name" placeholder="اسپرسو" type="text" />
              <MyTextInput label="توضیحات" name="about" placeholder="حداقل 5 کاراکتر" type="text" />

              {/* دسته‌بندی */}
              <div className="flex flex-col">
                <label className="text-brownDark mb-1 font-medium">دسته‌بندی</label>
                <Field
                  as="select"
                  name="category"
                  className="p-3 rounded-xl bg-[#f1e7d3] border border-[#d1c5ac] text-gray-800 focus:outline-none focus:ring-2 focus:ring-brownDark transition"
                >
                  <option value="">انتخاب کنید</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {values.image && (
                <img src={values.image} alt="Preview" className="w-full h-48 object-cover rounded-xl mb-4" />
              )}

              <MyTextInput label="لینک عکس محصول" name="image" placeholder="https://example.com/image.png" type="text" />

              <MyTextInput label="قیمت" name="price" placeholder="قیمت محصول" type="number" />

              <button
                type="submit"
                className="w-full bg-honey hover:bg-brownLight text-black font-semibold py-3 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                ویرایش محصول
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
