import { configureStore } from "@reduxjs/toolkit";
import { loginReducer,tabReducer } from "../Reducers";


export const store=configureStore({
    reducer:{
        loginReducer,
        tabReducer,
    }
})
