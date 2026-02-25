import React, { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "../ShopContext";
import { Slider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const SliderComp = () => {
  const { 
    setRangeValue, 
    rangeValue, 
    products,
    categoryValue,
    setminMax,minMax
  } = useContext(ShopContext);

 const { data: allProducts = [] } = useQuery({ queryKey: ["all-products"] });

  const limits = useMemo(() => {
    // פילטור של כל המוצרים רק לפי הקטגוריה הנבחרת
    const filteredByCategory = categoryValue === "All Items" 
      ? allProducts 
      : allProducts.filter(p => p.category === categoryValue);

    if (filteredByCategory.length === 0) return { min: 0, max: 1000 };

    const prices = filteredByCategory.map((p) => Number(p.price));
   
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [allProducts, categoryValue]);
  useEffect(() => {
    setRangeValue([limits.min, limits.max]);  
  
  }, [limits.min, limits.max, setRangeValue]);
 
  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const valuetext = (value) => `${value}₪`;

  return (
    <div>
     
      
      <Slider
        getAriaLabel={() => 'Price range'}
        min={limits.min}
        max={limits.max}
        value={rangeValue || [0, 1000]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ width: 150 }}
        getAriaValueText={valuetext}
      />
    </div>
  );
};