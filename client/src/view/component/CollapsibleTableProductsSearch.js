import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';


import ProductService from '../../service/product.service';



function createProductSizeView(size,price) {
  return {
    size,price
  };
}
function createProductView(productId,name, sizes) {
  return {
    productId,name, sizes
  };
}

function SizeRow({size,price,addHandle}){
    const [number,setNumber] = React.useState(null);
    const [showAdd,setShowAdd] = React.useState(false);

    const addBtnClick = function(e){
      addHandle(size,price,parseInt(number<0?-number:number));
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
            />
        </TableCell>
        <TableCell align="right">
          {showAdd?<Button type="button" onClick={addBtnClick}>Add</Button>:null}
        </TableCell>
      </TableRow>
    );
}
function ProductRow({product,addHandle}) {
  const [open, setOpen] = React.useState(false);

  const handleAddProduct = function(size,price,number){
    addHandle(product.id,product.name,size,price,number);
  }

  return (
    <React.Fragment key={product.id}>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell align="right">
          <img
            src={`${product.image}?w=164&h=164&fit=crop&auto=format`}
            alt={product.name}
            loading="lazy"
            style={{maxHeight:'50px'}}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Size</TableCell>
                    <TableCell>giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell align="right">Thêm</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.sizes.map((size) => (
                    <SizeRow size={size.size} price={size.price} addHandle={handleAddProduct}/>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({addProduct}) {
  const [rows, setRows] = React.useState([]);
  // const [fixRows, setFixRows] = React.useState([]);
  const [search, setSearch] = React.useState("");
  
  const addProductHandle = function(productId,name,size,price,number){
    addProduct(productId,name,size,price,number);
  }

  const handleSearch = function(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSearch(data.get("search"));
  }

  React.useEffect(() =>{
    ProductService.getAllProducts().then((response) => {
      if(response.status==="success"){
        let products = response.data.map(p => {
          let hanSizes = p.sizes.split(";").map(s => {
            let spl = s.split(":");
            return {size: spl[0], price: parseInt(spl[1])};
          });
          return {id:p.id,name:p.name,image:p.image,sizes:hanSizes};
        });
        setRows(products);
        // setFixRows(products);
      }
    });
  },[]);

  return (
    <TableContainer component={Paper}>
      <box style={{display:'flex',flexDirection:'row'}}>
        <Box style={{margin:'10px 0 0 20px',display:'flex',flexDirection:'row',alignItems:'center'}} component="form" onSubmit={handleSearch}>
          <TextField size="small" 
          label="Search..."
          variant="outlined"
                name="search"
                type="text"/>
          <IconButton type="submit" color="primary" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="right">Ảnh</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
          rows.filter(e=>search===""||e.name.toLowerCase().indexOf(search.toLowerCase())!==-1).map((row) => (
            <ProductRow product={row} addHandle={addProductHandle} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
