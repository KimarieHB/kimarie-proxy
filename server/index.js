const express = require('express');
const app = express();
const parser = require('body-parser');
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

// app.get('/bonus/:id', )
  //redirect to deployed url for service/bonus/:id

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/index.html'), (err) => {
    if (err) {
      res.send(err);
    } else {
      console.log('HTML re-served');
    }
  })
});
