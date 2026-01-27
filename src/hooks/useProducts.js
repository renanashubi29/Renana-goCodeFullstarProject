import { useQuery } from "@tanstack/react-query";
import { ShopContext } from "../ShopContext";
import { useContext } from "react";
import { filterSortProducts } from "../utils/productUtils.js";
import { handleProducts } from "../api/productsApi.js";
export const useProducts = () => {
  const {categoryValue, rangeValue, sortValue} = useContext(ShopContext);

  return useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
    select: (data) =>
      filterSortProducts(data, {
       categoryValue, rangeValue, sortValue
     
      }),
    staleTime: 1000 * 60 * 5,
  });
};