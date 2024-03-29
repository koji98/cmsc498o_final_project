const express = require('express');
const app = express();
const cors = require('cors');
const pt = require('periodic-table');

app.use(cors());

app.get('/', (req, res) => {
  res.json({data: pt.all()});
});

app.listen(8000, () => console.log("Listening on port 8000"));
