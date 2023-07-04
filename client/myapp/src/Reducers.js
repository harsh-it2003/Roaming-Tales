import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:false,
}

export const loginReducer=createReducer(initialState,{
    login:(state,action)=>{
        state.isLoggedIn=true;
    },
    logout:(state,action)=>{
        state.isLoggedIn=false;
    },
});


const tabState={
    tabNo:0,
    tabColor:"white",
}

export const tabReducer=createReducer(tabState,{
    changeTabNo:(state,action)=>{
        state.tabNo=action.payload;
    },
    changeTabColor:(state,action)=>{
        state.tabColor=action.played;
    }
})