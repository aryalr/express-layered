// Service berguna untuk handle logika bisnis

const prisma = require("../db");

const getAllProduct = async () => {
  const product = await prisma.product.findMany();
  return product;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("Invalid: Id bukan number");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw Error(`Product dengan id: ${id} tidak ditemukan`);
  }
  return product;
};

const createProduct = async (newProduct) => {
  await prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });
};

const deleteProduct = async (id) => {
  if ((typeof id !== "number") || Number.isNaN(id)) {
    throw Error("Invalid: product ID bukan number");
  }

  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  if (!product) {
    throw Error(`Product dengan id: ${id} tidak ditemukan`);
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
};
