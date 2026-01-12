import { useContext, useRef, useState } from "react";
import { ShopContext } from "../ShopContext";
import { useNavigate } from "react-router";

export const ProductCard = (props) => {
  const navigate=useNavigate();
  const { addToCart ,removeFromCart} = useContext(ShopContext);
  const [counter,setCounter]=useState(0);
 
 const handlePlusOrMinus = (sign) => {
  if (sign === "-" && counter === 0) return;
removeFromCart
  const newValue = sign === "+" ? counter + 1 : counter - 1;

  setCounter(newValue);

  if (newValue > 0) {
    addToCart(props.id, newValue);
  } else {
    (props.id);
  }
};
  const handleNavigateToProductPage=()=>{

    navigate(`/products/${props.id}`);
  }
  return (
    <div className="product-card">
      <div className="product-image" onClick={handleNavigateToProductPage}>
        <img src={props.img} />
      </div>
      <div className="product-info">
        <h5>{props.itemName}</h5>
        <h6>{props.price}</h6>
        <button onClick={()=>handlePlusOrMinus("+") } >+</button>
        {counter}
       <button onClick={()=>handlePlusOrMinus("-") }  disabled={counter===0}>-</button>
      </div>
    </div>
  );
};
