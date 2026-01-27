import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../ShopContext";
import { useNavigate } from "react-router";

export const ProductCard = (props) => {
  const navigate=useNavigate();
  const { addToCart ,removeFromCart,cart,setCart} = useContext(ShopContext);
  const [counter,setCounter]=useState(0); 
     const handlePlusOrMinus = (id, sign, counter) => {
  if (sign === "-" && counter === 0) return;

  const newValue = sign === "+" ? counter + 1 : counter - 1;
  setCounter(newValue);

  if (newValue > 0) {
    addToCart(id, newValue);
  } else {
   removeFromCart(id);
  }
};
 
useEffect(() => {

  const cartItem = cart.find(item => item._id === props.id);
  
  if (cartItem) {
    setCounter(cartItem.amount);
  }
  else
    setCounter(0);
}, [cart, props.id]);

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
        <button onClick={()=>handlePlusOrMinus(props.id,"+",counter) } >+</button>
        {counter}
       <button onClick={()=>handlePlusOrMinus(props.id,"-",counter) }  disabled={counter===0} >-</button>
      </div>
    </div>
  );
};
