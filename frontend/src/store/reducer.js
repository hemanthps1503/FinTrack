import { createSlice } from "@reduxjs/toolkit";


const initialState={
    categories:[],
    transaction:[]
}
export const expenseslice=createSlice({
    name:'expense',
    initialState,
    reducers:{
        gettransaction:(state)=>{

        }
    }
})

export const {gettransaction}=expenseslice.actions;
export default expenseslice.reducer;