const express = require('express');
const app = express();
const pt = require('periodic-table');

app.get('/', (req, res) => {
  res.render('home', {data: pt.all()});
});

app.listen(8000, () => console.log("Listening on port 8000"));
