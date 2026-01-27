
   /* import { colors, Drawer } from '@mui/material';
import { ShopContext } from "../ShopContext";
import { useContext, useEffect, useState } from "react";
export const CartComp = () => {

const{cart,isCartOpen, setIsCartOpen,addToCart,removeFromCart}=useContext(ShopContext);


  const [counter,setCounter]=useState(0); 
     const handlePlusOrMinus = (id, sign, amount) => {
    
  if (sign === "-" && amount === 0) return;

  const newValue = sign === "+" ? amount + 1 : amount - 1;
  setCounter(newValue);

  if (newValue > 0) {
    addToCart(id, newValue);
    setIsCartOpen(true);
  }  else {
    removeFromCart(id);
  }
};
 


  return (
<Drawer
        open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
    anchor="left"
    PaperProps={{
        sx:{
            width:800,
            background:colors.light_grey,
            borderRadius:0
        }
    }}
    className="productsCart "
    >
      <section  className="productsCart ">
            {cart.map((product) => (
             <div>
   
      <div className="productInfo">
        <h5>{product.title}</h5>
        <h6>{product.price}</h6>
        <button onClick={()=>handlePlusOrMinus(product._id,"+",product.amount) } >+</button>
        {product.amount}
       <button onClick={()=>handlePlusOrMinus(product._id,"-",product.amount) }  disabled={product.amount===0} >-</button>
         <div className="productImage">
        <img src={product.image} />
      </div>
      </div>
       
    </div>
            ))}
          </section>
   
</Drawer>
    
  );
}; 

  */
import { colors, Drawer, IconButton, Typography, Box, Button } from '@mui/material';
import { ShopContext } from "../ShopContext";
import { useContext, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const CartComp = () => {
  const { cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart } = useContext(ShopContext);
  const [counter, setCounter] = useState(0);

  const handlePlusOrMinus = (id, sign, amount) => {
    if (sign === "-" && amount === 0) return;
    const newValue = sign === "+" ? amount + 1 : amount - 1;

    if (newValue > 0) {
      addToCart(id, newValue);
      setCounter(newValue);
      setIsCartOpen(true);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <Drawer
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      anchor="left"
      PaperProps={{
        sx: {
          width: 400,
          background: colors.grey[100],
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }
      }}
    >
      {/* כותרת עם כפתור סגירה */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={() => setIsCartOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* רשימת המוצרים */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {cart.map((product) => (
          <Box 
            key={product._id} 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between" 
            mb={2} 
            p={1} 
            sx={{ background: 'white', borderRadius: 1, boxShadow: 1 }}
          >
            <Box display="flex" alignItems="center">
              <Box sx={{ width: 80, height: 80, mr: 2 }}>
                <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1">{product.title}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </Box>
            </Box>

            {/* כפתורי פלוס ומינוס */}
            <Box display="flex" alignItems="center">
              <Button size="small" variant="contained" onClick={() => handlePlusOrMinus(product._id, "-", product.amount)} disabled={product.amount === 0}>-</Button>
              <Typography mx={1}>{product.amount}</Typography>
              <Button size="small" variant="contained" onClick={() => handlePlusOrMinus(product._id, "+", product.amount)}>+</Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* סיכום */}
      <Box mt={2}>
        <Typography variant="h6">
          Total: ${cart.reduce((acc, item) => acc + item.price * item.amount, 0).toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
};
