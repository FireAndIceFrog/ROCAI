import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import { createContext, useState } from "react";
import { SetOptional } from "type-fest";
import DataPickers from "./DataPickers";
import { Table } from "./Table"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import YahooChart from "./YahooChart";
import { useFeaturesDataParser } from "../../hooks/yahoo";

interface stockData {
    startDate: Date;
    endDate:  Date;
    ticker: string;   



}
type setDataType = SetOptional<stockData, keyof stockData>

export const StockContext = createContext({
    startDate: new Date(),
    endDate: new Date(),
    ticker: "AAPL",
    setData: (data: setDataType)=> {}
});



export default function YahooTable () {
    const dataParser = useFeaturesDataParser();
    const [state, setState] = useState<stockData>({
        startDate: new Date('08/1/2020'),
        endDate:  new Date('08/21/2020'),
        ticker: "AAPL"
    });

    const setData = (data: setDataType) => {
        const newData = {...state}
        const keys = Object.keys(data) as (keyof setDataType)[];
        keys.forEach(key=>{
            const item = data[key]
            if( item !== undefined){
                (newData[key] as typeof item) = item;
            }
        })
        setState(newData)
    }   
    return (
    <StockContext.Provider value = {{...state, setData}} >
         <Accordion >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="date-content"
            id="date-content"
            >
                <Typography>Dates and ticker</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DataPickers/>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="data-content"
            id="data-content"
            >
                <Typography>Raw Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Table/>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="data-content"
            id="data-content"
            >
                <Typography>Feature Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Table dataParser={dataParser}></Table>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="data-content"
            id="data-content"
            >
                <Typography>Raw Data Chart</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <YahooChart/>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="data-content"
            id="data-content"
            >
                <Typography>Features Data Chart</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <YahooChart dataParser={dataParser}/>
            </AccordionDetails>
         </Accordion>
    </StockContext.Provider>
    )


}