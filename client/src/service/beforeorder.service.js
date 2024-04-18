import API from "./api";
import Response from "./response";

function createData(id,userId, time, status, tableNumber, isTakeAway, note, discountCode,products=[]) {
    return { id,userId, time, status, tableNumber, isTakeAway, note, discountCode,products};
}
const beforeOrderDetails=[
    {productId:1,beforeOrderId:1,size:"L",price:25000,number:2},
    {productId:1,beforeOrderId:1,size:"S",price:15000,number:1},
    {productId:5,beforeOrderId:1,size:"S",price:15000,number:3},
    {productId:5,beforeOrderId:2,size:"S",price:15000,number:1},
    {productId:2,beforeOrderId:2,size:"S",price:15000,number:1},
    {productId:2,beforeOrderId:3,size:"S",price:15000,number:1},
    {productId:2,beforeOrderId:5,size:"S",price:15000,number:1},
    {productId:3,beforeOrderId:4,size:"S",price:15000,number:1},
    {productId:3,beforeOrderId:4,size:"M",price:25000,number:2},
    {productId:3,beforeOrderId:4,size:"L",price:35000,number:3},
];
const getProductsBuOrder = function(orderId) {
    return beforeOrderDetails.filter(a=>a.beforeOrderId === orderId);
}

const rowsInit = [
    createData(1,"12", 1738472833,"waiting","",false,"no ice","",getProductsBuOrder(1)),
    createData(2,"122", 17384728334,"waiting","",false,"no ice","",getProductsBuOrder(2)),
    createData(3,"12", 1768472833,"handled","",false,"no ice","HCM",getProductsBuOrder(3)),
    createData(4,"123", 1738472833,"handled","",true,"no ice","HUTECH",getProductsBuOrder(4)),
    createData(5,"12", 1738472833,"handled","",false,"no ice","",getProductsBuOrder(5)),
    createData(6,"124", 1788472833,"handled","",true,"no ice","UNIT",getProductsBuOrder(6)),
    createData(7,"124", 1708472833,"handled","",true,"no ice","",getProductsBuOrder(7)),
    createData(8,"12", 1738472833,"handled","",false,"no ice","",getProductsBuOrder(8)),
];



const SERVICE_PATH = "/before_orders"
class BeforeOrderService{

    
    //before order
    //role: user
    static async createBeforeOrder(tableNumber, isTakeAway, note, discountCode, products="{id}:S.{number};M.{number}<>{id}:S.{number};M.{number}"){
        let body = {
            "tableNumber":tableNumber,
            "isTakeAway":isTakeAway,
            "note":note,
            "discountCode":discountCode,
            "products":products
        }
        return await API.post(`${SERVICE_PATH}`,body);
    }
    //role: staff
    static async getAllBeforeOrdersPage(page=0,status="open/close"){//new to old
        let params = {
            "page":page,
            "status":status
        }
        return await API.get(`${SERVICE_PATH}/getAllBeforeOrders`,params);
    }
    //role: staff
    static async getAllBeforeOrders(){//new to old
        // return new Response("success",200,"",rowsInit);
        return await API.get(`${SERVICE_PATH}`,{});
    }
    static async getAllBeforeOrdersDetailsItems(id){//new to old
        // return new Response("success",200,"",rowsInit);
        return await API.get(`${SERVICE_PATH}/getBeforeOrderDetailsItems/${id}`,{});
    }
    //role: staff/user
    static async getBeforeOrderDetails(id){
        // let productRes=undefined;
        // rowsInit.forEach(product=>{
        //     id=parseInt(id);
        //     if(!productRes&&product.id===id){
        //         productRes = product;
        //     }
        // });
        // if(!productRes){
        //     return new Response("error",100,"Before order not found");
        // }else{
        //     return new Response("success",200,"",productRes);
        // }
        return await API.get(`${SERVICE_PATH}/details/${id}`,{});
    }
    //role: user
    static async getBeforeOrdersOfUser(){
        return await API.get(`${SERVICE_PATH}/getBeforeOrdersOfUser`,{});
    }
    //role: staff
    static async updateBeforeOrderStatus(id,status="waiting/handled"){
        let body = {
            "status":status
        }
        // return new Response("success",200,"",{});
        return await API.post(`${SERVICE_PATH}/ChangeStatus/${id}`,body);
    }
    //role: staff
    static async convertOrder(id){//id of before order
        // return new Response("success",200,"",{});
        //convert before order to order
        return await API.post(`${SERVICE_PATH}/convertToOrder/${id}`,{});
    }
}
export default BeforeOrderService;