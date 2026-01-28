import express from "express";

import cors from "cors";
import { connectedDB } from "./DB/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

const startServer=async()=>{
  await connectedDB(process.env.MONGO_URI);
  app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
  });
};
startServer();

//const mongoURI = "mongodb://127.0.0.1:27017/gocode-shop";





/* const importProducts = async () => {
  try {
  
    await mongoose.connect(mongoURI);
    console.log(" MongoDB Connected");
  // await Product.deleteMany({});
//console.log("All products deleted");

    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

   
    for (const p of products) {
  
      const exists = await Product.findOne({  title: p.title });
      if (!exists) {
        const product = new Product(p);
        await product.save();
        console.log(` Added product ${p._id}`);
      } else {
        console.log(` Product ${p._id} already exists, skipped`);
      }
    }

    console.log("All products imported!");
     const p = await Product.find({});
    console.log("All products in DB:");
    console.log(p);
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err.message);
  }
};


//importProducts(); */



/* app.get("/products",getAllProductsController);

app.get("/products/:id", getProductByIdController);

app.post("/products",createProductController);

app.post("/resetProducts",resetProductsController);

app.delete("/products/:id",deleteProductController);

app.put("/products/:id",updateProductController); */
//app.post("/resetUsers",resetUsersController);




/* app.get("/products/getAll", (req, res) => {
  const products = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parsedProducts = JSON.parse(products);
  console.log(parsedProducts);
  return res.send(parsedProducts);
});
app.get("/products/getById/:id", (req, res) => {
const idToFind=+req.params.id;
console.log(idToFind);
 const products = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parsedProducts = JSON.parse(products);
 const itemToFind =parsedProducts.find(item=>item.id===idToFind);
 if (!itemToFind) {
  return res.status(404).json({ error: "This product is not found" });
}

  return res.send(itemToFind);
});

app.post("/products/add", (req, res) => {
  const products = fs.readFileSync("./products.json", "utf-8");
  const parsedProducts = JSON.parse(products);

 
  const requiredFields = [
    "title",
    "price",
    "description",
    "category",
    "image",
    "rating"
  ];
//of-value in arr
  for (const field of requiredFields) {
    if (!(req.body).hasOwnProperty(field)) {
      return res.status(400).json({ error: `Missing field: ${field}` });
    }
  }

  if (
!(req.body.rating).hasOwnProperty("rate") ||!(req.body.rating).hasOwnProperty("count") ) {
    return res.status(400).json({ error: "Missing rating.rate or rating.count" });
  }

  const newId = parsedProducts.length ? parsedProducts[parsedProducts.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: {
      rate: req.body.rating.rate,
      count: req.body.rating.count
    }
  };

  parsedProducts.push(newProduct);

  fs.writeFileSync("./products.json", JSON.stringify(parsedProducts, null, 2), "utf-8");

  return res.status(201).json({
    message: "Product added successfully",
    newProduct
  });
});
app.delete("/products/delete/:id",(req, res) => {
 const products = fs.readFileSync("./products.json", { encoding: "utf-8" });
  const parsedProducts = JSON.parse(products);
  const inputId=req.params.id;
  
  
  const deletedProduct = parsedProducts.find(item => item.id === +inputId);
  const filteredProducts=parsedProducts.filter(item=>item.id!=+inputId);
   if (filteredProducts.length === parsedProducts.length) {
     return res.status(400).json({error:"The item does not exist in products"});
    }
    const productsString = JSON.stringify(filteredProducts, null, 2);
  
  fs.writeFileSync("./products.json", productsString, "utf-8");

    return res.status(200).json({
    message:`Product ${req.params.id} deleted succecfully`,
    deletedTodoItem:deletedProduct
    });
});

app.patch("/products/update/:id",(req,res)=>{
  const products = fs.readFileSync("./products.json", "utf-8");
  const parsedProducts = JSON.parse(products);

  const idToUp=+(req.params.id);
  const obj=req.body;
  const p=parsedProducts.find(item=>item.id===idToUp)
  if (!p) {
   return res.status(400).json({error:"The specified product was not found."});
  }
  const allowedFields = ["title",
    "price",
    "description",
    "category",
    "image",
    "rating"];
  
 let invalidField=null;
  for (let field in Object.keys(obj)) {
   
    if (!allowedFields.includes(field)) {
      invalidField =field;
      break;
    }
        for (let f in obj.rating) {
      if ((f!=="rate" )&&(f!=="count") ) {
        invalidField =f ;
        break;
      }
    }
  } 
  
  if (invalidField) {
   return res.status(404).json({error: `Incorrect field: ${invalidField}. `});
  }
  if (obj.rating) {
  if (obj.rating.rate !== undefined) p.rating.rate = obj.rating.rate;
  if (obj.rating.count !== undefined) p.rating.count = obj.rating.count;
}

   for (let field in obj)
   {
    if(field!="rating")
    p[field]=obj[field];
   }

  
  
   const productString = JSON.stringify(parsedProducts, null, 2);
   fs.writeFileSync("./products.json", productString, "utf-8");
   return res.status(200).json({
    message:`product ${idToUp} updated succecfully`,
    updateProduct:p

   });
});*/
