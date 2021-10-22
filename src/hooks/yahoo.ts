import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getHistoricalPrices }  from 'yahoo-stock-api';
import { yahooSliceActions } from '../store/yahooSlice';

export function useYahooFinance() {
    const dispatch = useDispatch()
    const getPrices = useCallback(async( ticker: string, startDate: Date, endDate: Date) => {
        dispatch(yahooSliceActions.startLoading())
        const prices = await getHistoricalPrices(startDate, endDate, ticker, '1d');
        if(prices.error) {
            dispatch(yahooSliceActions.setError(prices.response))
        }
        dispatch(yahooSliceActions.setData(prices.response))
    }, [dispatch])

    return { getPrices }
}