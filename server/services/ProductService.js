import fs from "fs";
import Product from "../models/productModel.js";


export const getAllProducts = () => {
  return Product.find({});
};

export const getProductById = async(id) => {
  return await Product.findOne({_id: id  });
  
};

export const createProduct = (data) => {
  const product = new Product(data);
  return product.save();
};

export const deleteProductById = (id) => {
  return Product.findByIdAndDelete({_id: id});
};

export const updateProductById = (id, data) => {
  return Product.findByIdAndUpdate({_id: id}, data, { new: true });
};

export const resetProductsFromFile = async () => {
  const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
  await Product.deleteMany({});
  return Product.insertMany(products);
};
