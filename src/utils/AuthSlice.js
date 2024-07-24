import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name : "AuthSlice",
    initialState : {
        userData : JSON.parse(localStorage.getItem("UserData"))
    },
    reducers : {
        AddUserData : (state,action)=>{
            state.userData = action.payload
            localStorage.setItem("UserData",JSON.stringify(action.payload))
        },
        DeleteUserData : (state)=>{
            state.userData = null
            localStorage.removeItem("UserData")
        }
    }
})

export const  {AddUserData , DeleteUserData} = AuthSlice.actions;
export default AuthSlice.reducer