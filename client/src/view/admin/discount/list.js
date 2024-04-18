import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SearchIcon from '@mui/icons-material/Search';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DiscountService from '../../../service/discount.service';

import * as GeneralMethod from '../../../common_method/general';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const [dialog, setDialog] = React.useState({open:false,message:""});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [rows, setRows] = React.useState([]);
  const [fixRows, setFixRows] = React.useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    //setRows(rowsInit);
    DiscountService.getAllDiscounts().then((res) => {
      if(res.status === 'success'){
        //convert
        console.log(res.data);
        setFixRows(res.data);
        renderRows(res.data);
      }else{
        setDialog({open: true, message:res.message});
      }
    });
  },[])

  const renderRows = function(rows) {
    setRows(rows);
    setPage(0);
  }

  const filterData = (search) => {
    let filterRows = [];
    if(search===""){
      filterRows=fixRows;
    }else{
      fixRows.forEach(row => {
        if(row.name.toLowerCase().indexOf(search.toLowerCase())!== -1
      ||row.code.toLowerCase().indexOf(search.toLowerCase())!== -1){
          filterRows.push(row);
        }
      });
    }
    renderRows(filterRows);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let search = data.get("search");
    console.log(search);

    filterData(search);
  }

  return (
    <TableContainer component={Paper}>
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
      <box style={{display:'flex',flexDirection:'row'}}>
        <Button size="small" variant="contained" href={"/admin/discount/create"}>Tạo mới Discount</Button>
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
      
      <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell >CODE</TableCell>
            <TableCell >Tên Discount</TableCell>
            <TableCell >Sản phẩm</TableCell>
            <TableCell >Bắt đầu</TableCell>
            <TableCell >Kết thúc</TableCell>
            <TableCell >Giảm %</TableCell>
            <TableCell >Giảm tiền</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >
                {row.code}
              </TableCell>
              <TableCell >
                {row.name}
              </TableCell>
              <TableCell >
                {row.productIds}
              </TableCell>
              <TableCell >
                {GeneralMethod.convertTimeToDate(row.startTime)}
              </TableCell>
              <TableCell >
                {GeneralMethod.convertTimeToDate(row.endTime)}
              </TableCell>
              <TableCell>
                {row.discountPercent===0?"":row.discountPercent}
              </TableCell>
              <TableCell>
                {row.discountMoney===0?"":row.discountMoney}
              </TableCell>
              <TableCell style={{ width: 160 }} align='center'>
                <Button href={"/admin/discount/edit/"+row.id}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[6, 12, 25, { label: 'All', value: -1 }]}
              colSpan={9}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
