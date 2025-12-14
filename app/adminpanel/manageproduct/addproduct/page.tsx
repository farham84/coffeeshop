'use client'


import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct() {
  const [preview, setPreview] = useState<string | null>(null);

  const categories = ["نوشیدنی" , "کیک" , "پودر قهوه"];

  const ProductSchema = Yup.object({
    name: Yup.string().required("نام محصول را وارد کنید").min(3),
    about: Yup.string().required("توضیحات الزامی است").min(5),
    category: Yup.string().required("دسته‌بندی را انتخاب کنید"),
    image: Yup.string().url("لینک عکس معتبر نیست").required("لینک عکس الزامی است"),
    price: Yup.number().required("نکنه میخای مجانی بفروشیش؟")
  });

  const submitHandler = async (values: any) => {
  try {
    const res = await fetch("https://68249f320f0188d7e72a172a.mockapi.io/coffeeProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("مشکلی پیش آمد!");
      return;
    }

    toast.success("محصول با موفقیت اضافه شد!");
    // ریست فرم
    // @ts-ignore
    document.querySelector("form")?.reset();

  } catch (err) {
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

  return (
    <div className="flex justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-[#e1d8c9]">
        <h1 className="text-brownDark text-3xl font-extrabold mb-3 text-center">
          اضافه کردن محصول
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          لطفا اطلاعات محصول جدید را وارد کنید
        </p>

        <Formik
          initialValues={{ name: "", about: "", category: "", image: "", price: "" }}
          validationSchema={ProductSchema}
          onSubmit={submitHandler}
        >
          {({ setFieldValue }) => (
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

              {/* آپلود عکس */}
              <MyTextInput
                label="لینک عکس محصول"
                name="image"
                placeholder="https://example.com/image.png"
                type="text"
                />

                <MyTextInput label="قیمت" name="price" placeholder="قیمت محصول" type="number" />

              <button
                type="submit"
                className="w-full bg-honey hover:bg-brownLight text-black font-semibold py-3 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                ساخت محصول
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
