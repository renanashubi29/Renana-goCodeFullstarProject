import { useContext, useState } from "react";
import { ShopContext } from "../ShopContext";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Paper, Typography, TableContainer, Table } from '@mui/material';
import { AdminTableHead } from "../components/AdminPageComp/AdminTableHead";
import { ProductsTable } from "../components/AdminPageComp/ProductsTable";
import { ProductDialog } from "../components/AdminPageComp/ProductDialog";
export const AdminPage = () => {
  const { products, deleteProduct, updateProduct, addNewProduct } = useContext(ShopContext);

  // --- סטייטים נפרדים לגמרי ---
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  const [editFormData, setEditFormData] = useState({});
  const [newFormData, setNewFormData] = useState({
    title: '', price: '', description: '', category: '', image: '', rate: 0, count: 0
  });

  // --- פונקציות עדכון הסטייט בזמן הקלדה ---

  // כשמקלידים במודל עריכה
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // כשמקלידים במודל הוספה
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewFormData({ ...newFormData, [name]: value });
  };

  //  פונקציות שמירה
  const saveUpdate = async () => {
    const id = editFormData._id;
    const dataForServer = {
      title: editFormData.title,
      price: Number(editFormData.price),
      description: editFormData.description,
      category: editFormData.category,
      image: editFormData.image,
      rating: { rate: Number(editFormData.rate), count: Number(editFormData.count) }
    };

    await updateProduct(id, dataForServer);
    setIsEditOpen(false); // סגירת המודל
  };

  const saveNew = async () => {
    const dataForServer = {
      title: newFormData.title,
      price: Number(newFormData.price),
      description: newFormData.description,
      category: newFormData.category,
      image: newFormData.image,
      rating: { rate: Number(newFormData.rate), count: Number(newFormData.count) }
    };

    await addNewProduct(dataForServer);
    setIsAddOpen(false); // סגירת המודל
    // איפוס הטופס
    setNewFormData({ title: '', price: '', description: '', category: '', image: '', rate: 0, count: 0 });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>ניהול מוצרים</Typography>

      <Button variant="contained" onClick={() => setIsAddOpen(true)}>הוסף מוצר חדש</Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <AdminTableHead />
          <ProductsTable 
            products={products} 
            onEdit={(p) => {
              setEditFormData({ ...p, rate: p.rating?.rate, count: p.rating?.count });
              setIsEditOpen(true);
            }} 
            onDelete={deleteProduct} 
          />
        </Table>
      </TableContainer>

      {/* מודל הוספה */}
<ProductDialog 
  open={isAddOpen} 
  onClose={() => setIsAddOpen(false)} 
  title="הוספת מוצר חדש" 
  formData={newFormData} 
  onChange={handleAddChange} 
  onSave={saveNew} 
  submitLabel="הוסף מוצר" 
/>

{/* מודל עריכה */}
<ProductDialog 
  open={isEditOpen} 
  onClose={() => setIsEditOpen(false)} 
  title="עריכת מוצר" 
  formData={editFormData} 
  onChange={handleEditChange} 
  onSave={saveUpdate} 
  submitLabel="שמור שינויים" 
/>
</Box>
  );
};