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

import TableService from '../../../service/table.service';

import * as CustomDialog from '../../component/dialog';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Edit() {
  const [message, setMessage] = React.useState(null);
  const [alertDialog, setAlertDialog] = React.useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const [name, setName] = React.useState("");
  const [floor, setFloor] = React.useState(1);
  const [tableNumber, setTableNumber] = React.useState(null);

  const { id } = useParams();
  const tableId = id;

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let name = data.get('name');
    let floor = data.get('floor');
    let tableNumber = data.get('tableNumber');

    TableService.updateTable(tableId, name,floor,tableNumber)
    .then(res=>{
      if(res.status === 'success'){
        setMessage({status:"success",content:"Cập nhật thành công"});
      }else{
        setMessage({status:"warning",content:res.message});
      }
    })
  };
  const handleSubmitDelete = async (event) => {
    event.preventDefault();

    let res = await TableService.deleteTable(tableId);
    if(res.status === 'success'){
      window.location.href = '/admin/table';
    }else{
      setAlertDialog(res.message);
    }
  };

  const setTable = function(table){
    setTableNumber(table.tableNumber);
    setName(table.name);
    setFloor(table.floor);
  }

  React.useEffect(()=>{
    
    TableService.getTable(tableId).then((res) => {
        if(res.status === 'success'){
          //convert
          console.log(res.data);
          setTable(res.data);
        }else{
          setAlertDialog(res.message);
        }
    });

  },[]);

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/admin/table"}>Quay lại danh sách</Button>

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
            Sửa Table
          </Typography>
          <Box component="form" onSubmit={handleSubmitEdit} sx={{ mt: 1 }}>
          
          <TextField
              margin="normal"
              required
              fullWidth
              label="Tên table"
              name="name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="số table"
              name="tableNumber"
              type="number"
              min="0"
              step="1"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }} required>
              <InputLabel id="demo-simple-select-label">Số tầng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Số tầng"
                name="floor"
                value={floor}
              >
                <MenuItem onClick={()=>{setFloor(1)}} value={1}>Tầng 1</MenuItem>
                <MenuItem onClick={()=>{setFloor(2)}} value={2}>Tầng 2</MenuItem>
                <MenuItem onClick={()=>{setFloor(3)}} value={3}>Tầng 3</MenuItem>
              </Select>
            </FormControl>
            {
              message &&
              <Alert severity={message.status}>{message.content}</Alert>
            }
            <Box style={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>
              <Button size="small" variant="outline" href={"/admin/table"}>Quay lại danh sách</Button>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Sửa Table</Button>
              {openDeleteDialog&&
              <CustomDialog.AskDialog
                open={openDeleteDialog}
                title="Xác nhận xóa"
                content={"Bạn có chắc chắn muốn xóa table "+name+"?"}
                onClose={()=>{setOpenDeleteDialog(false)}}
                onHandle={handleSubmitDelete}
              />
              }
              <Button
                onClick={()=>{setOpenDeleteDialog(true)}}
                type="button"
                align="right"
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Delete Table
              </Button>
            </Box>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}