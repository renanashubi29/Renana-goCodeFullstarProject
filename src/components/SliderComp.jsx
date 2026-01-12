import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { Slider } from "@mui/material";

  
export const SliderComp=()=>{
    const {minMax,setRange,range} = useContext(ShopContext);
   function valuetext(value) {
  return `${value}°C`;
}
    return(<Slider className=""
  getAriaLabel={() => 'Temperature range'}
  min={minMax[0]}
  max={minMax[1]}
   value={range} 
  onChange={(event) => setRange(event.target.value)}
   
  valueLabelDisplay="auto"
   sx={{ width: 150 }}
  getAriaValueText={valuetext}
/> );
}