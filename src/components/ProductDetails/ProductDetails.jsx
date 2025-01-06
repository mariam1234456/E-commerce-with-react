import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import { CardContext } from "../../Context/CardContext";
import { Helmet } from "react-helmet";
export default function ProductDetails() {

  let {addProductToCart} = useContext(CardContext);

    async function addCard(productId){
      let response= await addProductToCart(productId)
      console.log(response);
      
    }

  let { id ,category} = useParams();
  const [ProductDetails, setProductDetails] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([])
  async function getProductDetails() {


    

    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setProductDetails(data?.data.data);
        setisLoading(false);
        console.log(data.data.data);
        
      })
      .catch((error) => {
        setisError(error.message);
        setisLoading(false);
      });
  }

  async function getRelatedProduct() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
       //console.log(data.data.data);
      let relatedProduct=data.data.data;
      relatedProduct=relatedProduct.filter((product)=>product.category.name==category)
      //console.log(relatedProduct);
      setRelatedProduct(relatedProduct);
      
      })
      .catch((error) => {
        
      });
  }
  useEffect(() => {
    getProductDetails();
    getRelatedProduct();
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
  };
  return (
    <>
    <Helmet>
                
                <title>{ProductDetails.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className="container m-auto mt-20">
        {isLoading ? <Loader /> : null}
        <div className="flex">
          <div className="w-1/4">
            <Slider {...settings}>
              {ProductDetails?.images?.map((src)=>
                <img src={src} alt="" />
              )}
            </Slider>
            
          </div>
          <div className="w-3/4 mt-10">
            <h1 className="text-black font-bolder text-2xl my-5">
              {ProductDetails.title}
            </h1>
            <h3 className="text-gray-700 my-5">{ProductDetails.description}</h3>
            <p>{ProductDetails.category?.name}</p>
            <div className="flex justify-between items-center">
              <div className="w-1/2">{ProductDetails.price}EGP</div>
              <div className="w-1/2">
                <i className="fa fa-star rating-color"></i>
                {ProductDetails.ratingsQuantity}
              </div>
            </div>
            <div className="text-center">
              <button onClick={()=>addCard(ProductDetails.id)} className="btn bg-main text-white px-2 py-2 rounded-md w-full">
                Add To Card
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-20">
      <h3>Related Product : </h3>
        {
          isLoading?<Loader/>:<div className="flex flex-wrap">
          {relatedProduct.map((proudct) => (
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
                <button className="btn bg-main text-white px-2 py-2 rounded-md">
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
