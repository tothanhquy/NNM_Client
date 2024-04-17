import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import DiscountService from '../../../service/discount.service';

import * as GeneralMethod from '../../../common_method/general';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Create() {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let name = data.get('name');
    let code = data.get('code');
    let description = data.get('description');
    let discountPercent = data.get('discountPercent');
    let discountMoney = data.get('discountMoney');
    let productIds = data.get('productIds');
    let startTimeAsDate = data.get('startTime');
    let endTimeAsDate = data.get('endTime');

    let startTime = GeneralMethod.convertDateInputToTimestamp(startTimeAsDate);
    let endTime = GeneralMethod.convertDateInputToTimestamp(endTimeAsDate);

    if(!startTime||!endTime){
      setMessage({status: "warning", content:"Thời gian không đúng định dạng"});
      return;
    }

    if(endTime<startTime){
      setMessage({status: "warning", content:"Thời gian kết thúc phải lớn hơn thời gian bắt đầu"});
      return;
    }

    DiscountService.createDiscount(name,code, description,  discountPercent, discountMoney, startTime, endTime, productIds)
    .then(res=>{
      if(res.status === 'success'){
        let newId = res.data.id;
          window.location.href = '/admin/discount/edit/' + newId;
        // setMessage({status: "success", content:"res.message"});
      }else{
        setMessage({status: "warning", content:res.message});
      }
    })
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/admin/discount"}>Quay lại danh sách</Button>

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
            Tạo mới Discount
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Code discount"
              name="code"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tên discount"
              name="name"
              type="text"
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={5}
              name="description"
              label="Mô tả"
              placeholder="Mô tả"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="discountPercent"
              label="% giảm giá"
              type="number"
              min={0}
              max={100}
              defaultValue={0}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="discountMoney"
              label="tiền giảm giá"
              type="number"
              step='1'
              min={0}
              defaultValue={0}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={5}
              label="các sản phẩm (id) | id1;id2;id3"
              name="productIds"
              type="text"
            />
            <TextField
              margin="normal"
              required
              label="Thời gian bắt đầu"
              name="startTime"
              type="datetime"
              placeholder='dd-mm-yyyy'/>
            <TextField
              margin="normal"
              required
              label="Thời gian kết thúc"
              placeholder='dd-mm-yyyy'
              name="endTime"
              type="datetime"/>
            
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
              Tạo Discount
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}