
//http://localhost:3000/api/products
  //https://renana-gocodefullstarproject.onrender.com/api/products

export const handleProducts = async () => {
  // הגדרת הכתובת ישירות או דרך המשתנה (לוודא שהשם תואם ל-ENV)
  const url = `${import.meta.env.VITE_API_URL}/products`;
  console.log("Fetching from:", url);

  const response = await fetch(url); // ברירת המחדל היא GET

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data; 
};