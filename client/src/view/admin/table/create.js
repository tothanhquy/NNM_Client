import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import TableService from '../../../service/table.service';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Create() {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let name = data.get('name');
    let floor = data.get('floor');
    let tableNumber = data.get('tableNumber');

    TableService.createTable(name,floor,tableNumber)
    .then(res=>{
      if(res.status === 'success'){
        let newId = res.data.id;
          window.location.href = '/admin/table/edit/' + newId;
        // setMessage({status: "success", content:"res.message"});
      }else{
        setMessage({status: "warning", content:res.message});
      }
    })
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/admin/table"}>Quay lại danh sách</Button>

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
            Tạo mới Table
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tên table"
              name="name"
              type="text"
              autoFocus
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
            />
            <FormControl sx={{ m: 1, minWidth: 200 }} required>
              <InputLabel id="demo-simple-select-label">Số tầng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Số tầng"
                name="floor"
                defaultValue={1}
              >
                <MenuItem value={1}>Tầng 1</MenuItem>
                <MenuItem value={2}>Tầng 2</MenuItem>
                <MenuItem value={3}>Tầng 3</MenuItem>
              </Select>
            </FormControl>
            
            
            {
              message &&
              <Alert severity={message.status}>{message.content}</Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Tạo Table
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}