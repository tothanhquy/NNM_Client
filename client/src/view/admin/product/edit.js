import * as React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import ProductService from '../../../service/product.service';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
function containsOnlyDigits(inputString) {
    if(inputString.length===0)return 0;
    for (let i = 0; i < inputString.length; i++) {
      if (isNaN(inputString[i])) {
        return false;
      }
    }
    return true;
  }

const isValidSizes =function(sizesStr) {
    let sizes = sizesStr.split(';');
    for(let i = 0; i < sizes.length; i++){
        let size = sizes[i].split(':');
        if(size.length!== 2){
            return false;
        }
        if(!containsOnlyDigits(size[1])){
            return false;
        }
    }
    return true;
}

let productId;
export default function Edit() {
  const [message, setMessage] = React.useState("");
  const [dialog, setDialog] = React.useState({open:false,message:""});

  const [name, setName] = React.useState("");
  const [sizes, setSizes] = React.useState("");
  const [description, setDescription] = React.useState("");
  const imageRef = React.useRef(null);

  const { id } = useParams();
  const productId = id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let name = data.get('name');
    let sizes = data.get('sizes');
    let description = data.get('description');
    let image = data.get('image');

    if(!isValidSizes(sizes)){
        setMessage({status: "warning", content:"Sizes không hợp lệ"});
        return;
    }

    let res = await ProductService.updateProduct(productId,name,description,image,sizes);
    if(res.status === 'success'){
      setMessage({status: "success", content:"Cập nhật sản phẩm thành công"});
    }else{
      setMessage({status: "warning", content:res.message});
    }
  };

  const setProduct = function(product){
    setName(product.name);
    setSizes(product.sizes);
    setDescription(product.description);
    imageRef.current.src=product.image;
    imageRef.current.alt=product.image;
  }

  React.useEffect(()=>{
    

    ProductService.getProduct(productId).then((res) => {
        if(res.status === 'success'){
          //convert
          console.log(res.data);
          setProduct(res.data);
        }else{
          setDialog({open: true, message:res.message});
        }
    });

  },[]);

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/admin/product"}>Quay lại danh sách</Button>

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
            Sửa sản phẩm
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tên sản phẩm"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="sizes"
              label="size1:price1;size2:price2"
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
            />
            <img
                //   src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
                //   alt={imageUrl}
                  src={``}
                  alt={'alt'}
                  loading="lazy"
                  ref={imageRef}
                  style={{maxHeight:'200px'}}
                />
            <TextField
              margin="normal"
              fullWidth
              name="image"
              label="Ảnh sản phẩm"
              type="file"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={5}
              name="description"
              label="Mô tả sản phẩm"
              placeholder="Mô tả sản phẩm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <Box style={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>
              <Button size="small" variant="outline" href={"/admin/product"}>Quay lại danh sách</Button>
              {
                message &&
                <Alert severity={message.status}>{message.content}</Alert>
              }
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sửa sản phẩm
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}