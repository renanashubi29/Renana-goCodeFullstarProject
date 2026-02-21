import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Box 
} from '@mui/material';

export const ProductDialog = ({ open, onClose, title, formData, onChange, onSave, submitLabel }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField name="title" label="שם מוצר" value={formData.title || ''} onChange={onChange} fullWidth />
          <TextField name="price" label="מחיר" type="number" value={formData.price || ''} onChange={onChange} fullWidth />
          <TextField name="category" label="קטגוריה" value={formData.category || ''} onChange={onChange} fullWidth />
          <TextField name="description" label="תיאור מוצר" multiline rows={3} value={formData.description || ''} onChange={onChange} fullWidth />
          <TextField name="image" label="כתובת תמונה (URL)" value={formData.image || ''} onChange={onChange} fullWidth />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField name="rate" label="דירוג (0-5)" type="number" value={formData.rate || 0} onChange={onChange} fullWidth />
            <TextField name="count" label="כמות מדרגים" type="number" value={formData.count || 0} onChange={onChange} fullWidth />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};