const express = require('express');
const app = express();
const parser = require('body-parser');
const request = require('request');
const morgan = require('morgan');
const port = process.env.PORT || 3033;
const bonusUrl = 'http://localhost:3031/'

app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Send header to allow all cross origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
})

app.get('/', (req, res) => {
  request(bonusUrl).pipe(res);
})
