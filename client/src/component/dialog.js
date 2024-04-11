import React from 'react';
import Modal from 'react-modal';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

Modal.setAppElement('#root');

export function DeleteProductDialog({ productName, onDelete, onClose }){
  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <h2>Xác nhận xóa sản phẩm</h2>
      <p>Bạn có chắc chắn muốn xóa sản phẩm "{productName}"?</p>
      <button onClick={onDelete}>Xác nhận</button>
      <button onClick={onClose}>Hủy</button>
    </Modal>
  );
};
export function AskDialog({ open,title,content, onHandle, onClose }){
  return (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{minWidth:'300px'}} id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={onHandle} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
  );
};

