// Repository berguna untuk berkomunikasi dengan database

const prisma = require("../db");

const findAllProduct = async () => {
  const product = await prisma.product.findMany();
  return product;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
};

const createProduct = async (newProduct) => {
  const product = prisma.product.create({
    data: {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
    },
  });
  return product;
};

const deleteProductById = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });
};

const updateProductById = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
  return product;
};

module.exports = {
  findAllProduct,
  findProductById,
  createProduct,
  deleteProductById,
  updateProductById,
};
