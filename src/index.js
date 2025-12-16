const express = require("express");
require("dotenv").config();
const productController = require("./Product/product.controller");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware);

// Landing page
app.get("/", (req, res) => {
  res.send("Landing Page");
});

// Product endpoint
app.use("/products", productController);
app.use('/user')
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
