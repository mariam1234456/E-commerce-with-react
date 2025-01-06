import React from 'react'
import styles from './Home.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider.'
import { Helmet } from 'react-helmet'
export default function Home() {
  return (
    <>
    <Helmet>
                
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <MainSlider/>
    <CatSlider/>
    <FeatureProducts/>
    </>
   
  )
}


