import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  title: { type: String, required: true, min:5,max:800 },
  price: { type: Number, required: true ,min:0},
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: { type: Number,min:0,max:5 },
    count: { type: Number }
  }
});

 const Product = mongoose.model("Product", productSchema);
 export default Product;