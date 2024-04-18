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
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DiscountService from '../../../service/discount.service';

import * as GeneralMethod from '../../../common_method/general';
import * as CustomDialog from '../../component/dialog';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Edit() {
  const [message, setMessage] = React.useState("");
  const [dialog, setDialog] = React.useState({open:false,message:""});
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState("");
  const [discountMoney, setDiscountMoney] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [productIds, setProductIds] = React.useState("");

  const { id } = useParams();
  const discountId = id;

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let name = data.get('name');
    let code = data.get('code');
    let description = data.get('description');
    let discountPercent = data.get('discountPercent');
    let discountMoney = data.get('discountMoney');
    let productIds = data.get('productIds');

    let startTimeAsDate = data.get('startTime');
    let endTimeAsDate = data.get('endTime');

    let startTimestamp = GeneralMethod.convertDateInputToTimestamp(startTimeAsDate);
    let endTimestamp = GeneralMethod.convertDateInputToTimestamp(endTimeAsDate);


    if(!startTimestamp||!endTimestamp){
      setMessage({status: "warning", content:"Thời gian không đúng định dạng"});
      return;
    }

    if(endTimestamp<startTimestamp){
      setMessage({status: "warning", content:"Thời gian kết thúc phải lớn hơn thời gian bắt đầu"});
      return;
    }

    DiscountService.updateDiscount(discountId,name,code, description,  discountPercent, discountMoney, startTimestamp, endTimestamp, productIds)
    .then(res=>{
      if(res.status === 'success'){
        setMessage({status: "success", content:"Cập nhật Discount thành công"});
      }else{
        setMessage({status: "warning", content:res.message});
      }
    })
  };
  const handleSubmitDelete = async (event) => {
    event.preventDefault();

    let res = await DiscountService.deleteDiscount(discountId);
    if(res.status === 'success'){
      window.location.href = '/admin/discount';
    }else{
      setDialog({open: true, message:res.message});
    }
  };

  const setDiscount = function(discount){
    setCode(discount.code);
    setName(discount.name);
    setDescription(discount.description);
    setDiscountPercent(discount.discountPercent);
    setDiscountMoney(discount.discountMoney);
    setStartTime(GeneralMethod.convertTimestampToDateInput(discount.startTime));
    setEndTime(GeneralMethod.convertTimestampToDateInput(discount.endTime));
    setProductIds(discount.productIds);
  }

  React.useEffect(()=>{
    
    DiscountService.getDiscount(discountId).then((res) => {
        if(res.status === 'success'){
          //convert
          console.log(res.data);
          setDiscount(res.data);
        }else{
          setDialog({open: true, message:res.message});
        }
    });

  },[]);

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xm">
        <Button size="small" variant="outline" href={"/admin/discount"}>Quay lại danh sách</Button>

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
            Sửa Discount
          </Typography>
          <Box component="form" onSubmit={handleSubmitEdit} sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              label="Code discount"
              name="code"
              type="text"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Tên discount"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={5}
              name="description"
              label="Mô tả"
              placeholder="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="discountPercent"
              label="% giảm giá"
              type="number"
              min="0"
              max="100"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="discountMoney"
              label="tiền giảm giá"
              type="number"
              min="0"
              step="1"
              value={discountMoney}
              onChange={(e) => setDiscountMoney(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={5}
              label="các sản phẩm (id) | id1;id2;id3"
              name="productIds"
              type="text"
              value={productIds}
              onChange={(e) => setProductIds(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              label="Thời gian bắt đầu"
              name="startTime"
              type="datetime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder='dd-mm-yyyy'/>
            <TextField
              margin="normal"
              required
              label="Thời gian kết thúc"
              placeholder='dd-mm-yyyy'
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              type="datetime"/>
            {
              message &&
              <Alert severity={message.status}>{message.content}</Alert>
            }
            <Box style={{display:'flex',justifyContent: 'space-between', flexDirection:'row'}}>
              <Button size="small" variant="outline" href={"/admin/discount"}>Quay lại danh sách</Button>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Sửa Discount</Button>
              {openDeleteDialog&&
              <CustomDialog.AskDialog
                open={openDeleteDialog}
                title="Xác nhận xóa"
                content={"Bạn có chắc chắn muốn xóa discount "+name+"?"}
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
                Delete Discount
              </Button>
            </Box>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}