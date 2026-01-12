import { useContext, useState } from "react";
import { SortSection } from "./SortSection";
import { Slider } from "@mui/material";
import { ShopContext } from "../ShopContext";
import { SliderComp } from "./SliderComp";

export const NavSection = () => {
  
 
 

  return (
    <nav className="product-filter">
      <h1>Jackets</h1>
     
      <SliderComp/>

      <SortSection />
    </nav>
  );
};
