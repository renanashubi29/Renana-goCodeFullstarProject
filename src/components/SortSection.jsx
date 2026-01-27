import { useContext, useRef } from "react";
import { ShopContext } from "../ShopContext";
import { FilterSortComp } from "./FilterSortComp";

export const SortSection = () => {
  const { categories, handleCatChange,handleSortChange,setCategoryValue,setSortValue,categoriesOption } = useContext(ShopContext);
  

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

  return (
    <div className="sort">
      <FilterSortComp

        onSelect={setCategoryValue}
        label={"Filter by:"}
        listOfOptions={categoriesOption}
      />
      <FilterSortComp
        onSelect={setSortValue }
        label={"Sort by:"}
        listOfOptions={sortOptions}
      />
    </div>
  );
};
