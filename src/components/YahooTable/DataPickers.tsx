import { useContext, useState } from "react";
import DatePicker from 'react-date-picker'
import { Grid, Paper, Typography, TextField, Button, Divider } from "@mui/material";
import {StockContext} from "./index"
import SendIcon from '@mui/icons-material/Send';
// import DateFnsUtils from "@date-io/date-fns";

function DataPickers() {
    const stock = useContext(StockContext)
    const [ticker, setTicker] = useState<string>(stock.ticker)
    const { startDate, endDate, setData} = stock;


  return (
    <Grid container>
            <Grid item xs = {12} >
                <Paper sx={{paddingBottom:"2%"}}>
                <Typography>Start Date</Typography>
                    <DatePicker
                        onChange={(date: Date) => {
                            if(date) {
                                setData({startDate: date })}
                            }
                        }
                        value={startDate}
                    />
                </Paper>
            </Grid>
            <Grid item xs = {12}>
            <Paper sx={{paddingBottom:"2%"}}>
                <Typography>End Date</Typography>
                <DatePicker
                   onChange={(date: Date) => {
                        if(date) {
                            setData({endDate: date })}
                        }
                    }
                    value={endDate}
                />
                </Paper>
            </Grid>

            <Grid item xs = {12}>
                <Paper sx={{paddingBottom:"2%"}}>
                    <Typography>Ticker</Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue={ticker}
                        onChange={(evt)=>setTicker(evt.currentTarget.value)}
                        sx={{
                            paddingRight: "1%"
                        }}
                        />
                        <Button variant="contained" endIcon={<SendIcon />} size="large" onClick={() => {
                            if(ticker) {
                                setData({ticker})}
                            }
                        }>
                        Send
                        </Button>
                </Paper>
            </Grid>
    </Grid>
  );
}

export default DataPickers;