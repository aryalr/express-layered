// Handle request, response, dan validasi body

const express = require("express");
const prisma = require('../db');
const { getAllProduct } = require("./product.service");

const router = express.Router();

// Read all data in /product
router.get("/", async (req, res) => {
  const products = getAllProduct
  res.send(products);
});

// Get data by Product's id
router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    return res
      .status(404)
      .send(`Product dengan id: ${productId} tidak ditemukan`);
  }

  res.send(product);
});

// Create product
router.post("/", async (req, res) => {
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

// Delete data product
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send(`Produk dihapus dengan nama: ${deletedProduct.name}`);
});

// Update product
router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  // data validasi input
  const updateData = ["name", "description", "price", "image"];

  // looping untuk pengecekan data
  for (const data of updateData) {
    if (!productData[data]) {
      return res.status(400).send({
        messages: `Update gagal: Data ${data} belum diisi`,
        data: null,
      });
    }
  }

  const product = await prisma.product.update({
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

// Update partial data product
router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
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
    messages: "edit data berhasil dengan data: ",
    data: product,
  });
});

module.exports = router;
