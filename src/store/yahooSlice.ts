import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface yahooSliceState {
    data: any[]
}

const initialState: yahooSliceState = {
    data: []
}

const yahooSlice = createSlice({
    name: 'yahooSlice',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any[]>)=> {
            state.data = action.payload
        }
    }
  })

export const yahooSliceActions = yahooSlice.actions;
export const yahooSliceReducer = yahooSlice.reducer;
export default yahooSlice;
