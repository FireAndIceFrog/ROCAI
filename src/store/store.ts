import { createStore, combineReducers } from 'redux'
import { yahooSliceReducer } from './yahooSlice'

const reducer = combineReducers({
    yahooSlice: yahooSliceReducer,
})

export const store = createStore(reducer)