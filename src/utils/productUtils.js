export const filterSortProducts = (
  products,
  { categoryValue, rangeValue, sortValue ,setminMax,
  setRangeValue}
) => {
   
  console.log("categoryValue",categoryValue);
  if (!products || products.length === 0) return [];

  let result = [...products];

  // 1. סינון לפי קטגוריה
  if (categoryValue && categoryValue !== "All Items") {
    result = result.filter(p => p.category === categoryValue);
  }

  // 2. סינון לפי טווח מחירים
  if (rangeValue && rangeValue.length === 2) {
    const [min, max] = rangeValue;
    result = result.filter(
      p =>
        Number(p.price) >= Number(min) &&
        Number(p.price) <= Number(max)
    );
  }

  // 3. מיון
  switch (sortValue) {
    case "Alphabetically, A-Z":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "Alphabetically, Z-A":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;

    case "Price, low to high":
      result.sort((a, b) => a.price - b.price);
      break;

    case "Price, high to low":
      result.sort((a, b) => b.price - a.price);
      break;

    default:
      break;
  }

  return result;
};
