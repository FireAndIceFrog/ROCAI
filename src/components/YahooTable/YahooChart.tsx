import { Grid } from '@mui/material'
import React, { useContext } from 'react'
//@ts-ignore
import { Chart, AxisOptions } from 'react-charts'
import { useSelector } from 'react-redux';
import { PriceData } from '../../interfaces/yahoo';
import { AplicationState } from '../../store/store';
import { yahooSliceState } from '../../store/yahooSlice';
import CircularProgress from '@mui/material/CircularProgress';
 
interface YahooChartProps {
    dataParser?: ((rows: PriceData[])=>(PriceData & { id: string })[]) | undefined
}

export default function YahooChart({dataParser}: YahooChartProps) {
    const { data, loading, error } = useSelector<AplicationState, yahooSliceState>(state=>state.yahooSlice);
    let rows = data
    if(!dataParser) {
        rows = rows.map((row, id )=> { return {...row, id, date: new Date(row.date*1000) }})
        rows = rows.filter(row=> row.close !== null && row.close !== undefined )
    } else {
        rows = dataParser(rows)
    }

    const chartData = React.useMemo(
    () => [
        {
            label: 'Open',
            data: rows.map(({date, open}: PriceData) => {
                return [date, open]
            })
        },
        {
            label: 'High',
            data: rows.map(({date, high}: PriceData) => {
                return [date, high]
            })
        },
        {
            label: 'Low',
            data: rows.map(({date, low}: PriceData) => {
                return [date, low]
            })
        },
        {
            label: 'Close',
            data: rows.map(({date, close}: PriceData) => {
                return [date, close]
            })
        }
    ],
    [rows]
    )

    const axes = React.useMemo(
    () => [
        { primary: true, type: 'time', position: 'bottom' },
        { type: 'linear', position: 'left' },
    ],
    []
    )

    if(rows){
        return (
            <Grid container>
                <Grid item xs = {12}>
                    <div
                    style={{
                        width: '100vw',
                        height: '60vh'
                    }}
                    >
                        <Chart data={chartData} axes={axes} primaryCursor tooltip/>
                        
                    </div>
                </Grid>
            </Grid>
        )
    } else {
        return (
        <Grid container>
            <Grid item xs ={12}>
            
                <CircularProgress />
            </Grid>
        </Grid>
        )
    }
    
}