import React from 'react'
import styles from './Loader.module.css'
import { PropagateLoader } from 'react-spinners'
export default function Loader() {
  
  return (
    <>
      <div className="container h-screen  mx-auto">
        <div className="flex justify-center items-center">
        <PropagateLoader/>
        </div>
       
      </div>
    </>
  )
}


