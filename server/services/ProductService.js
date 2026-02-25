 import fs from "fs";
import Product from "../models/productModel.js";


export const getAllProducts = async() => {
  try {
        return await Product.find({});
    } catch (error) {
        throw new Error("Failed to fetch products: " + error.message);
    }
};

export const getProductById = async(id) => {
  try{
    return await Product.findOne({_id: id  });
  }
  catch (error) {
        return null; 
    }
  
};

export const createProduct = async (data) => {
  if (!data || Object.keys(data).length === 0) {
        throw new Error("Cannot create a product without data");
    }
  const product = new Product(data);
  return await product.save();
};

export const deleteProductById = async(id) => {
  return await Product.findByIdAndDelete(id);
};

export const updateProductById = async(id, data) => {
  return await Product.findByIdAndUpdate({_id: id}, data, { new: true ,runValidators: true});
};

export const resetProductsFromFile = async () => {
 
  const filePath = "./products.json";

   
  
    if (!fs.existsSync(filePath)) {
        throw new Error("Source file 'products.json' not found");
    }

    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");

      
        if (!fileContent.trim()) {
            throw new Error("The JSON file is empty");
        }

        const products = JSON.parse(fileContent);

       
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("The file must contain a non-empty array of products");
        }

    
        await Product.deleteMany({});
        return await Product.insertMany(products);

    } catch (error) {
     
        if (error instanceof SyntaxError) {
            throw new Error("Invalid JSON format in 'products.json'");
        }
      
        throw error;
    }
}; 

