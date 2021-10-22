import { createStore, combineReducers } from 'redux'
import { yahooSliceReducer, yahooSliceState } from './yahooSlice'

const reducer = combineReducers({
    yahooSlice: yahooSliceReducer,
})

export const store = createStore(reducer)
export interface AplicationState {
    yahooSlice: yahooSliceState
}