import { assert } from 'console';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { getHistoricalPrices }  from 'yahoo-stock-api';
import { yahooResponse } from '../interfaces/yahoo';
import { yahooSliceActions } from '../store/yahooSlice';

export function useYahooFinance() {
    const dispatch = useDispatch()
    const getPrices = useCallback(async( ticker: string, startDate: Date, endDate: Date) => {
        if(startDate > endDate) {
            throw new Error("Start date cannot be after end date");
        }
        dispatch(yahooSliceActions.startLoading())
        const response: yahooResponse = await getHistoricalPrices(startDate, endDate, ticker, '1d');
        if(response.error) {
            dispatch(yahooSliceActions.setError(response.message || response.data))
        }
        dispatch(yahooSliceActions.setData(response.data))
    }, [dispatch])

    return { getPrices }
}