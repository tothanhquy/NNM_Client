import * as React from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DiscountService from '../../../service/discount.service';

import * as GeneralMethod from '../../../common_method/general';
import * as CustomDialog from '../../component/dialog';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Import() {
  const [message, setMessage] = React.useState("");
  const [dialog, setDialog] = React.useState({open:false,message:""});
  const [waiting, setWaiting] = React.useState(false);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    alert("start");

    if(!waiting){
      setWaiting(true);
      const data = new FormData(event.currentTarget);

      let file = data.get('file');
  
      DiscountService.importManyDiscount(file)
      .then(res=>{
        setWaiting(false);
        if(res.status === 'success'){
          setDialog({open: true, message:"Import Discounts thành công"});
        }else{
          setDialog({open: true, message:res.message});
        }
      })
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/admin/discount"}>Quay lại danh sách</Button>

        <Dialog
            open={dialog.open}
            onClose={()=>{setDialog({open:false,message:""})}}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Thông báo
            </DialogTitle>
            <DialogContent>
            <DialogContentText style={{minWidth:'400px'}}>
                {dialog.message}
            </DialogContentText>
            </DialogContent>
        </Dialog>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Import Excel Discounts
          </Typography>
          <Box component="form" onSubmit={handleSubmitEdit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Excel"
              name="file"
              type="file"
              autoFocus
            />
            {
              message &&
              <Alert severity={message.status}>{message.content}</Alert>
            }
            <Box style={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>              
              {
                !waiting?
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Start Import</Button>
                :
                <Button disabled type="button" variant="contained" sx={{ mt: 3, mb: 2 }}>Waiting...</Button>
              }
              
            </Box>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}