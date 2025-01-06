import React from 'react'
import styles from './ProdectedAuth.module.css'
import { Navigate } from 'react-router-dom'
export default function ProdectedAuth(props) {
  if(localStorage.getItem("userToken"))
  {
    return <Navigate to="/"></Navigate>
  }
  else{
    return props.children;
  }
  
}


