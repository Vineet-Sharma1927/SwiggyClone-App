import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: "filterSlice",
    initialState:{
        filterVal : null
    },
    reducers:{
        setfilterValue:(state,action)=>{
            state.filterVal = action.payload
        }
    }
})

export const {setfilterValue} = filterSlice.actions
export default filterSlice.reducer