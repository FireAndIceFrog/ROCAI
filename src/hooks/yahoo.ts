import { assert } from 'console';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { getHistoricalPrices }  from 'yahoo-stock-api';
import { backendUrl } from '../data/common';
import { yahooResponse } from '../interfaces/yahoo';
import { yahooSliceActions } from '../store/yahooSlice';

export function useYahooFinance() {
    const dispatch = useDispatch()
    const getPrices = useCallback(async( ticker: string, startDate: Date, endDate: Date) => {
        if(startDate > endDate) {
            throw new Error("Start date cannot be after end date");
        }
        dispatch(yahooSliceActions.startLoading())
        const response = await fetch(`http://${backendUrl}/getPrices?startDate=${startDate.getTime()}&endDate=${endDate.getTime()}&ticker=${ticker}`, { mode: 'cors', method: "post" })
        // const response: yahooResponse = await getHistoricalPrices(startDate, endDate, ticker, '1d');
        const json: yahooResponse = await response.json();
        if(json.error) {
            dispatch(yahooSliceActions.setError(json.message || json.response))
        }
        dispatch(yahooSliceActions.setData(json.response))
    }, [dispatch])

    return { getPrices }
}