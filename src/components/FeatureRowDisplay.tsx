
import { Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { AplicationState } from '../store/store';
import { yahooSliceState } from '../store/yahooSlice';
interface FeatureRowDisplayProps {
    windowSize: number
}
export function FeatureRowDisplay({windowSize}: FeatureRowDisplayProps) {
    const { data, loading, error } = useSelector<AplicationState, yahooSliceState>(state=>state.yahooSlice);
    useEffect(() => {
        const closes = data.map(x=>x.close)
        for(let i =0; i < closes.length - windowSize; ++i) {
            const window = []
            const slice = closes.slice(i, i+windowSize)
            for(let j =0; j< windowSize; ++j ) {
                
            }
        }

    },[data, windowSize])


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
        
      </div>
    }
}