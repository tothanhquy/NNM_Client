import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import ProductService from '../../../../service/product.service';
import API from '../../../../service/api';
import * as CookieCart from '../../../../service/user_cart.storage';


function SizeRow({size,price,addHandle}){
    const [number,setNumber] = React.useState(null);
    const [showAdd,setShowAdd] = React.useState(false);

    const addBtnClick = function(e){
      addHandle(size,parseInt(number<0?-number:number));
      setShowAdd(false);
      setNumber(0);
    }

    const changeNumber = function(e){
      let numberG = e.target.value;
      if(numberG < 0)numberG = 0;
      setNumber(numberG);
      if(numberG!==undefined&&numberG!==null&&numberG>0){
        setShowAdd(true);
      }else{
        setShowAdd(false);
      }
    }

    return (
      <TableRow key={size}>
        <TableCell component="th" scope="row">
          {size}
        </TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>
          <TextField
              margin="normal"
              label="Số lượng"
              type="number"
              value={number}
              onChange={changeNumber}
              min={0}
              step="1"
              size="small"
            />
        </TableCell>
        <TableCell align="center">
          {showAdd?<Button type="button" onClick={addBtnClick}>Thêm vào giỏ</Button>:null}
        </TableCell>
      </TableRow>
    );
}

function convertSizes(sizesStr) {
    return sizesStr.split(";").map(s => {
        let spl = s.split(":");
        return {size: spl[0], price: parseInt(spl[1])};
    });
}

export default function ProductMiniDetails({product,handleClose}) {

    const handleAddProductToCart = function(size, number){
        let cartItems = CookieCart.getCartItems();
        let newItem = {
            productId: product.productId,
            size: size,
            number: number
        }
        let ind = cartItems.findIndex(e=>e.productId+"" === product.productId+""&&e.size === size);
        if(ind >= 0){
            let newItems = cartItems.slice();
            newItems[ind].number += number;
            CookieCart.setCartItems(newItems);
        }else{
            CookieCart.setCartItems([...cartItems,newItem]);
        }
        let cartItemsQuery = CookieCart.getCartItems();
    }
  return (

    <Card sx={{overflowY:"auto",maxHeight:"95vh",maxWidth:"80vw",position:"fixed", zIndex:"1000",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100"
        image={`${API.IMAGE_URL}/${product.img}`}
      />
      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography align="center" variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardContent sx={{maxWidth:"60vw"}}>
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                <TableCell>Size</TableCell>
                <TableCell>giá</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell align="center">Thêm</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {convertSizes(product.sizes).map((size) => (
                    <SizeRow size={size.size} price={size.price} addHandle={handleAddProductToCart}/>
                ))}
            </TableBody>
        </Table>
      </CardContent>
      <CardActions>
      <div sx={{width:"100% !important",display:"flex",flexDirector:"row",justifyContent:"right"}}>
        <Button align="center" onClick={handleClose} size="small">Close</Button>
      </div>
      </CardActions>
    </Card>
  );
}