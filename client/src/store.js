import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./app/apiSlice"
import authSliceReducer from "./authSlice"

const store = configureStore({
    reducer: {

        auth: authSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
export default store