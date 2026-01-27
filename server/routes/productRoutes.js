import express from "express";
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, resetProductsController, updateProductController } from  "../controllers/ProductController.js";
const router = express.Router();
//הנתיב הוא products...
router.get("/",getAllProductsController);

router.get("/:id", getProductByIdController);

router.post("/",createProductController);

router.post("/resetProducts",resetProductsController);

router.delete("/:id",deleteProductController);

router.put("/:id",updateProductController);
export default router;