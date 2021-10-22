// @ts-ignore
const yahooApi = require('yahoo-stock-api');
const  express = require('express');

const app = express()
const port = 8080

app.get('/getPrices', async (req, res) => {

  const query = req.query;
  const startDate = query["startDate"];
  const endDate = query["startDate"];
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