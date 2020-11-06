const express = require('express');
const app = express();
const parser = require('body-parser');
const request = require('request');
const path = require('path');
const morgan = require('morgan');
const port = process.env.PORT || 3033;

app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(express.static('./client'));

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});

app.get('/bonus/:id', (req, res) => {
  request('http://ec2-13-57-226-88.us-west-1.compute.amazonaws.com')
  .pipe(res);
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/index.html'), (err) => {
    if (err) {
      res.send(err);
    } else {
      console.log('HTML re-served');
    }
  })
});
