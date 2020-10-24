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

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Headers', '*');
//   // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});

// app.get('/*', (req, res) => {
//   request('http://localhost:3031')
//   .on('error', (err) => {
//     let msg = 'Error on connection to BONUSES';
//     console.log(msg, err);
//     res.status(500).send(msg);
//   })
//   .pipe(res);
// });
