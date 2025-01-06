import React, { useContext } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik';
import { CardContext } from '../../Context/CardContext';
export default function CheckOut() {
  let {onlinePayment}=useContext(CardContext);
  let formik = useFormik({
    initialValues: {
      
      details: "",
      phone: "",
      city: ""
      
    },
      onSubmit: (values) => {
        payOnline(values);
      
    },
  });
  async function payOnline(values) {
    await onlinePayment(values)
  }
  return (
    <>
      <div className="w-1/2 mx-auto">
      <form onSubmit={formik.handleSubmit}>
            
  
            <div className="my-1">
              <label
                htmlFor="details"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                details
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name="details"
                type="text"
                id="details"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.details && formik.errors.details ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.details}
                </div>
              ) : null}
            </div>
  
            <div className="my-1">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                phone
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                name="phone"
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.phone && formik.errors.phone? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>

            <div className="my-1">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                city
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                name="city"
                type="text"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.city && formik.errors.city? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.city}
                </div>
              ) : null}
            </div>
  
  
            <div className="text-end m-6">
            
              
                <button
                  type="submit"
                  className="rounded text-white bg-lime-700 px-5 py-4 "
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Pay Now
                </button>
              
            </div>
          </form>
      </div>
    </>
  )
}


