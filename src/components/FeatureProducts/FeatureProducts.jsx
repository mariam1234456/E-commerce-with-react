import React, { useContext, useEffect } from "react";
import styles from "./FeatureProducts.module.css";
import axios from "axios";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import { CardContext } from "../../Context/CardContext";

export default function FeatureProducts() {
  let {addProductToCart} = useContext(CardContext);

  async function addCard(productId){
    let response= await addProductToCart(productId)
    console.log(response);
    
  }
  function getProduct(){
    
    return  axios
      .get("https://ecommerce.routemisr.com/api/v1/products")

  }

let {isLoading,data,isFetching,isError, error}=useQuery({
  queryKey:["featureProducts"],
  queryFn:getProduct,
  staleTime:5000,
  retry:4,
  retryDelay:2000,
})


// const [proudct, setProudct] = useState([]);
//   const [isLoading, setisLoading] = useState(true);
  // async function getProduct() {
  //   return  axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((data) => {
  //       setProudct(data.data.data);
  //       setisLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setisLoading(false);
  //     });
  // }
  // useEffect(() => {
  //   getProduct();
  // }, []);
  return (
    <>
      <div className="container mx-auto">
        {isError?<p>{error.message}</p>:null}
        {
          isLoading?<Loader/>:<div className="flex flex-wrap">
          {data?.data.data.map((proudct) => (
            <div key={proudct.id} className="w-1/6">
              <div className="product p-3">
              <Link to={`/productdetails/${proudct.id}/${proudct.category.name}`} >
              <img src={proudct.imageCover} className="w-full" alt="" />
              <h5 className="text-main">{proudct.category.name}</h5>
              <p>{proudct.title.split(" ").splice(0,2).join(" ")}</p>
              <div className="flex justify-between items-center">
                <p>{proudct.price}EGP</p>
                <div className="w-1/2">
                  <i className="fa fa-star rating-color"></i>
                  {proudct.ratingsQuantity}
                </div>
              </div>
              </Link>
              <div className="text-center">
                <button onClick={()=>addCard(proudct.id)} className="btn bg-main text-white px-2 py-2 rounded-md">
                  Add To Card
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
        }
        
      </div>
    </>
  );
}
