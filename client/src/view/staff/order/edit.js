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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

import OrderService from '../../../service/order.service';
import * as GeneralMethod from '../../../common_method/general';

import * as CustomDialog from '../../component/dialog';
import CollapsibleTableDeleteAble from '../../component/CollapsibleTableProductsDeleteAble';
import CollapsibleTableProductsSearch from '../../component/CollapsibleTableProductsSearch';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Create() {
  const [message, setMessage] = React.useState(null);
  const [alertDialog, setAlertDialog] = React.useState("");
  const [openConvertDialog, setOpenConvertDialog] = React.useState(false);

  const [orderDetailsUser,setOrderDetailsUser ] = React.useState(null);
  const [orderDetailsTime,setOrderDetailsTime ] = React.useState(null);
  const [orderDetailsSdt,setOrderDetailsSdt ] = React.useState(null);
  const [orderDetailsTableNumber,setOrderDetailsTableNumber ] = React.useState(null);
  const [orderDetailsNote,setOrderDetailsNote ] = React.useState(null);
  const [orderDetailsDiscountCode,setOrderDetailsDiscountCode ] = React.useState(null);
  const [orderDetailsIsTakeAway,setOrderDetailsIsTakeAway ] = React.useState(false);
  const [orderDetailsDiscountPayment,setOrderDetailsDiscountPayment ] = React.useState(null);
  const [orderDetailsStatus,setOrderDetailsStatus ] = React.useState("canceled");
  const [orderDetailsProducts,setOrderDetailsProducts ] = React.useState([]);

  const [editAble,setEditAble] = React.useState(true);
  
  const addProductHandle = function(productId,name,size,price,number){
    let newProduct = {productId:productId,name:name,size:size,price:price,number:number};
    let ind = orderDetailsProducts.findIndex(e=>e.productId === productId&&e.size === size);
    if(ind >= 0){
      let newProducts = orderDetailsProducts.slice();
      newProducts[ind].number += number;
      setOrderDetailsProducts(newProducts);
    }else{
      setOrderDetailsProducts([...orderDetailsProducts,newProduct]);
    }
  }

  const removeProductHandle = function(productId){
    setOrderDetailsProducts(orderDetailsProducts.filter(a=>a.productId !== productId));
  }


  const { id } = useParams();

  const handleEditOrder = async (event) => {
    event.preventDefault();

    if(!editAble){
      setAlertDialog("Không thể sửa đơn này.");
      return;
    }

    if(orderDetailsProducts.length===0){
      setAlertDialog("Vui lòng chọn sản phẩm");
      return;
    }

    const data = new FormData(event.currentTarget);
    
    let sdt = data.get('sdt');
    let note = data.get('note');
    let isTakeAway = data.get('isTakeAway');
    let numberTable = data.get('numberTable');
    let discountCode = data.get('discountCode');

    let products = [];
    orderDetailsProducts.forEach(product => {
      products.push(`${product.productId}:${product.size}:${product.number}`);
    });
    products=products.join(';');

    let res = await OrderService.updateOrder(id, sdt, note, isTakeAway,orderDetailsStatus, numberTable, discountCode, products);
    if(res.status === 'success'){
      window.location.reload();
    }else{
      setAlertDialog(res.message);
    }
  };

  const setOrderDetails = function(details){
    setOrderDetailsSdt(details.sdt);
    setOrderDetailsTableNumber(details.numberTable);
    setOrderDetailsIsTakeAway(details.isTakeAway);
    setOrderDetailsNote(details.note);
    setOrderDetailsUser(details.userId);
    setOrderDetailsDiscountPayment(details.discountPayment);
    setOrderDetailsTime(GeneralMethod.convertTimeToDateTime(details.time));
    setOrderDetailsStatus(details.status);
    if(details.status ==="waiting"||details.status ==="preparing"||details.status ==="completed"){
      setEditAble(true);
    }
    OrderService.getOrderDetailsProducts(details.orderId).then((res) => {
        if(res.status === 'success'){
          //convert
          // console.log(res.data);
          setOrderDetailsProducts(res.data);
        }else{
          setAlertDialog(res.message);
        }
    });
  }

  React.useEffect(()=>{
    OrderService.getOrderDetails(id).then((res) => {
        if(res.status === 'success'){
          //convert
          // console.log(res.data);
          setOrderDetails(res.data);
        }else{
          setAlertDialog(res.message);
        }
    });

  },[]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={0}>
        <Grid item xs={8}>

        
      <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/staff/order"}>Quay lại danh sách</Button>

        {
          alertDialog!== ""?
          <CustomDialog.AlertDialog
            message={alertDialog}
            onClose={() => setAlertDialog("")}
          />
          : null
        }
        
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
            
          </Typography>
          <CollapsibleTableDeleteAble handleRemoveProduct={removeProductHandle} orderDetails={orderDetailsProducts}/>

          <Box component="form" onSubmit={handleEditOrder} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Nhân viên"
              type="text"
              value={orderDetailsUser}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Thời gian"
              type="text"
              value={orderDetailsTime}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <p>Trạng thái</p>
              {/* <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Trạng thái"
                name="status"
                value={orderDetailsStatus}
                onChange={(e)=>setOrderDetailsStatus(e.target.value)}
              >
                <MenuItem value={"waiting"}>Đang chờ</MenuItem>
                <MenuItem value={"preparing"}>Đang chuẩn bị</MenuItem>
                <MenuItem value={"completed"}>Đã chuẩn bị xong</MenuItem>
                <MenuItem value={"closed"}>Hoàn thành</MenuItem>
                <MenuItem value={"canceled"}>Đã hủy</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              label="Số lượng sản phẩm"
              type="number"
              value={orderDetailsProducts.reduce((result, product)=>result+product.number,0)}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              label="Số điện thoại"
              name="sdt"
              type="text"
              value={orderDetailsSdt}
              onChange={(e)=>setOrderDetailsSdt(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              label="Số bàn"
              name="numberTable"
              type="number"
              value={orderDetailsTableNumber}
              onChange={(e)=>setOrderDetailsTableNumber(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Mã giảm giá"
              name="discountCode"
              type="text"
              value={orderDetailsDiscountCode}
              onChange={(e)=>setOrderDetailsDiscountCode(e.target.value)}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <p>Hình thức</p>
              {/* <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Hình thức"
                name="isTakeAway"
                value={orderDetailsIsTakeAway}
                onChange={(e)=>setOrderDetailsIsTakeAway(e.target.value)}
              >
                <MenuItem value={"true"}>Mang đi</MenuItem>
                <MenuItem value={"false"}>Tại chổ</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              required
              label="Ghi chú"
              name="note"
              type="text"
              multiline
              minRows="3"
              value={orderDetailsNote}
              onChange={(e)=>setOrderDetailsNote(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Giảm giá"
              type="text"
              value={orderDetailsDiscountPayment}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Tổng bill"
              type="text"
              value={orderDetailsProducts.reduce((result, product)=>result+product.number*product.price,0)}
            />
            {
              message &&
              <Alert severity={message.status}>{message.content}</Alert>
            }
            <Box style={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>
              <Button size="small" variant="outline" href={"/staff/order"}>Quay lại danh sách</Button>
              <Button
                type="submit"
                align="right"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit 
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      </Grid>
        <Grid item xs={4}>
          <CollapsibleTableProductsSearch addProduct={addProductHandle}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


