import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductsTable = ({ products, onEdit, onDelete }) => {

  return (
    <TableBody>
      {products.map((product) => {
        // בדיקת הגנה: אם בטעות יש אובייקט ריק במערך, לא נרנדר אותו
        if (!product || !product._id) return null;

        return (
          <TableRow key={product._id} hover>
            <TableCell>
              <img 
                src={product.image} 
                alt="" 
                style={{ width: 50, height: 50, objectFit: 'contain' }} 
              />
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.price}₪</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(product)} color="primary">
                <EditIcon/>
              </IconButton>
              <IconButton onClick={() => onDelete(product._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
 
  );
};