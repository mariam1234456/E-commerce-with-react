import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userMessage, setuserMessage] = useState(null);
  const [userError, setuserError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  
  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "cant be less than 3 chars")
      .max(10, "max is 10"),
    email: Yup.string().required("Email is required").email("invalid email"),
    password: Yup.string()
      .required("Pass is required")
      .matches("", " pass not valid"),
    rePassword: Yup.string()
      .required("rePass is required")
      .oneOf([Yup.ref("password")], "not match pass"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/, "phone is not valid"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
      onSubmit: (values) => {
      registerForm(values);
    },
  });
  async function registerForm(values) {
    setisLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        setuserMessage(data.data.message);
        navigate("/login");
        console.log(data);
        setisLoading(false);
        
      })
      .catch((err) => {
        console.log(err);
        setuserError(err.response.data.message);
        setisLoading(false);
      });
  }
  return (
    <div>
      <div className="container w-1/2 mx-auto">
        <h1 className="text-2xl m-1">Register Now :</h1>
        {userError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            
          >{userError}</div>
        ) : null}
        {userMessage ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >{userMessage}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="my-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              name="name"
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className="my-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="my-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="my-1">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              rePassword
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              name="rePassword"
              type="password"
              id="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="my-1">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              name="phone"
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="text-end m-6">
          
            {isLoading ? (
              <button
                type="submit"
                className="rounded text-white bg-lime-700 px-5 py-4 "
              >
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="rounded text-white bg-lime-700 px-5 py-4 "
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
