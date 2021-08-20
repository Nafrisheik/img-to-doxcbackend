const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const imgRoute = require('./Api/docxApi');

app.use('/',imgRoute);

app.listen(8000, () => {
  console.log("listening");
});
