import React from 'react';
import Modal from 'react-modal';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

Modal.setAppElement('#root');

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

export function AlertDialog({message,onClose}) {
  return(
    <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Thông báo
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{minWidth:'400px'}}>
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
  )
}