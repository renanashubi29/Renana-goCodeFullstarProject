import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { ShopContext } from "../ShopContext.js";
import { useProducts } from "../hooks/useProducts.js";
export const ProductsSection = () => {
  //const { products } = useContext(ShopContext);
   const { data: products, isLoading, isError } = useProducts();
   console.log("🛒 products in component:", products);

   if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;
    console.log("⏳ isLoading:", isLoading);
  console.log("❌ isError:", isError);

  return (
    <section className="products">
      {products.map((product) => (
        <ProductCard
          itemName={product.title}
          price={product.price}
          img={product.image}
          id={product._id}
        />
      ))}
    </section>
  );
};
