// Service berguna untuk handle logika bisnis

const {
  findAllProduct,
  findProductById,
  createProduct,
  deleteProductById,
  updateProductById,
} = require("./product.repository");

const getAllProduct = () => {
  const product = findAllProduct;
  return product;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("Invalid: Id bukan number");
  }

  const product = await findProductById(id);
  if (!product) {
    throw Error(`Product dengan id: ${id} tidak ditemukan`);
  }
  return product;
};

const createNewProduct = async (newProduct) => {
  product = await createProduct(newProduct);
};

const deleteProduct = async (id) => {
  if (typeof id !== "number" || Number.isNaN(id)) {
    throw Error("Invalid: product ID bukan number");
  }

  const product = await deleteProductById(id);

  if (!product) {
    throw Error(`Product dengan id: ${id} tidak ditemukan`);
  }
};

const updateProduct = async (productData, id) => {
  // data validasi input
  const requiredFields = ["name", "description", "price", "image"];

  // looping untuk pengecekan data
  for (const field of requiredFields) {
    if (
      productData[field] === undefined ||
      productData[field] === null ||
      productData[field] === ""
    ) {
      throw Error(`Update gagal: Data ${field} belum diisi`);
    }
  }

  const product = await updateProductById(id, productData);
  return product;
};

const patchProduct = async (productData, id) => {
  const product = await updateProductById(id, productData);
  return product;
};

module.exports = {
  getAllProduct,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
  patchProduct,
};
