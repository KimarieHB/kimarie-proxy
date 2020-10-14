const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const request = require('request');
const morgan = require('morgan');
const port = process.env.PORT || 3033;

app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

//need to get static files serving
app.use('/', express.static('client/src'));

// Send header to allow all cross origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
})

// This should become unneccessary when express static works
app.get('/', (req, res) => {
  res.sendFile('/Users/kimmybeee/Desktop/kimarie-proxy/client/index.html');
});

app.get('/bonuses/bundle.js', (req, res) => {
  console.log('Worked!');
  request('http://localhost:3031/bundle.js').pipe(res);
});

app.get('/items/bundle.js', (req, res) => {
  request('http://localhost:3200/bundle.js').pipe(res);
});

app.get('/tiers/bundle.js', (req, res) => {
  request('http://localhost:3101/bundle.js').pipe(res);
});

app.get('/descriptions/bundle.js', (req, res) => {
  request('http://localhost:3663/bundle.js').pipe(res);
});
