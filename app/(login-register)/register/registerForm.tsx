"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie";

export default function RegisterForm() {
  const router = useRouter();
  const cookies = new Cookies()
  const token = cookies.get("Token")

  if (token) {
    router.push("/")
  }

  const RegisterFormInput = Yup.object({
    name: Yup.string().required("نام الزامی است"),
    email: Yup.string()
      .email("ایمیل معتبر وارد کنید")
      .required("ایمیل الزامی است"),
    password: Yup.string()
      .required("پسورد خود را وارد کنید")
      .min(5),
  });

  const submitHandler = async (values: { name: string; email: string; password: string  }) => {
    const userData = {
      ...values,
      role: 'user'
    }

    try {
      const res = await fetch("https://68249f320f0188d7e72a172a.mockapi.io/coffe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      toast.success("اکانت شما با موفقیت ساخته شد");
      router.push("/login");
    } catch (err) {
      toast.error("مشکلی پیش آمد");
    }
  };

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
          ثبت‌نام
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          خوش اومدی! لطفاً اطلاعات لازم رو وارد کن
        </p>

        {/* Form */}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={RegisterFormInput}
          onSubmit={submitHandler}
        >
          <Form className="space-y-6">
            <MyTextInput
              label="نام کامل"
              name="name"
              placeholder="مثلاً علی کریمی"
              type="text"
            />
            <MyTextInput
              label="ایمیل:"
              name="email"
              placeholder="example@gmail.com"
              type="email"
            />
            <MyTextInput
              label="پسورد:"
              name="password"
              placeholder="حداقل 5 کارکتر"
              type="password"
            />

            <button
              type="submit"
              className="w-full bg-honey text-black font-medium py-3 rounded-xl transition duration-300"
            >
              ثبت‌نام
            </button>
          </Form>
        </Formik>

        {/* Login Redirect */}
        <p className="text-center text-gray-700 mt-6">
          اکانت داری؟{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-brownDark font-semibold cursor-pointer hover:underline"
          >
            وارد شو
          </span>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
