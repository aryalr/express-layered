const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.post("/products", async (req, res) => {
  const newProduct = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });

  res.send({
    messages: "Berhasil tambahkan product: ",
    data: product,
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send(`Produk dihapus dengan nama: ${deletedProduct.name}`);
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.upsert({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });

  res.send({
    messages: "Edit product berhasil dengan data:",
    data: product,
  });
});

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
