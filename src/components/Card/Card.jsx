import React, { useContext, useEffect, useState } from "react";
import styles from "./Card.module.css";
import { CardContext } from "../../Context/CardContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Card() {
  const [cardItem, setCardItem] = useState([]);
  let {
    getProductCart,
    deleteProductCart,
    totalPrice,
    updateProductCart,
    clearProductCart,
  } = useContext(CardContext);
  async function getcart() {
    let response = await getProductCart();
    console.log(response.data.data.products);
    setCardItem(response.data.data.products);
  }
  async function deletecart(productId) {
    let response = await deleteProductCart(productId);
    console.log(response.data.data.products);
    setCardItem(response.data.data.products);
  }
  async function updatecart(productId, count) {
    let response = await updateProductCart(productId, count);
    console.log(response.data.data.products);
    setCardItem(response.data.data.products);
  }
  async function clearcart() {
    let response = await clearProductCart();
    setCardItem([]);
  }
  useEffect(() => {
    getcart();
  }, []);

  return (
    
    <>
    <Helmet>
                
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <div className="text-right">
          <button
            onClick={() => clearcart()}
            className="bg-red-600 text-white px-2 py-3 rounded-md"
          >
            Clear Cart
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cardItem.map((item) => (
              <tr
                key={item.product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    class="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updatecart(
                          item.product.id,
                          item.count - 1 <= 0
                            ? deletecart(item.product.id)
                            : item.count - 1
                        )
                      }
                      class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{item.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        updatecart(item.product.id, item.count + 1)
                      }
                      class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price * item.count}
                </td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => deletecart(item.product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
            <tr className="bg-white border-b text-black text-center text-lg font-bold dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">Total Price</td>
              <td className="p-4" colSpan="4">
                {totalPrice}
              </td>
              <td className="p-4" colSpan="5">
                <button
                  id="dropdownDelayButton"
                  data-dropdown-toggle="dropdownDelay"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Dropdown hover{" "}
                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownDelay"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDelayButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
