import React, { useRef } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/flexboxgrid.min.css";
import './style/index.css';
import { Helmet } from "react-helmet";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CollapsibleTable from "../component/CollapsibleTableProductsDeleteAble";
import ProductService from "../../service/product.service";
import * as CookieCart from "../../service/user_cart.storage";
import * as CustomDialog from "../component/dialog";
// Sections
import TopNavbar from "./components/Nav/TopNavbar";
// import Header from "./components/Sections/Header";
// import Services from "./components/Sections/Services";
// import Products from "./components/Sections/Products";
// import Blog from "./components/Sections/Blog";
// import Pricing from "./components/Sections/Pricing";
// import Contact from "./components/Sections/Contact";
// import Footer from "./components/Sections/Footer"
const defaultTheme = createTheme();
export default function Cart() {
  let products = useRef([]);
  const [cartItems,setCartItems] = React.useState([]);
  const [alertDialog,setAlertDialog] = React.useState(null);

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
	    <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <TopNavbar />
      <div style={{margin:"auto",width:"100%",maxWidth:"800px",display:"flex",fexDirection:"column",paddingTop:"100px"}}>
        <CollapsibleTable orderDetails={cartItems} handleRemoveProduct={handleDeleteProduct} />

      </div>
    </ThemeProvider>
  );
}


