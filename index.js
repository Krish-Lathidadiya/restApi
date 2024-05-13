require('dotenv').config();
const express = require("express");
const app = express();
const connectionDB = require("./db/db");

const productRouter=require('./routes/product.route');

app.use('/api/v1/products',productRouter)

port = process.env.PORT || 3000;
connectionDB().then(() => {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
});
