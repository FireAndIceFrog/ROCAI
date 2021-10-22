import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LiteralUnion } from 'type-fest';
import { getHistoricalPrices }  from 'yahoo-stock-api';
import { yahooResponse } from '../interfaces/yahoo';
import { yahooSliceActions } from '../store/yahooSlice';

export function useYahooFinance() {
    const dispatch = useDispatch()
    const getPrices = useCallback(async( ticker: string, startDate: Date, endDate: Date) => {
        dispatch(yahooSliceActions.startLoading())
        const response: yahooResponse = await getHistoricalPrices(startDate, endDate, ticker, '1d');
        if(response.error) {
            dispatch(yahooSliceActions.setError(response.data))
        }
        dispatch(yahooSliceActions.setData(response.data))
    }, [dispatch])

    return { getPrices }
}