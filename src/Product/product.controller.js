// Handle request, response, dan validasi body

const express = require("express");
const prisma = require("../db");
const {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
} = require("./product.service");

const router = express.Router();

// Read all data in /product
router.get("/", async (req, res) => {
  const products = await getAllProduct();
  res.send(products);
});

// Get data by Product's id
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Validasi id = number
    if (Number.isNaN(productId)) {
      res.status(400).send({
        message: "Invalid: Id harus berupa angka",
      });
      return;
    }

    const product = await getProductById(productId);
    res.send(product);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

// Create product
router.post("/", async (req, res) => {
  const newProduct = req.body;

  try {
    const product = await createProduct(newProduct);

    res.send({
      messages: "Berhasil tambahkan product: ",
      data: product,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete data product
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = deleteProduct(parseInt(productId))

  res.send(`Produk dihapus dengan nama: ${product.name}`);
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
