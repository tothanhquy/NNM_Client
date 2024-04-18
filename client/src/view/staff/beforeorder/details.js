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

import BeforeOrderService from '../../../service/beforeorder.service';
import * as GeneralMethod from '../../../common_method/general';

import * as CustomDialog from '../../component/dialog';
import CollapsibleTable from '../../component/CollapsibleTableProducts';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Edit() {
  const [message, setMessage] = React.useState(null);
  const [alertDialog, setAlertDialog] = React.useState("");
  const [openConvertDialog, setOpenConvertDialog] = React.useState(false);

  const [beforePrderDetailsUser,setBeforePrderDetailsUser ] = React.useState(null);
  const [beforePrderDetailsTime,setBeforePrderDetailsTime ] = React.useState(null);
  const [beforePrderDetailsStatus,setBeforePrderDetailsStatus ] = React.useState(null);
  const [beforePrderDetailsTableNumber,setBeforePrderDetailsTableNumber ] = React.useState(null);
  const [beforePrderDetailsIsTakeAway,setBeforePrderDetailsIsTakeAway ] = React.useState(null);
  const [beforePrderDetailsNote,setBeforePrderDetailsNote ] = React.useState(null);
  const [beforePrderDetailsDiscountCode,setBeforePrderDetailsDiscountCode ] = React.useState(null);
  const [beforeOrderDetailsProducts,setBeforeOrderDetailsProducts ] = React.useState([]);
  const [beforeOrderDetailsDiscountPayment,setBeforeOrderDetailsDiscountPayment ] = React.useState([]);
  const [beforeOrderDetailsTotalBill,setBeforeOrderDetailsTotalBill ] = React.useState([]);
  

  const { id } = useParams();

  const handleChangeStatus = (event) => {
    event.preventDefault();

    let status = event.target.value;
    
    BeforeOrderService.updateBeforeOrderStatus(id, status)
    .then(res=>{
      if(res.status === 'success'){
        setBeforePrderDetailsStatus(status);
        setAlertDialog("Thay đổi trạng thái thành công");
      }else{
        setAlertDialog(res.message);
      }
    })
  };

  const handleSubmitConvert = async (event) => {
    event.preventDefault();

    let res = await BeforeOrderService.convertOrder(id);
    if(res.status === 'success'){
      setAlertDialog("Convert thành công");
      setOpenConvertDialog(false)
    }else{
      setAlertDialog(res.message);
    }
  };

  const setBeforeOrderDetails = function(details){
    setBeforePrderDetailsUser(details.user);
    setBeforePrderDetailsTime(GeneralMethod.convertTimeToDateTime(details.time));
    setBeforePrderDetailsStatus(details.status);
    setBeforePrderDetailsTableNumber(details.tableNumber);
    setBeforePrderDetailsIsTakeAway(details.isTakeAway===true?"Mang đi":"Tại quán");
    setBeforePrderDetailsNote(details.note);
    setBeforePrderDetailsDiscountCode(details.discountCode);
    setBeforeOrderDetailsProducts(details.products);
    setBeforeOrderDetailsDiscountPayment(details.discountPayment);
    setBeforeOrderDetailsTotalBill(details.totalBill);
  }

  React.useEffect(()=>{
    
    BeforeOrderService.getBeforeOrderDetails(id).then((res) => {
        if(res.status === 'success'){
          //convert
          // console.log(res.data);
          setBeforeOrderDetails(res.data);
        }else{
          setAlertDialog(res.message);
        }
    });

  },[]);

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/staff/before-order"}>Quay lại danh sách</Button>

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
            
          </Typography>
          <CollapsibleTable orderDetails={beforeOrderDetailsProducts}/>
          <Box component="form" onSubmit={()=>{}} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Mã giảm giá"
              name="discountCode"
              type="text"
              value={beforePrderDetailsDiscountCode}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Giảm giá"
              type="text"
              value={beforeOrderDetailsDiscountPayment}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Tổng tiền"
              type="text"
              value={beforeOrderDetailsTotalBill}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Khách"
              name="user"
              type="text"
              autoFocus
              value={beforePrderDetailsUser}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Thời điểm"
              name="time"
              type="datetime"
              value={beforePrderDetailsTime}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <p>Trạng thái</p>
              {/* <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Trạng thái"
                name="status"
                value={beforePrderDetailsStatus}
                onChange={handleChangeStatus}
              >
                <MenuItem value={"waiting"}>Đang chờ</MenuItem>
                <MenuItem value={"handled"}>Đã xử lý</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              label="Số bàn"
              name="tableNumber"
              type="number"
              value={beforePrderDetailsTableNumber}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Hình thức"
              name="isTakeAway"
              type="text"
              value={beforePrderDetailsIsTakeAway}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Ghi chú"
              name="note"
              type="text"
              multiline
              minRows="3"
              value={beforePrderDetailsNote}
            />
            {
              message &&
              <Alert severity={message.status}>{message.content}</Alert>
            }
            <Box style={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>
              <Button size="small" variant="outline" href={"/staff/before-roder"}>Quay lại danh sách</Button>
              {openConvertDialog&&
              <CustomDialog.AskDialog
                open={openConvertDialog}
                title="Bạn thực sự muốn"
                content={"Bạn có chắc chắn muốn convert đơn này thành đơn hàng?"}
                onClose={()=>{setOpenConvertDialog(false)}}
                onHandle={handleSubmitConvert}
              />
              }
              <Button
                onClick={()=>{setOpenConvertDialog(true)}}
                type="button"
                align="right"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Convert 
              </Button>
            </Box>
            
          </Box>
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}


