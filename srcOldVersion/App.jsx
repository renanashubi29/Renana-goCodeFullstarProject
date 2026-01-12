import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ProductCard } from './components/ProductCard';
import { ProductsSection } from './components/ProductsSection';
import { FilterSortComp } from './components/FilterSortComp';
import { SortSection } from './components/SortSection';
import { NavSection } from './components/NavSection';
import { ShopContext } from './components/ShopContext';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      setProducts(data);
    };

    handleProducts();
  }, []);

  // const inputRef = useRef(null);

  // const handleClick = () => {
  //   inputRef.current.focus();
  //   inputRef.current.style.background = "red";
  //   inputRef.current.style.width = "200px";
  //   inputRef.current.style.height = "100px";
  // };
  return (
    <ShopContext.Provider value={{ products }}>
      <>
        {/* <button onClick={handleClick}>click me for focusing the input</button>
      <input ref={inputRef} />
      */}
        {/* <OTPInput /> */}
        <NavSection />
        <ProductsSection />
      </>
    </ShopContext.Provider>
  );
}
export default App;
