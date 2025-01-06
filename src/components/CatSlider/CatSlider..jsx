import React, { useEffect, useState } from 'react'
import styles from './CatSlider.module.css'
import axios from 'axios';
import Slider from 'react-slick';
import { data } from 'autoprefixer';
import { useQuery } from '@tanstack/react-query';

export default function CatSlider() {
  function getCatSlider(){
    
    return  axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")

  }

let {data}=useQuery({
  queryKey:["catSlider"],
  queryFn:getCatSlider,
  staleTime:5000,
  retry:4,
  retryDelay:2000,
})

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
  };
  return (
    <>
    <div className="container mx-auto my-10">
      <h3 className='m-2'>Show Popular Categories :</h3>
    <Slider {...settings}>
              {data?.data?.data.map((cat)=>
              <>
              <div className="text-center">
                <img src={cat.image} className='h-[200px]' alt="" />
                <p>{cat.name}</p>
              </div>
              </>
                
              )}
            </Slider>
    </div>
    </>
  )
}


