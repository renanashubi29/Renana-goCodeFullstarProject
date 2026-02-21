import { TableHead, TableRow, TableCell } from '@mui/material';

export const AdminTableHead = () => {
  return (
    <TableHead>
      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
        <TableCell sx={{ fontWeight: 'bold' }}>תמונה</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>שם</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>מחיר</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>קטגוריה</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
      </TableRow>
    </TableHead>
  );
};