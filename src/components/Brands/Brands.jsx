import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../Redaux/productRed";
import { data } from "autoprefixer";
import { Helmet } from "react-helmet";
export default function Brands() {
 
  let dispatch = useDispatch();
  let { brands } = useSelector((state) => state.productRed);
  console.log(brands?.data);

  async function getData() {
    await dispatch(getBrand());
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container mx-auto mt-5">
        <div className="grid grid-cols-4">
          {/* <div className="w-1/6"> */}
          {brands.data &&
          brands.data.map((brand) => (
            <div key={brand.id}>
              <img src={brand.image} className="w-full" width="100" alt="" />
              <h3 className="text-center">{brand.name}</h3>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
 }
