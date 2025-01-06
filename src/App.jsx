import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Layout from './components/Layout/Layout'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Card from './components/Card/Card'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import LogIn from './components/LogIn/LogIn'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProdectedAuth from './components/ProdectedAuth/ProdectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import AllOrder from './components/AllOrder/AllOrder'
import CheckOut from './components/CheckOut/CheckOut'
import { Offline } from 'react-detect-offline'
const queryClient = new QueryClient()
function App() {
  let routers=createBrowserRouter([{
    path:"",element:<Layout/>,children:[
      {index:true,element:<ProtectedRoutes><Home/></ProtectedRoutes> },
      {path:"login",element:<ProdectedAuth><LogIn/></ProdectedAuth>},
      {path:"register",element:<ProdectedAuth><Register/></ProdectedAuth>},
      {path:"card",element:<ProtectedRoutes><Card/></ProtectedRoutes>},
      {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"cat",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"allorders",element:<ProtectedRoutes><AllOrder/></ProtectedRoutes>},
      {path:"checkout",element:<ProtectedRoutes><CheckOut/></ProtectedRoutes>},
      {path:"productdetails/:id/:category",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:"*",element:<NotFound/>},
    ]
  }])
  
  return (
    <>
     <QueryClientProvider client={queryClient}>
     <RouterProvider router={routers}></RouterProvider>
     <ReactQueryDevtools initialIsOpen={false} />
     {/* <Offline >
      <div className="fixed bottom-1 left-1 bg-red-600 text-white px-3 py-4 rounded-lg">You Are Offline</div>
     </Offline> */}
     <Toaster/>
    </QueryClientProvider>
    
    </>
  )
}

export default App
