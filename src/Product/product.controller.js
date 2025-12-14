// Handle request, response, dan validasi body

const express = require("express");
const {
  getAllProduct,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
  patchProduct,
} = require("./product.service");

const router = express.Router();

// Read all data in /product
router.get("/", (req, res) => {
  const products = getAllProduct();
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
    const product = await createNewProduct(newProduct);

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

  const product = await deleteProduct(parseInt(productId));

  res.send(`Produk dihapus dengan nama: ${product.name}`);
});

// Update product
router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  // Validasi Product id
  if (isNaN(productId)) {
    return res.status(400).send({
      message: "Id harus berupa angka",
    });
  }

  try {
    const product = await updateProduct(productData, parseInt(productId));

    res.send({
      messages: "Edit product berhasil dengan data:",
      data: product,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).send({ message: "Product tidak ditemukan" });
    }
    res.status(400).send({ message: err.message });
  }
});

// Update partial data product
router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  // Validasi product id
  if (isNaN(productId)) {
    return res.status(400).send({ message: "ID harus berupa angka" });
  }

  try {
    const product = await patchProduct(productData, parseInt(productId));

    res.send({
      message: "Update data berhasil",
      data: product,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).send({ message: "Product tidak ditemukan" });
    }
    res.status(400).send(err.message);
  }
});

module.exports = router;
