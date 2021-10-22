import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface yahooSliceState {
    data: any[];
    loading: boolean;
    error: any;
}

const initialState: yahooSliceState = {
    data: [],
    loading: false,
    error: undefined
}

const yahooSlice = createSlice({
    name: 'yahooSlice',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any[]>)=> {
            state.data = action.payload
            state.error = undefined
            state.loading = false
        },
        setError: (state, action: PayloadAction<any>)=>{
            state.error = action.payload
            state.data = []
            state.loading = false
        },
        startLoading: (state)=> {
            state.data = [];
            state.error = undefined
            state.loading = true
        }
    }
  })

export const yahooSliceActions = yahooSlice.actions;
export const yahooSliceReducer = yahooSlice.reducer;
export default yahooSlice;
