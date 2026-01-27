import { useContext, useEffect, useState } from "react";
import { SortSection } from "./SortSection";
import { SliderComp } from "./SliderComp.jsx";
import { CartComp } from "./CartComp.jsx";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShopContext } from "../ShopContext.js";

export const NavSection = () => {
  const{ setIsCartOpen,cart}=useContext(ShopContext);  
 const[ItemsInCart,SetItemsInCart]=useState(cart.length);
useEffect(()=>{
SetItemsInCart(cart.length);
},[cart]);

  return (
    <nav className="product-filter">
      <button onClick={()=>{setIsCartOpen(true);}}>
      <ShoppingCartIcon />
      {ItemsInCart}
    </button>
      <h1>Jackets</h1>
     
        <SliderComp />   
      <SortSection />
    
            <CartComp/> 
    </nav>
  );
};
