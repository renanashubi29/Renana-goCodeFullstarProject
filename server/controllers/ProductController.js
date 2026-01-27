import { createProduct, deleteProductById, getAllProducts, getProductById, resetProductsFromFile, updateProductById } from "../services/ProductService.js";



export const getAllProductsController= async (req, res) => {
    try{
const products = await getAllProducts();
 res.send(products);
 } catch(error)
 {
    res.status(500).send({message:"Error fetching products",error});
 }
};

export const getProductByIdController = async (req, res) => {
  try {
     
    const product=await getProductById(req.params.id);
    if(!product){
      return res.status(404).json({message:"Product not found"});
    }
    res.json(product);
    }
 catch(error)
 {
      res.status(500).json({ message: `Invalid product id${req.params.id}` });
 }
  
 
};
export const createProductController =async(req,res)=>{
  try{
    const savedProduct=await createProduct(req.body);
    res.status(201).json(savedProduct);
  }
   catch(error)
 {
    res.status(400).json({message:"Error creating product",error:error.message});
 }
};
export const resetProductsController =async(req,res)=>{

  try{
   
    const allProducts=await resetProductsFromFile();
    res.status(201).json(allProducts).end();
  }
   catch(error)
 {
    res.status(400).json({message:"Error reserting products",error:error.message});
 }
};
 export const deleteProductController =async (req, res) => {
  try{
    const deletedProduct=await deleteProductById(req.params.id);
    if(!deletedProduct)
    {
          res.status(404).json({message:"Product not found: could not delete"});
    }
    res.json({
      message:"Product deleted successfully",
      product:deletedProduct
    });
    } catch(error)
 {
    res.status(500).send({message:"Error deleted product",error:error.message});
 }
  
};
export const updateProductController = async (req, res) => {
try{

  const id=req.params.id;
  const updateData={...req.body};
  const updatedProduct=await updateProductById(
    id,
    updateData
  );
  if(!updatedProduct)
  {
    return res.status(404).send({message:"Product not found"});
  }
res.send(updatedProduct);
}

catch(error)
 {
    res.status(500).send({message:"Error updating product",error});
 }


};