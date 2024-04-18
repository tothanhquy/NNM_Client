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
import DiscountService from "../../../service/discount.service";

import * as CustomDialog from '../../component/dialog';
import CollapsibleTableDeleteAble from '../../component/CollapsibleTableProductsDeleteAble';
import CollapsibleTableProductsSearch from '../../component/CollapsibleTableProductsSearch';
// TODO remove, this demo shouldn't need to reset the theme.

const getDiscountPercent = function(discount, productId){
  let productIds = discount.productIds.split(";");
  if(productIds.indexOf(productId)!==-1){
    return discount.discountPercent;
  }else{
    return 0;
  }
}


const defaultTheme = createTheme();

export default function Create() {
  const [message, setMessage] = React.useState(null);
  const [alertDialog, setAlertDialog] = React.useState("");
  // const [openConvertDialog, setOpenConvertDialog] = React.useState(false);
  const discountCodeRef = React.useRef(null);

  // const [orderDetailsSdt,setOrderDetailsSdt ] = React.useState(null);
  // const [orderDetailsTableNumber,setOrderDetailsTableNumber ] = React.useState(null);
  // const [orderDetailsNote,setOrderDetailsNote ] = React.useState(null);
  const [orderDetailsIsTakeAway,setOrderDetailsIsTakeAway ] = React.useState(false);
  const [orderDetailsProducts,setOrderDetailsProducts ] = React.useState([]);
  
  const [discount, setDiscount] = React.useState(null);
  const [discountMessage, setDiscountMessage] = React.useState(null);

  const calcuDiscountPayment = ()=>{
    if(discount==null) return 0;
    let discountPayment = 0;
    for(let i=0; i<orderDetailsProducts.length; i++){
      discountPayment += parseInt(getDiscountPercent(discount,orderDetailsProducts[i].productId)*orderDetailsProducts[i].price*orderDetailsProducts[i].number/100);
    }
    return discountPayment;
  }
  
  const getCheckDiscount = (discountCode) => {
    DiscountService.getDiscountByCode(discountCode)
    .then((res) => {
      console.log(res);
      if(res.status ==='success'){
        if(res.data.startTime>Date.now()||res.data.endTime<Date.now()){
          setDiscountMessage({status:"warning",content:"Mã đã ngoài thời gian hợp lệ"});
        }else{
          setDiscount(res.data);
         setDiscountMessage({status:"info",content:"Mã giảm giá hợp lệ"});
        }
     }else{
        setDiscountMessage({status:"warning",content:res.message});
     }
     });
     discountCodeRef.current=discountCode;
  };

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


  // const { id } = useParams();

  // const handleChangeStatus = (event) => {
  //   event.preventDefault();

  //   let status = event.target.value;
    
  //   OrderService.updateOrderStatus(id, status)
  //   .then(res=>{
  //     if(res.status === 'success'){
  //       setOrderDetailsStatus(status);
  //       setAlertDialog("Thay đổi trạng thái thành công");
  //     }else{
  //       setAlertDialog(res.message);
  //     }
  //   })
  // };

  const handleCreateOrder = async (event) => {
    event.preventDefault();

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

    let res = await OrderService.createOrder(sdt, note, isTakeAway, numberTable, discountCode, products);
    console.log(res);
    if(res.status === 'success'){
      window.location.href = "/staff/order";
    }else{
      setAlertDialog(res.message);
    }
  };

  // const setOrderDetails = function(details){
  //   setOrderDetailsSdt(details.status);
  //   setOrderDetailsTableNumber(details.tableNumber);
  //   setOrderDetailsIsTakeAway(details.isTakeAway===true?"Mang đi":"Tại quán");
  //   setOrderDetailsNote(details.note);
  //   setOrderDetailsNumberProduct(details.numberProduct);
  //   setOrderDetailsTotalBill(details.totalBill);
  //   setOrderDetailsProducts(details.products);
  // }

  // React.useEffect(()=>{
    
  //   OrderService.getOrderDetails(id).then((res) => {
  //       if(res.status === 'success'){
  //         //convert
  //         // console.log(res.data);
  //         setOrderDetails(res.data);
  //       }else{
  //         setAlertDialog(res.message);
  //       }
  //   });

  // },[]);

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
            Tạo đơn mới
          </Typography>
          <CollapsibleTableDeleteAble handleRemoveProduct={removeProductHandle} orderDetails={orderDetailsProducts}/>
          <Box component="form" onSubmit={handleCreateOrder} sx={{ mt: 1 }}>
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
              label="Số điện thoại"
              name="sdt"
              type="text"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Số bàn"
              name="numberTable"
              type="number"
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <p>Hình thức</p>
              {/* <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Trạng thái"
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
              label="Ghi chú"
              name="note"
              type="text"
              multiline
              minRows="3"
            />
            {
              discountMessage &&
              <Alert severity={discountMessage.status}>{discountMessage.content}</Alert>
            }
            <TextField
              margin="normal"
              fullWidth
              label="Mã giảm giá"
              name="discountCode"
              type="text"
              inputRef ={discountCodeRef}
              onChange={(e)=>{getCheckDiscount(e.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Giảm giá"
              type="text"
              value={calcuDiscountPayment()}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Tổng bill"
              type="text"
              value={orderDetailsProducts.reduce((result, product)=>result+product.number*product.price,0)-calcuDiscountPayment()}
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
                Create 
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


