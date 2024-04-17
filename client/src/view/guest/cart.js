import React, { useRef } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/flexboxgrid.min.css";
import './style/index.css';
import { Helmet } from "react-helmet";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

import CollapsibleTableDeleteAble from "../component/CollapsibleTableProductsDeleteAble";
import ProductService from "../../service/product.service";
import BeforeOrderService from "../../service/beforeorder.service";
import DiscountService from "../../service/discount.service";
import AuthService from "../../service/auth.service";
import * as CookieCart from "../../service/user_cart.storage";
import * as CustomDialog from "../component/dialog";
// Sections
import TopNavbar from "./components/Nav/TopNavbar";


const getDiscountPercent = function(discount, productId){
  let productIds = discount.productIds.split(";");
  if(productIds.indexOf(productId)!==-1){
    return discount.discountPercent;
  }else{
    return 0;
  }
}


const defaultTheme = createTheme();
export default function Cart() {
  const products = useRef([]);
  const numberTableRef = useRef(null);
  const noteRef = useRef(null);
  const isTakeAwayRef = useRef(null);
  const discountCodeRef = useRef(null);
  const [cartItems,setCartItems] = React.useState([]);
  const [alertDialog,setAlertDialog] = React.useState(null);
  const [submitCreateDialog,setSubmitCreateDialog] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
  const [discount, setDiscount] = React.useState(null);
  const [discountMessage, setDiscountMessage] = React.useState(null);

  const calcuDiscountPayment = ()=>{
    if(discount==null) return 0;
    let discountPayment = 0;
    for(let i=0; i<cartItems.length; i++){
      discountPayment += getDiscountPercent(discount,cartItems[i].productId)*cartItems[i].price*cartItems[i].number;
    }
    return discountPayment;
  }
  
  const getCheckDiscount = (discountCode) => {
    DiscountService.getDiscountByCode(discountCode)
    .then((res) => {
       if(res.status ==='success'){
          setDiscount(res.data);
         setDiscountMessage({status:"info",message:"Mã giảm giá hợp lệ"});
       }else{
          setDiscountMessage({status:"warning",message:res.message});
       }
     });
     discountCodeRef.current=discountCode;
  };

  const getProductPriceAndName = function(id,size){
    let indPro = products.current.findIndex(p => p.productId+"" === id);
    if(indPro>=0){
      let sizes = products.current[indPro].sizes.split(';');
      for(let i = 0; i < sizes.length; i++){
        let split = sizes[i].split(':');
        if(split[0]===size){
          return {
            price:parseInt(split[1])
            ,name:products.current[indPro].name
          };
        }
      }
      
      return null;
    }else{
      return null;
    }
  };

  const getCartItemsRealData =function(cartItemsQuery){
    let resCartItems = [];
    for(let i=0; i<cartItemsQuery.length; i++){
      let realData = getProductPriceAndName(cartItemsQuery[i].productId+"", cartItemsQuery[i].size);
      
      if(realData!==null){
        resCartItems.push(
          {
            productId: cartItemsQuery[i].productId,
            size: cartItemsQuery[i].size,
            price: realData.price,
            name: realData.name,
            number: cartItemsQuery[i].number
          }
        );
      }
    }
    return resCartItems;
  }

  const handleDeleteProduct = function(productId){
    let resCartItem = cartItems.filter(e=>e.productId !== productId);
    CookieCart.setCartItems(resCartItem);
    setCartItems(resCartItem);
  }

  const handleCreateOrder = function(){
    // event.preventDefault();
    if(cartItems.length===0){
      setAlertDialog("Vui lòng chọn sản phẩm");
      return;
    }
    let note = noteRef.current.value;
    let isTakeAway = isTakeAwayRef.current.value;
    let numberTable = numberTableRef.current.value;
    let discountCode = discountCodeRef.current.value;

    let products = [];
    cartItems.forEach(product => {
      products.push(`${product.productId}:${product.size}:${product.number}`);
    });
    products=products.join(';');

    BeforeOrderService.createBeforeOrder(numberTable, isTakeAway, note, discountCode, products)
    .then(res=>{
      if(res.status === 'success'){
        setAlertDialog("Đặt hàng thành công!");
        setSubmitCreateDialog(null)
        setCartItems([]);
        CookieCart.setCartItems([]);
      }else{
        setAlertDialog(res.message);
      }
    });
    
  }

  const handleCreateOrderClick = function(event){
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    setSubmitCreateDialog();
  }

  const getNavOne = React.useMemo(() => {
    return (
      <TopNavbar />
    );
  }, []);

  React.useEffect(() => {
    ProductService.getAllProducts()
    .then(res=>{
      if(res.status==="success"){
        products.current = res.data;
        
        let cartItemsQuery = CookieCart.getCartItems();
        // console.log(cartItemsQuery);
        // console.log(getCartItemsRealData(cartItemsQuery));
        setCartItems(getCartItemsRealData(cartItemsQuery));
      }else{
        setAlertDialog(res.message);
      }
    });
    AuthService.checkLogin()
    .then((res) => {
       if(res.status ==='success'){
         setIsLogin(true);
       }else{
         setIsLogin(false);
       }
     });
  }
  ,[]);
  return (
    <ThemeProvider theme={defaultTheme}>
      {
        alertDialog!== null?
        <CustomDialog.AlertDialog
          message={alertDialog}
          onClose={() => setAlertDialog(null)}
        />
        : null
      }
      {submitCreateDialog!==null&&
        <CustomDialog.AskDialog
          open={true}
          title="Xác nhận đặt hàng"
          content={"Bạn có chắc chắn muốn đặt hàng?"}
          onClose={()=>{setSubmitCreateDialog(null)}}
          onHandle={()=>{handleCreateOrder(submitCreateDialog)}}
        />
      }
	    <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      {
        getNavOne
      }
      

      <Box style={{margin:"auto",width:"100%",maxWidth:"800px",display:"flex",flexDirection:"column",justifyContent:"start",paddingTop:"100px"}}>
          <Typography component="h1" variant="h5">
            Giỏ hàng
          </Typography>
          <CollapsibleTableDeleteAble orderDetails={cartItems} handleRemoveProduct={handleDeleteProduct} />
          
          {
            isLogin?
            <Box component="form" onSubmit={handleCreateOrderClick} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Số lượng sản phẩm"
                  type="number"
                  value={cartItems.reduce((result, product)=>result+product.number,0)}
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
                  inputRef ={numberTableRef}
                />
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <p>Hình thức</p>
                  {/* <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Trạng thái"
                    name="isTakeAway"
                    inputRef ={isTakeAwayRef}
                    defaultValue={"true"}
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
                  inputRef ={noteRef}
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
                  value={cartItems.reduce((result, product)=>result+product.number*product.price,0)-calcuDiscountPayment()}
                />
                <Box style={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>
                  <Button size="small" variant="outline" href={"/staff/order"}>Quay lại danh sách</Button>
                  <Button
                    type="submit"
                    align="right"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đặt hàng 
                  </Button>
                </Box>
              </Box>
            :
            <Alert severity="info">Bạn cần đăng nhập để đặt hàng.</Alert>
          }

      </Box>
    </ThemeProvider>
  );
}


