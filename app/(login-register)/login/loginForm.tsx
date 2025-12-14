"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import Cookies from "universal-cookie";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const router = useRouter();
  const cookies = new Cookies();

  const token = cookies.get("Token")

  if (token) {
    router.push("/")
  }

  // اعتبارسنجی فرم
  const LoginFormInput = Yup.object({
    email: Yup.string()
      .email("ایمیل معتبر وارد کنید")
      .required("ایمیل الزامی است"),
    password: Yup.string()
      .min(5, "حداقل 5 کاراکتر")
      .required("پسورد الزامی است"),
  });

  // هندل ارسال
  const submitHandler = async (values: { email: string; password: string }) => {
    try {
      const res = await fetch("https://68249f320f0188d7e72a172a.mockapi.io/coffe");
      const users = await res.json();

      const user = users.find(
        (u: any) => u.email === values.email && u.password === values.password
      );

      if (!user) {
        toast.error("ایمیل یا پسورد اشتباه است!");
        return;
      }

      // ذخیره توکن
      cookies.set("Token", user.id, { path: "/", maxAge: 60 * 60 * 24 });

      toast.success("با موفقیت وارد شدید!");
      setTimeout(() => window.location.href = "/", 600);
    } catch (err) {
      toast.error("مشکلی پیش آمد");
    }
  };

  // ورودی سفارشی
  const MyTextInput = ({ label, ...props }: any) => (
    <div className="flex flex-col">
      <label className="text-brownDark mb-1 font-medium">{label}</label>
      <Field
        {...props}
        className="p-3 rounded-xl bg-[#f1e7d3] border border-[#d1c5ac] text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-brownDark transition"
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 ">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-[#e1d8c9]">
        
        {/* Title */}
        <h1 className="text-brownDark text-3xl font-extrabold mb-3 text-center">
          ورود
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          خوش برگشتی! لطفاً اطلاعات ورود خود را وارد کن
        </p>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginFormInput}
          onSubmit={submitHandler}
        >
          <Form className="space-y-6">
            <MyTextInput
              label="ایمیل"
              name="email"
              placeholder="example@gmail.com"
              type="email"
            />
            <MyTextInput
              label="پسورد"
              name="password"
              placeholder="حداقل 5 کاراکتر"
              type="password"
            />

            <button
              type="submit"
              className="w-full bg-honey hover:bg-brownLight text-black bg-cream font-semibold py-3 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              ورود
            </button>
          </Form>
        </Formik>

        {/* ثبت‌نام */}
        <p className="text-center text-gray-700 mt-6">
          اکانت نداری؟{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-brownDark font-semibold cursor-pointer hover:underline"
          >
            ثبت‌نام کن
          </span>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
