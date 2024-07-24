import { createSlice } from "@reduxjs/toolkit";


const cartslice = createSlice({
    name : "cartslice",
    initialState : {
        cartitems : JSON.parse(localStorage.getItem("CartData")) || [],
        resinfo : JSON.parse(localStorage.getItem("ResInfo")) || []
    },
    reducers : {
        addToCart : (state,action)=>{
            // console.log(action.payload);
            const {info , ResInfo} = action.payload
            // setcartdata((prev)=> [...prev,info])
            state.cartitems = [...state.cartitems,info]
            state.resinfo = ResInfo
            localStorage.setItem("CartData",JSON.stringify(state.cartitems))
            localStorage.setItem("ResInfo",JSON.stringify(ResInfo))
        },
        deleteFromCart : (state,action)=>{
            state.cartitems = action.payload
            localStorage.setItem("CartData",JSON.stringify(action.payload))
        },
        clearCart : (state)=>{
            state.cartitems = []
            state.resinfo = []
            localStorage.removeItem("CartData")
            localStorage.removeItem("ResInfo")
        }
    }
})

export const {addToCart,deleteFromCart,clearCart} = cartslice.actions;
export default cartslice.reducer;