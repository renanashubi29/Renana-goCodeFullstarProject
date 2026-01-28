import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import { SingleProductPage } from "./pages/singleProductPage.jsx";
import { useEffect, useMemo, useState } from "react";
import { ShopContext } from "./ShopContext";
import { AdminPage } from "./pages/adminPage.jsx";
import { useQuery } from "@tanstack/react-query";
import { handleProducts } from "./api/productsApi.js";
import { filterSortProducts } from "./utils/productUtils.js";


export const Router=()=>{
   // const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
 const [sortedProducts, setSortedProducts] = useState([]);
 const [filterAndSortedArray, setFilterAndSortedArray] = useState([]);
 const [minMax, setminMax] = useState([]);
const [range, setRange] = useState([]); 
const [rangeArr, setRangeArr] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    

/* useEffect(() => {
  if (!allProducts) return;
    const sorted = filterSortProducts(products, {
    categoryValue,
    rangeValue,
    sortValue
  });


 // חישוב minMax ו-rangeValue חדשים
  const numbers = sorted.map(p => Number(p.price));
  const newMinMax = [Math.min(...numbers), Math.max(...numbers)];
console.log("nnn",newMinMax);
  // עדכון רק אם השתנה
  setminMax(newMinMax);
  setRangeValue(newMinMax);

}, [allProducts, categoryValue, sortValue]); */

/* console.log(minMax);

  useEffect(() => {
    const handleProducts = async () => {
      const response = await fetch("http://localhost:3000/products", {
  method: "GET"});
      const data = await response.json();
console.log("Data:",data);
      setProducts(data);
      setFilteredProducts(data);
      setSortedProducts(data);
      setFilterAndSortedArray(data);
      setRangeArr(data);
      const pricesArr=data.map((item)=>{return item.price;});
      setminMax([Math.min(...pricesArr), Math.max(...pricesArr)]);
       setRange([Math.min(...pricesArr), Math.max(...pricesArr)]);


    };

    handleProducts();
  }, []);

 

  useEffect(() => {
    const cat = products
      ?.map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);

    if (cat && cat.length > 0) {
      cat.unshift("All Items");
      setCategories(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleCatChange = (category) => {
    console.log(category);
    if (category === "All Items") {
      setFilteredProducts(products);

    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
      
    }
    
  };

  const handleSortChange = (sortName) => {
      let sortedArray=[];
    switch(sortName){

    case "Featured":
      setSortedProducts(products);
      break;
    case "Alphabetically, A-Z":{
      
    sortedArray= [...products].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
     setSortedProducts(sortedArray);
     break;
     }
     case "Alphabetically, Z-A":{
      
    sortedArray= [...products].sort((a,b) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0));
     setSortedProducts(sortedArray);
     break;
     }
      case "Price, low to high":{
     sortedArray= [...products].sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
     setSortedProducts(sortedArray);
     break;
      }
     case "Price, high to low":{
     sortedArray= [...products].sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0));
     setSortedProducts(sortedArray);
     break;
     }
     
    }
  };
  useEffect(() => {
   setFilterAndSortedArray((sortedProducts.filter(item =>filteredProducts.includes(item))).filter(ele =>rangeArr.includes(ele)));

   }, [filteredProducts,sortedProducts,rangeArr]);



 useEffect(() => {
const min=range[0];
const max=range[1];
const arr= [...products].filter((item)=>{return Number(item.price)>=Number(min)&&Number(item.price)<=Number(max)});
//console.log("arr:",arr);
  setRangeArr(arr);
   }, [range]);
    */
 const [cart, setCart] = useState([]);  
 

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
console.log("filter&sort",filterAndSortedArray);

const deleteProduct = async (id) => {
  console.log("delete id:", id);

  await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });

  setFilterAndSortedArray((prev) => prev.filter((p) => p._id !== id));
};
const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setFilterAndSortedArray((prev) =>
          prev.map((p) => (p._id === id ? updatedProduct : p))
        );
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const addNewProduct = async (newProductData) => {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProductData)
    });

    if (response.ok) {
      const createdProduct = await response.json();
       setFilterAndSortedArray(prev => [...prev, createdProduct]); 
      
      //setIsAddOpen(false);
    }
  } catch (error) {
    console.error(error);
  }
};

return ( <ShopContext.Provider
      value={{  products: allProducts  , categories/* , handleCatChange, handleSortChange */,addToCart,removeFromCart,cart,setCart,setminMax,minMax,range,setRange,cart,isCartOpen,setIsCartOpen,deleteProduct,updateProduct,addNewProduct
        ,setCategoryValue,setSortValue,rangeValue,categoryValue,sortValue,categoriesOption,setRangeValue
      }}>
<RouterProvider router={router} /> 
</ShopContext.Provider>);
};