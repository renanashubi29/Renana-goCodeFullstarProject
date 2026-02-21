import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import { SingleProductPage } from "./pages/singleProductPage.jsx";
import { useEffect,  useState } from "react";
import { ShopContext } from "./ShopContext";
import { AdminPage } from "./pages/adminPage.jsx";
import { useQuery } from "@tanstack/react-query";
import { handleProducts,deleteProductApi, updateProductApi, addNewProductApi } from "./api/productsApi.js";




export const Router=()=>{
   const [products, setProducts] = useState([]);
 const [minMax, setminMax] = useState([0, 1000]);
//const [range, setRange] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false);
   const [cart, setCart] = useState([]);
// קטגוריה נבחרת
const [categoryValue, setCategoryValue] = useState("All Items");

// שיטת מיון
const [sortValue, setSortValue] = useState("Featured");

// טווח מחירים נבחר
const [rangeValue, setRangeValue] = useState([0, 1000]);



const { data: allProducts = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
  });
  
  const categoriesOption = [
    "All Items",
    ...new Set(allProducts.map((p) => p.category)),
  ];
    

useEffect(() => {
  if (allProducts.length > 0) {
    setProducts(allProducts);
  }
}, [allProducts]);
 

 const removeFromCart = (productId) => {
  setCart(prev => prev.filter(p => p._id !== productId));
};
 
const addToCart = (productId, amount) => {
  const detailProduct=allProducts.find(p=> p._id===productId);
  setCart(prev => {
  
    const existingProduct = prev.find(p => p._id === productId);

    if (existingProduct) {
      return prev.map(p =>
        p._id === productId ?  { ...p, amount } : p
      );
    }

  return [
      ...prev,
      {
        ...detailProduct,
        amount
      }
    ];
  });
    setIsCartOpen(true); 
};

   const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
     path: "/products/:productId",
    element:<SingleProductPage/>,
  },
  {
     path: "/admin",
    element:<AdminPage/>,
  }
]);
//console.log("filter&sort",filterAndSortedArray);
// פונקציית מחיקה
const deleteProduct = async (id) => {
  try {
    await deleteProductApi(id); // קריאה לשרת דרך הקובץ החיצוני
    setProducts((prev) => prev.filter((p) => p._id !== id));
    console.log("Deleted successfully");
  } catch (error) {
    console.error("Error deleting:", error);
  }
};

// פונקציית עדכון
const updateProduct = async (id, updatedData) => {
  try {
    const updatedProduct = await updateProductApi(id, updatedData); // מחזיר את המוצר המעודכן מהשרת
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? updatedProduct : p))
    );
  } catch (error) {
    console.error("Error updating:", error);
  }
};

// פונקציית הוספה
const addNewProduct = async (newProductData) => {
  try {
    const createdProduct = await addNewProductApi(newProductData); // מחזיר את המוצר החדש עם ה-ID מהשרת
    setProducts((prev) => [...prev, createdProduct]);
  } catch (error) {
    console.error("Error adding:", error);
  }
};


return ( <ShopContext.Provider
      value={{  products: products  
        ,addToCart,removeFromCart,cart,setCart,
        setminMax,minMax,/* range,setRange, */
        isCartOpen,setIsCartOpen,
        deleteProduct,updateProduct,addNewProduct,
        categoriesOption,
        setCategoryValue,categoryValue,setSortValue,sortValue,rangeValue,setRangeValue
      }}>
<RouterProvider router={router} /> 
</ShopContext.Provider>);
};