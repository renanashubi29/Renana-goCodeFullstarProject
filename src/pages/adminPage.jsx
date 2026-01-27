import { useContext, useState } from "react";
import { ShopContext } from "../ShopContext";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const AdminPage = () => {
  const { products, deleteProduct, updateProduct, addNewProduct } = useContext(ShopContext);

  // ------------------- Edit -------------------
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editRate, setEditRate] = useState('');
  const [editCount, setEditCount] = useState('');

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setEditTitle(product.title);
    setEditPrice(product.price);
    setEditDescription(product.description);
    setEditCategory(product.category);
    setEditImage(product.image);
    setEditRate(product.rating?.rate || 0);
    setEditCount(product.rating?.count || 0);
    setIsEditOpen(true);
  };

  const handleSaveUpdate = async () => {
    if (!productToEdit) return;

    const updatedData = {
      title: editTitle,
      price: Number(editPrice),
      description: editDescription,
      category: editCategory,
      image: editImage,
      rating: { rate: Number(editRate), count: Number(editCount) }
    };

    await updateProduct(productToEdit._id, updatedData);
    setIsEditOpen(false);
  };

  // ------------------- Add -------------------
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newRate, setNewRate] = useState(0);
  const [newCount, setNewCount] = useState(0);

  const handleAddClick = () => {
    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
    setNewCategory('');
    setNewImage('');
    setNewRate(0);
    setNewCount(0);
    setIsAddOpen(true);
  };

  const handleSaveNewProduct = async () => {
    const newProductData = {
      title: newTitle,
      price: Number(newPrice),
      description: newDescription,
      category: newCategory,
      image: newImage,
      rating: { rate: Number(newRate), count: Number(newCount) }
    };
    await addNewProduct(newProductData);
    setIsAddOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={handleAddClick}>
        הוסף מוצר
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>תמונה</TableCell>
              <TableCell>שם</TableCell>
              <TableCell>מחיר</TableCell>
              <TableCell>תיאור</TableCell>
              <TableCell>קטגוריה</TableCell>
              <TableCell>דירוג</TableCell>
              <TableCell>מספר דירוגים</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img src={product.image} alt={product.title} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.rating?.rate}</TableCell>
                <TableCell>{product.rating?.count}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(product)}><EditIcon /></IconButton>
                  <IconButton onClick={() => deleteProduct(product._id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <DialogTitle>עריכת {productToEdit?.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="שם מוצר" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            <TextField label="מחיר" type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
            <TextField label="תיאור" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
            <TextField label="קטגוריה" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
            <TextField label="תמונה (URL)" value={editImage} onChange={(e) => setEditImage(e.target.value)} />
            <TextField label="דירוג" type="number" value={editRate} onChange={(e) => setEditRate(e.target.value)} />
            <TextField label="מספר דירוגים" type="number" value={editCount} onChange={(e) => setEditCount(e.target.value)} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveUpdate} variant="contained">שמור שינויים</Button>
        </DialogActions>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <DialogTitle>הוספת מוצר חדש</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="שם מוצר" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <TextField label="מחיר" type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            <TextField label="תיאור" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <TextField label="קטגוריה" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            <TextField label="תמונה (URL)" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
            <TextField label="דירוג" type="number" value={newRate} onChange={(e) => setNewRate(e.target.value)} />
            <TextField label="מספר דירוגים" type="number" value={newCount} onChange={(e) => setNewCount(e.target.value)} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveNewProduct} variant="contained">שמור מוצר חדש</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
