// Service berguna untuk menjalankan logika bisnis

const prisma = require("../db");

const getAllProduct = async () => {
  const product = await prisma.product.findMany();
  return product;
};

module.exports = {
  getAllProduct,
};
