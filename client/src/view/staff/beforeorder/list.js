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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';

import BeforeOrderService from '../../../service/beforeorder.service';
import * as GeneralMethod from '../../../common_method/general';

import * as CustomDialog from '../../component/dialog';

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
  const [alertDialog, setAlertDialog] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [rows, setRows] = React.useState([]);
  const [fixRows, setFixRows] = React.useState([]);

  const [convertDialog, setConvertDialog] = React.useState(null);

  const [sortType, setSortType] = React.useState("dec");

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

  const changeStatusOfBeforeOrder =function(id,status) {
    BeforeOrderService.updateBeforeOrderStatus(id,status).then((res) => {
      if(res.status ==='success'){
        setAlertDialog("Thay đổi trạng thái thành công");
        updateRowByIdWithStatus(id,status);
      }else{
        setAlertDialog(res.message);
      }
    });
  }

  const updateRowByIdWithStatus = function(id, status){
    setFixRows(fixRows.map(function(row){
      if(row.beforeOrderId === id){
        row.status = status;
      }
      return row;
    }));
    setRows(rows.map(function(row){
      if(row.beforeOrderId === id){
        row.status = status;
      }
      return row;
    }));
  }

  React.useEffect(() => {
    //setRows(rowsInit);
    BeforeOrderService.getAllBeforeOrders().then((res) => {
      if(res.status === 'success'){
        //convert
        console.log(res.data);
        //sort
        if(sortType==="inc"){
          res.data.sort((a,b) =>a.time-b.time);
        }else{
          res.data.sort((b,a) =>a.time-b.time);
        }
        setFixRows(res.data);
        renderRows(res.data);
      }else{
        setAlertDialog(res.message);
      }
    });
  },[])

  const renderRows = function(rows) {
    setRows(rows);
    setPage(0);
  }

  const filterDataBySearch = (search) => {
    let filterRows = [];
    if(search===""){
      filterRows=fixRows;
    }else{
      fixRows.forEach(row => {
        if((row.userId+"").toLowerCase().indexOf(search.toLowerCase())!==-1||row.id+""===search||row.tableNumber+""===search){
          filterRows.push(row);
        }
      });
    }
    if(sortType==="inc"){
      filterRows.sort((a,b) =>a.time-b.time);
    }else{
      filterRows.sort((b,a) =>a.time-b.time);
    }
    renderRows(filterRows);
  }
  const filterDataByStatus = (status) => {
    let filterRows = [];
    if(status==="all"){
      filterRows=fixRows;
    }else{
      fixRows.forEach(row => {
        if(row.status.toLowerCase()===status.toLowerCase()){
          filterRows.push(row);
        }
      });
    }
    if(sortType==="inc"){
      filterRows.sort((a,b) =>a.time-b.time);
    }else{
      filterRows.sort((b,a) =>a.time-b.time);
    }
    renderRows(filterRows);
  }
  const sortData = (type) => {
    if(type==="inc"){
      renderRows(rows.sort((a,b) =>a.time-b.time));
    }else{
      renderRows(rows.sort((b,a) =>a.time-b.time));
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let search = data.get("search");
    console.log(search);

    filterDataBySearch(search);
  }
  const handleFilterStatus = (e) => {
    e.preventDefault();
    let status = e.target.value;
    filterDataByStatus(status);
  }
  const handleSortChange = (e) => {
    e.preventDefault();
    let type = e.target.value;
    setSortType(type);
    sortData(type);
  }
  const handleSubmitConvertOrder = (id)=>{
    BeforeOrderService.convertOrder(id)
    .then((res)=>{
      if(res.status === 'success'){
        setAlertDialog("Convert thành công");
        setConvertDialog(null);
      }else{
        setAlertDialog(res.message);
      }
    });
  }

  return (
    <TableContainer component={Paper}>
      {
        alertDialog!== ""?
        <CustomDialog.AlertDialog
          message={alertDialog}
          onClose={() => setAlertDialog("")}
        />
        : null
      }
      {convertDialog!==null&&
        <CustomDialog.AskDialog
          open={true}
          title="Xác nhận chuyển đổi thành đơn hàng"
          content={"Bạn có chắc chắn muốn chuyển đơn với mã "+convertDialog+"?"}
          onClose={()=>{setConvertDialog(null)}}
          onHandle={()=> {handleSubmitConvertOrder(convertDialog)}}
        />
      }
      
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
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Hiển thị trạng thái</InputLabel>
            <Select size="medium"
              label="Hiển thị trạng thái"
              onChange={handleFilterStatus}
            >
              <MenuItem selected value={"all"}>Tất cả</MenuItem>
              <MenuItem value={"waiting"}>Chỉ đang đợi</MenuItem>
              <MenuItem value={"handled"}>Chỉ đã xử lý</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Sắp xếp theo ngày</InputLabel>
            <Select size="medium"
              label="Sắp xếp theo ngày"
              value={sortType}
              onChange={handleSortChange}
            >
              <MenuItem value={"inc"}>Tăng dần</MenuItem>
              <MenuItem value={"dec"}>Giảm dần</MenuItem>
            </Select>
          </FormControl>
      </box>
      
      <Table sx={{ minWidth: 300 }} aria-label="custom pagination beforeorder">
      <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell >Khách</TableCell>
            <TableCell >ngày</TableCell>
            <TableCell >Trạng thái</TableCell>
            <TableCell >Số bàn</TableCell>
            <TableCell >Hình thức</TableCell>
            <TableCell >Ghi chú</TableCell>
            <TableCell >Mã giảm giá</TableCell>
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
                <Link href={`/staff/before-order/details/${row.beforeOrderId}`}>#{row.beforeOrderId}</Link>
              </TableCell>
              <TableCell >
                {row.name}
              </TableCell>
              <TableCell >
                {GeneralMethod.convertTimeToDateTime(row.time)}
              </TableCell>
              
              <TableCell >
                {
                  row.status==="waiting"?
                  <FormControl sx={{ bgcolor: 'warning.main', m: 1, minWidth: 200 }} required>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="status"
                    value={row.status}
                    onChange={(e)=>{changeStatusOfBeforeOrder(row.beforeOrderId,e.target.value)}}
                  >
                    <MenuItem value={"waiting"}>Đang chờ</MenuItem>
                    <MenuItem value={"handled"}>Đã xử lý</MenuItem>
                  </Select>
                </FormControl>
                :<FormControl sx={{ bgcolor: 'info.main', m: 1, minWidth: 200 }} required>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="status"
                    value={row.status}
                    onChange={(e)=>{changeStatusOfBeforeOrder(row.beforeOrderId,e.target.value)}}
                  >
                    <MenuItem value={"waiting"}>Đang chờ</MenuItem>
                    <MenuItem value={"handled"}>Đã xử lý</MenuItem>
                  </Select>
                </FormControl>
                }
              </TableCell>
              <TableCell >
                {row.tableNumber}
              </TableCell>
              <TableCell >
                {row.isTakeAway?
                <Button variant="contained">Mang đi</Button>
                :
                <Button variant="outlined">Tại chổ</Button>
              }
              </TableCell>
              <TableCell >
                {row.note}
              </TableCell>
              <TableCell >
                {row.discountCode}
              </TableCell>
              <TableCell style={{ width: 160 }} align='center'>
                <Button onClick={()=>{setConvertDialog(row.beforeOrderId)}} >Convert</Button>
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
