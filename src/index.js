const express = require("express");
require("dotenv").config();
const productController = require("./Product/product.controller");

const app = express();
const port = process.env.PORT;

app.use(express.json());

// Landing page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Product endpoint
app.use("/products", productController);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
