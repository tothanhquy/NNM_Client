import * as React from 'react';
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

export default function Create() {
  const [message, setMessage] = React.useState("");

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

    let res = await ProductService.createProduct(name,description,image,sizes);
    if(res.status === 'success'){
      let newId = res.data.productId;
        window.location.href = '/admin/product/edit/' + newId;
      // setMessage({status: "success", content:"res.message"});
    }else{
      setMessage({status: "warning", content:res.message});
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xm">
      <Button size="small" variant="outline" href={"/admin/product"}>Quay lại danh sách</Button>

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
            Tạo mới sản phẩm
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tên sản phẩm"
              name="name"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="sizes"
              label="size1:price1;size2:price2"
              type="text"
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
            />
            {
              message &&
              <Alert severity={message.status}>{message.content}</Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Tạo sản phẩm
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}