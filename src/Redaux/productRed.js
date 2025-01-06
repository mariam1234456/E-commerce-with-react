import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getBrand=createAsyncThunk(
    "product/getBrand",
    async function () {
        let{data}=await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        return data;
    }
)
let initialState={
    brands:[],
}
let productSlice=createSlice({
    name:"product",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getBrand.fulfilled,(state,action)=>{
            state.brands=action.payload;
        });
    },
});
 export let productRed=productSlice.reducer;
