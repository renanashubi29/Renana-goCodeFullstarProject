import { useContext } from "react";
import { useContext, useEffect, useState } from "react";
import { FilterSortComp } from "./FilterSortComp";

 
    
 

const filterOptions = [
  "All Jackets",
  "2016",
  "jacket",
  "Jackets",
  "layers",
  "Obermeyer",
  "Roxy",
  "womens",
];

const sortOptions = [
  "Featured",
  "Best Selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, new to old",
  "Date, old to new",
];
export const SortSection = () => {
 //const { products } = useContext(ShopContext);
 //console.log(products);
 //const s = new Set();
 //products.array.forEach(element => {s.add(element.category)});
  return (
    
    <div className="sort">
      <FilterSortComp label={"Filter by:"} listOfOptions={filterOptions} />
      <FilterSortComp label={"Sort by:"} listOfOptions={sortOptions} />
    </div>
  );
};