import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { backendUrl } from '../data/common';
import { PriceData, yahooResponse } from '../interfaces/yahoo';
import { yahooSliceActions } from '../store/yahooSlice';

export function useYahooFinance() {
    const dispatch = useDispatch()
    const getPrices = useCallback(async( ticker: string, startDate: Date, endDate: Date) => {
        if(startDate > endDate) {
            dispatch(yahooSliceActions.setError("Start date cannot be after end date"))
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

export function useFeaturesDataParser()  {
    const dataParser = useCallback((data: PriceData[])=>{
        const rows = data.filter(row=> row.close !== null && row.close !== undefined )
        const finalData = []
        for(let i = 0; i < rows.length-1; ++i){
            // rows[i] -= rows[i+1]
            const id = String(i)
            const open = rows[i+1].open - rows[i].open
            const high = rows[i+1].high - rows[i].high
            const low = rows[i+1].low - rows[i].low
            const close = rows[i+1].close - rows[i].close
            const volume = rows[i+1].volume - rows[i].volume

            finalData.push({ date: new Date((rows[i].date as number)*1000), adjclose: rows[i].adjclose ,open, high, low, close, volume, id})
            
        }
        finalData.reverse()
        return finalData
    },[])
    return dataParser
}