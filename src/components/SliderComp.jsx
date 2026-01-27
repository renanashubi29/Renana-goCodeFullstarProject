import React, { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "../ShopContext";
import {Slider }from "@mui/material";
import { useQuery } from "@tanstack/react-query";
 
export const SliderComp=()=>{
  const {minMax,setRange,range,setRangeValue,rangeValue,setminMax} = useContext(ShopContext);
    const { data: allProducts = [] } = useQuery({ queryKey: ["all-products"] });
   function valuetext(value) {
  return `${value}°C`;
}
// מחשב את הגבולות מינימום ומקסימום מהנתונים
  const { minLimit, maxLimit } = useMemo(() => {
    if (allProducts.length === 0) return { minLimit: 0, maxLimit: 1000 };

    const prices = allProducts.map((p) => Number(p.price));
    return {
      minLimit: Math.floor(Math.min(...prices)),
      maxLimit: Math.ceil(Math.max(...prices)),
    };
  }, [allProducts]);

  // מגדיר את טווח המחירים הראשוני רק כשהנתונים נטענים
  useEffect(() => {
    if (allProducts.length > 0) {
      setminMax([minLimit, maxLimit]);
      setRangeValue([minLimit, maxLimit]);
    }
  }, [allProducts.length, minLimit, maxLimit, setminMax, setRangeValue]);

const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };
 
    return(
    <Slider className=""
  getAriaLabel={() => 'Temperature range'}
  min={minMax[0]}
  max={minMax[1]}
  //value={range} 
  value={rangeValue}
 onChange={handleChange}
   
   
  valueLabelDisplay="auto"
   sx={{ width: 150 }}
  getAriaValueText={valuetext}
/> 
);}