const express = require('express');
const app = express();
const port = 3033;

app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
})