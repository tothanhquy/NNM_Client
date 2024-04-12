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

import UserService from '../../../service/user.service';

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

  const changeRoleOfUser =function(id,role) {
    UserService.updateRole(id,role).then((res) => {
      if(res.status ==='success'){
        setAlertDialog("Thay đổi role thành công");
        updateRowByIdWithRole(id,role);
      }else{
        setAlertDialog(res.message);
      }
    });
  }
  const changeIsBanOfUser =function(id,isBan) {
    UserService.updateBan(id,isBan).then((res) => {
      if(res.status ==='success'){
        if(isBan){
          setAlertDialog("Khóa tài khoản thành công");
        }else{
          setAlertDialog("Mở khóa tài khoản thành công");
        }
        updateRowByIdWithIsBan(id,isBan);
      }else{
        setAlertDialog(res.message);
      }
    });
  }

  const updateRowByIdWithRole = function(id, role){
    setFixRows(fixRows.map(function(row){
      if(row.id === id){
        row.role = role;
      }
      return row;
    }));
    setRows(rows.map(function(row){
      if(row.id === id){
        row.role = role;
      }
      return row;
    }));
  }
  const updateRowByIdWithIsBan = function(id, isBan){
    setFixRows(fixRows.map(function(row){
      if(row.id === id){
        row.isBan = isBan;
      }
      return row;
    }));
    setRows(rows.map(function(row){
      if(row.id === id){
        row.isBan = isBan;
      }
      return row;
    }));
  }

  React.useEffect(() => {
    //setRows(rowsInit);
    UserService.getAllUsers().then((res) => {
      if(res.status === 'success'){
        //convert
        console.log(res.data);
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
        if(row.name.toLowerCase().indexOf(search.toLowerCase())!== -1
      ||row.sdt.toLowerCase().indexOf(search.toLowerCase())!== -1){
          filterRows.push(row);
        }
      });
    }
    renderRows(filterRows);
  }
  const filterDataByRole = (role) => {
    let filterRows = [];
    if(role==="all"){
      filterRows=fixRows;
    }else{
      fixRows.forEach(row => {
        if(row.role.toLowerCase()===role.toLowerCase()){
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

    filterDataBySearch(search);
  }
  const handleFilterRole = (e) => {
    e.preventDefault();
    let role = e.target.value;
    filterDataByRole(role);
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
            <InputLabel id="demo-simple-select-label">Lọc tài khoản</InputLabel>
            <Select size="medium"
              label="Hiển thị tài khoản"
              onChange={handleFilterRole}
            >
              <MenuItem selected value={"all"}>Tất cả</MenuItem>
              <MenuItem value={"user"}>Chỉ khách hàng</MenuItem>
              <MenuItem value={"staff"}>Chỉ nhân viên</MenuItem>
            </Select>
          </FormControl>
      </box>
      
      <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell >Tên</TableCell>
            <TableCell >Số điện thoại</TableCell>
            <TableCell >Vai trò</TableCell>
            <TableCell >Access</TableCell>
            {/* <TableCell align='center'>Action</TableCell> */}
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
                {row.name}
              </TableCell>
              <TableCell >
                {row.sdt}
              </TableCell>
              <TableCell >
                <FormControl sx={{ m: 1, minWidth: 200 }} required>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    name="role"
                    value={row.role}
                    onChange={(e)=>{changeRoleOfUser(row.id,e.target.value)}}
                  >
                    <MenuItem value={"staff"}>Nhân viên</MenuItem>
                    <MenuItem value={"user"}>Khách hàng</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell >
                {
                  row.isBan?
                  <FormControl error  sx={{ m: 1, minWidth: 200 }} required>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="isBan"
                    name="isBan"
                    value={row.isBan}
                    onChange={(e)=>{changeIsBanOfUser(row.id,e.target.value)}}
                  >
                    <MenuItem value={true}>Disable</MenuItem>
                    <MenuItem value={false}>Active</MenuItem>
                  </Select>
                </FormControl>
                    :
                    <FormControl  sx={{ m: 1, minWidth: 200 }} required>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="isBan"
                      name="isBan"
                      value={row.isBan}
                      onChange={(e)=>{changeIsBanOfUser(row.id,e.target.value)}}
                    >
                      <MenuItem value={true}>Disable</MenuItem>
                      <MenuItem value={false}>Active</MenuItem>
                    </Select>
                  </FormControl>
                }
                
              </TableCell>
              {/* <TableCell style={{ width: 160 }} align='center'>
                <Button href={"/admin/table/edit/"+row.id}>Edit</Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[6, 12, 25, { label: 'All', value: -1 }]}
              colSpan={5}
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
