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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



// const orderDetails=[
//   {productId:8,orderId:1,size:"S",price:15000,number:1},
//   {productId:1,orderId:1,size:"S",price:15000,number:1},
//   {productId:5,orderId:1,size:"S",price:15000,number:1},
//   {productId:5,orderId:2,size:"S",price:15000,number:1},
//   {productId:2,orderId:2,size:"S",price:15000,number:1},
//   {productId:2,orderId:3,size:"S",price:15000,number:1},
//   {productId:2,orderId:5,size:"S",price:15000,number:1},
//   {productId:3,orderId:4,size:"S",price:15000,number:1},
//   {productId:3,orderId:4,size:"M",price:25000,number:2},
//   {productId:3,orderId:4,size:"L",price:35000,number:3},
// ];


function createProductSizeView(size,price,number) {
  return {
    size,price,number
  };
}
function createProductView(productId,name,sizeCount, totalMoney, sizes) {
  return {
    productId,name,sizeCount, totalMoney, sizes
  };
}

function convertToProductView(orderDetails=[]){
  let productViews = [];
  console.log("Products");
  console.log(orderDetails);
  orderDetails.forEach(function(p){
    let ind = productViews.findIndex(a=>a.productId === p.productId);
    if(ind >= 0){
      productViews[ind].sizes.push(createProductSizeView(p.size,p.price,p.number));
      productViews[ind].sizeCount += p.number;
      productViews[ind].totalMoney += p.price*p.number;
    }else{
      let productView = createProductView();
      productView.productId = p.productId;
      productView.name = p.name;
      productView.sizeCount = p.number;
      productView.totalMoney = p.price*p.number;
      productView.sizes = [createProductSizeView(p.size,p.price,p.number)];
      productViews.push(productView);
    }
  });
  return productViews;
}

function Row(props) {
  const row = props.row;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.sizeCount}</TableCell>
        <TableCell align="right">{row.totalMoney}</TableCell>
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
                    <TableCell>Số lượng</TableCell>
                    <TableCell>giá</TableCell>
                    <TableCell align="right">Tổng ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sizes.map((size) => (
                    <TableRow key={size.size}>
                      <TableCell component="th" scope="row">
                        {size.size}
                      </TableCell>
                      <TableCell>{size.number}</TableCell>
                      <TableCell>{size.price}</TableCell>
                      <TableCell align="right">
                        {Math.round(size.number * size.price)}
                      </TableCell>
                    </TableRow>
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function CollapsibleTable({orderDetails=[]}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="right">Tổng số lượng</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          convertToProductView(orderDetails).map((row) => (
            <Row key={row.productId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
