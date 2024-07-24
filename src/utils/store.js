import  { configureStore } from "@reduxjs/toolkit"
import toogleslice from "./toogleslice";
import cartslice from "./cartslice";
import filterSlice from "./filterSlice";
import AuthSlice from "./AuthSlice";


const store = configureStore({
    reducer :{
        toogleslice,
        cartslice,
        filterSlice,
        AuthSlice
    }
})

export default store;