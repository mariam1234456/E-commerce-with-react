import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CardContext=createContext();
export default function CardContextProvider(props)
{
    const [numOfCart, setnumOfCart] = useState(0)
    const [cartId, setCartId] = useState(null)
    const [totalPrice, settTotalPrice] = useState(0)
    let headers ={
        token:localStorage.getItem("userToken")
    }
    async function addProductToCart(productId){
    return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
        productId
    },{
        headers
    }).then((response)=>{
        console.log(response);
        setCartId(response.data.data._id)
        setnumOfCart(response.data.numOfCartItems)
        settTotalPrice(response.data.data.totalCartPrice)
        toast.success(response.data.message);
        return response;
    }).catch((error)=>{
        console.log(error);
        toast.error(response.data.message);

        return error;
    })
    }
    async function getProductCart() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers
        }).then((response)=>{
            console.log(response);
            setCartId(response.data.data._id)
            setnumOfCart(response.data.numOfCartItems)
            settTotalPrice(response.data.data.totalCartPrice)
            return response;
        }).catch((error)=>{
            console.log(error);
            return error;
        })
    }
    async function deleteProductCart(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((response)=>{
            console.log(response);
            setnumOfCart(response.data.numOfCartItems)
            settTotalPrice(response.data.data.totalCartPrice)
            return response;
        }).catch((error)=>{
            console.log(error);
            return error;
        })
    }
    async function updateProductCart(productId,count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count
        },{
            headers
        }).then((response)=>{
            console.log(response);
            setCartId(response.data.data._id)
            settTotalPrice(response.data.data.totalCartPrice)
            
            return response;
        }).catch((error)=>{
            console.log(error);
            return error;
        })
    }
    async function clearProductCart() {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then((response)=>{
            console.log(response); 
            return response;
        }).catch((error)=>{
            console.log(error);
            return error;
        })
    }
    async function onlinePayment(shippingAddress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
            shippingAddress
        },
            {
            headers
        }).then((response)=>{
            console.log(response.data.session.url);
            window.location.href=response.data.session.url;
            
            return response;
        }).catch((error)=>{
            console.log(error);
            return error;
        })
    }





    return<CardContext.Provider value={{numOfCart,totalPrice,onlinePayment,clearProductCart,addProductToCart,updateProductCart,deleteProductCart,getProductCart}}>
{props.children}
    </CardContext.Provider>
   
}