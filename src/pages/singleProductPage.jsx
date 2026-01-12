import { useContext, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { ShopContext } from "../ShopContext";
import { Box, Button, Card, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";




export const SingleProductPage=()=>{
      const navigate=useNavigate();
    const[open,openchange]=useState(true);
    const {productId}=useParams();
const {products}=useContext(ShopContext);
const product = products?.find(
  p => p.id === Number(productId)
);
console.log("product",product);

const fieldValueArr = product ? Object.entries(product) : [];
console.log(fieldValueArr);
const closepopup=()=>{
openchange(false);
}


const handleNavHome=()=>{

   navigate(`/`);
  }
/* return(
<>
<Link to="/">HomePage</Link>
{
    fieldValueArr.map((item)=>
    {
        if(typeof(item[1])==='object')
            return(<></>)
        return (<div>
            <p>{item[0]}{":  "}{item[1]}</p>
        </div>)
    }

    )
}

</> 
); */


return (
  <Dialog open={open} onClose={closepopup}>
    <DialogTitle>{product.title}</DialogTitle>
    <DialogContent>
     <Card sx={{ display: "flex", p: 3 }}>
        
      {/*  image */}
         <CardMedia
          component="img"
           image={product.image}
          alt={product.name}
           sx={{ width: "40%", borderRadius: 2 }}
        />

       {/* content */}
         <CardContent sx={{ flex: 1, ml: 4 }}>
           <Typography variant="h4" gutterBottom>
             {product.name}
           </Typography>

           <Typography variant="h6" color="text.secondary">
            ₪ {product.price}
        </Typography>

           <Typography sx={{ mt: 2 }}>
             {product.description}
           </Typography>

           <Box sx={{ mt: 4 }}>
            <Button variant="contained" size="large">
             הוספה לעגלה
            </Button>
          </Box>
        </CardContent>

      </Card>
    </DialogContent>
    <DialogActions>
      <Button color="error" variant="contained" onClick={handleNavHome}>Close</Button>
    </DialogActions>
  </Dialog>
);


}