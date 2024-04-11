import Alert from '@mui/material/Alert';


export default function AlertBox(props){
    return (
        <Alert severity={props.status}>{props.message}</Alert>
    )
}