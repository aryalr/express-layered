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

// Function Wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Read all data in /product
router.get(
  "/",
  asyncHandler((req, res) => {
    const products = getAllProduct();
    res.send(products);
  })
);

// Get data by Product's id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const productId = parseInt(req.params.id);

    // Validasi id = number
    if (Number.isNaN(productId)) {
      const error = new Error("Invalid: Id harus berupa angka");
      error.status = 400;
      throw error;
    }

    const product = await getProductById(productId);
    res.send(product);
  })
);

// Create product
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newProduct = req.body;
    const product = await createNewProduct(newProduct);

    res.send({
      messages: "Berhasil tambahkan product: ",
      data: product,
    });
  })
);

// Delete data product
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const productId = req.params.id;

    if (Number.isNaN(productId)) {
      const error = new Error("Invalid: Id harus berupa angka");
      error.status = 400;
      throw error;
    }

    const product = await deleteProduct(parseInt(productId));

    res.send(`Produk dihapus dengan nama: ${product.name}`);
  })
);

// Update product
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    // Validasi Product id
    if (isNaN(productId)) {
      const error = new Error("Invalid: Id harus berupa angka");
      error.status = 400;
      throw error;
    }

    const product = await updateProduct(productData, parseInt(productId));

    res.send({
      messages: "Edit product berhasil dengan data:",
      data: product,
    });
  })
);

// Update partial data product
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    // Validasi product id
    if (isNaN(productId)) {
      const error = new Error("Invalid: Id harus berupa angka");
      error.status = 400;
      throw error;
    }

    const product = await patchProduct(productData, parseInt(productId));

    res.send({
      message: "Update data berhasil",
      data: product,
    });
  })
);

module.exports = router;
