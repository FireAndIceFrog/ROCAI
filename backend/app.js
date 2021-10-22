// @ts-ignore
const yahooApi = require('yahoo-stock-api');
const  express = require('express');

const app = express()
const port = 8080

app.post('/getPrices', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const query = req.query;
  const startDate = new Date(parseFloat(query["startDate"]));
  const endDate = new Date(parseFloat(query["endDate"]));
  const ticker = query["ticker"];

  if(!startDate && !endDate && !ticker) {
    
    res.sendStatus(500)
    return
  }

  const response = await yahooApi.getHistoricalPrices(startDate, endDate, ticker, '1d');
  res.send(response)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})