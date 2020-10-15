const express = require('express');
const app = express();
const parser = require('body-parser');
const request = require('request');
const morgan = require('morgan');
const port = process.env.PORT || 3033;

app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(express.static('./client'));

// Send header to allow all cross origin requests; header may need to be more specific in production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});

app.get('/bonuses/bundle.js', (req, res) => {
  request('http://localhost:3031/bundle.js')
  .on('error', (err) => {
    let msg = 'Error on connection to BONUSES';
    console.log(msg, err);
    res.status(500).send(msg);
  })
  .pipe(res);
});

app.get('/items/bundle.js', (req, res) => {
  request('http://localhost:3200/bundle.js')
  .on('error', (err) => {
    let msg = 'Error on connection to ITEMS';
    console.log(msg, err);
    res.status(500).send(msg);
  })
  .pipe(res);
});

app.get('/tiers/bundle.js', (req, res) => {
  request('http://localhost:3101/bundle.js')
  .on('error', (err) => {
    let msg = 'Error on connection to TIERS';
    console.log(msg, err);
    res.status(500).send(msg);
  })
  .pipe(res);
});

app.get('/descriptions/bundle.js', (req, res) => {
  request('http://localhost:3663/bundle.js')
  .on('error', (err) => {
    let msg = 'Error on connection to DECRIPTIONS';
    console.log(msg, err);
    res.status(500).send(msg);
  })
  .pipe(res);
});

app.get('/charity/bundle.js', (req, res) => {
  request('http://localhost:3987/bundle.js')
  .on('error', (err) => {
    let msg = 'Error on connection to CHARITIES';
    console.log(msg, err);
    res.status(500).send(msg);
  )}
  .pipe(res);
});
