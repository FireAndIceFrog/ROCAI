
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useYahooFinance } from '../../hooks/yahoo';
import { AplicationState } from '../../store/store';
import { yahooSliceState } from '../../store/yahooSlice';

const columns = [
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: false,
    },
    {
        field: 'open',
        headerName: 'Open',
        width: 150,
        editable: false,
    },
    {
        field: 'high',
        headerName: 'High',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'low',
        headerName: 'Low',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'close',
        headerName: 'Close',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'volume',
        headerName: 'Colume',
        type: 'number',
        width: 110,
        editable: false,
    },
];

interface TableProps {
    ticker: string, 
    startDate: Date, 
    endDate: Date
}

export function Table({ticker, startDate, endDate}: TableProps) {
    const { getPrices } = useYahooFinance()
    const { data, loading, error } = useSelector<AplicationState, yahooSliceState>(state=>state.yahooSlice)
    useEffect(()=> {
        getPrices(ticker, startDate, endDate)
    }, [ticker, startDate, endDate, getPrices])

    

    if(loading) return <div></div>;
    else if(error) return <div>{error}</div>;
    else {
        return <div>{data}</div>
    }
}