import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import { SingleProductPage } from "./pages/singleProductPage";
import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";

export const Router=()=>{
    const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
 const [sortedProducts, setSortedProducts] = useState([]);
 const [filterAndSortedArray, setFilterAndSortedArray] = useState([]);
 const [minMax, setminMax] = useState([]);
const [range, setRange] = useState([]); 
const [rangeArr, setRangeArr] = useState([]); 
     

console.log(minMax);

  useEffect(() => {
    const handleProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

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
    console.log("show:",filteredProducts);
const numbers = filteredProducts.map((item)=>{return Number(item.price)});
setminMax([
  Math.min(...numbers),
  Math.max(...numbers)
]);
setRange([
  Math.min(...numbers),
  Math.max(...numbers)
]);

   }, [filteredProducts]);

 useEffect(() => {
const min=range[0];
const max=range[1];
const arr= [...products].filter((item)=>{return Number(item.price)>=Number(min)&&Number(item.price)<=Number(max)});
//console.log("arr:",arr);
  setRangeArr(arr);
   }, [range]);
   
 const [cart, setCart] = useState(new Map());   
 const removeFromCart = (productId) => {
  setCart(prev => {
    const newCart = new Map(prev);
    newCart.delete(productId);
    return newCart;
  });
};
const addToCart=(productId,amount)=>
{
   console.log("productId:",productId);
   console.log("amount:",amount);
    setCart(prev=>{return prev.set(productId, amount)});
    console.log(cart);

};
   const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
     path: "/products/:productId",
    element:<SingleProductPage/>,
  }
]);
return ( <ShopContext.Provider
      value={{ products: filterAndSortedArray, categories, handleCatChange, handleSortChange,addToCart,removeFromCart,setminMax,minMax,range,setRange}}>
<RouterProvider router={router} /> 
</ShopContext.Provider>);
};