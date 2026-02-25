
//http://localhost:3000/api/products
  //https://renana-gocodefullstarproject.onrender.com/api/products
const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;
export const handleProducts = async () => {
  // הגדרת הכתובת ישירות או דרך המשתנה (לוודא שהשם תואם ל-ENV)
  const url = `${import.meta.env.VITE_API_URL}/products`;


  const response = await fetch(BASE_URL); // ברירת המחדל היא GET

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data; 
};
export const deleteProductApi = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete");
  return true;
};

export const updateProductApi = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const addNewProductApi = async (newProductData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProductData)
  });
  return response.json();
};