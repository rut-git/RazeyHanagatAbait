import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || "",
        isUserLoggedIn: localStorage.getItem("token") ? true : false,
        userFullName: "",
        role:""
    },
    reducers: {
        setToken: (state, action) => {
            
            const token = action.payload.accesToken
            state.token = token
            state.isUserLoggedIn = true
            localStorage.setItem("token", token)
            localStorage.setItem("role", action.payload.role)
            
        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            state.role=""
            localStorage.removeItem("token")
            localStorage.removeItem("role")
        },
       
    }
})
export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions
