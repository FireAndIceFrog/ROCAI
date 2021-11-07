
import { Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useYahooFinance } from '../../hooks/yahoo';
import { AplicationState } from '../../store/store';
import { yahooSliceState } from '../../store/yahooSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { StockContext } from '.';
import { PriceData } from '../../interfaces/yahoo';

export const columns = [
    {
        field: 'date',
        headerName: 'Date',
        width: 300,
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
        width: 200,
        editable: false,
    },
    {
        field: 'volume',
        headerName: 'Volume',
        type: 'number',
        width: 200,
        editable: false,
    },
];

interface TableProps {
    dataParser?: ((rows: PriceData[])=>(PriceData & { id: string })[]) | undefined
}

export function Table({ dataParser }: TableProps) {
    const { getPrices } = useYahooFinance();
    const { data, loading, error } = useSelector<AplicationState, yahooSliceState>(state=>state.yahooSlice);
    
    const { startDate, endDate, ticker} = useContext(StockContext);
    useEffect(()=> {
        getPrices(ticker, startDate, endDate)
    }, [ticker, startDate, endDate, getPrices])


    
    console.log(`Data: ${data}`)

    let rows = data;
    if(!dataParser) {
        rows = rows.map((row, id )=> { return {...row, id, date: new Date(parseInt(row.date)*1000) }})
        rows = rows.filter(row=> row.close !== null && row.close !== undefined )
    } else {
        rows = dataParser(rows)
    }
    


    if(loading) return (
        <Grid container>
            <Grid item xs ={12}>
                <CircularProgress />
            </Grid>
        </Grid>
        );
    else if(error) return <Paper>{error}</Paper>;
    else {
        return <div style={{ height: "80vh", width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize={true}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    }
}