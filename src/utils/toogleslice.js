import { createSlice } from "@reduxjs/toolkit";


const toogleslice = createSlice({
    name:"toogleslice",
    initialState:{
        searchBarToogle : false,
        loginToggle : false,
        IsDiffRes:false,
        SimilarResDishes:{
            IsSimResDishes:false,
            city:"",
            resLocation:"",
            resId:"",
            itemId:""
        }
    },
    reducers:{
        toogleSearchBar :(state,action)=>{
            state.searchBarToogle = !state.searchBarToogle
        },
        loginToggle :(state)=>{
            state.loginToggle = !state.loginToggle
        },
        ToggleIsDiffRes :(state)=>{
            state.IsDiffRes = !state.IsDiffRes
        },
        setSimilarResDish : (state,action) =>{
            state.SimilarResDishes = action.payload
        },
        resetSimilarResDish : (state) =>{
            state.SimilarResDishes = {
                IsSimResDishes:false,
                city:"",
                resLocation:"",
                resId:"",
                itemId:""
            }
        }
    }
})

export const { toogleSearchBar, loginToggle,ToggleIsDiffRes,setSimilarResDish,resetSimilarResDish} = toogleslice.actions
export default toogleslice.reducer