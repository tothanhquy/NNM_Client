import API from "./api";
import Response from "./response";

//status: waiting, preparing, completed, closed, cancelled
function createData(id,userId, time, sdt, status, tableNumber, numberProduct, totalBill, discountPayment, note, isTakeAway,products=[]) {
    return { id,userId, time, sdt, status, tableNumber, numberProduct, totalBill, discountPayment, note, isTakeAway,products};
}
const orderDetails=[
    {productId:1,orderId:1,size:"L",price:25000,number:2},
    {productId:1,orderId:1,size:"S",price:15000,number:1},
    {productId:5,orderId:1,size:"S",price:15000,number:3},
    {productId:5,orderId:2,size:"S",price:15000,number:1},
    {productId:2,orderId:2,size:"S",price:15000,number:1},
    {productId:2,orderId:3,size:"S",price:15000,number:1},
    {productId:2,orderId:5,size:"S",price:15000,number:1},
    {productId:3,orderId:4,size:"S",price:15000,number:1},
    {productId:3,orderId:4,size:"M",price:25000,number:2},
    {productId:3,orderId:4,size:"L",price:35000,number:3},
];
const getProductsBuOrder = function(orderId) {
    return orderDetails.filter(a=>a.orderId === orderId);
}

const rowsInit = [
    createData(1,"12", 17038472833,"987578654","waiting",12,13,170000,10000,"no ice",false,getProductsBuOrder(1)),
    createData(2,"1", 17138472833,"97578654","preparing",12,12,170000,10000,"no ice",false,getProductsBuOrder(2)),
    createData(3,"13", 17338472833,"8758654","completed",12,3,170000,10000,"no ice",true,getProductsBuOrder(3)),
    createData(4,"2", 17638472833,"98757654","closed",12,16,170000,10000,"no ice",false,getProductsBuOrder(4)),
    createData(5,"22", 17638472833,"98757654","canceled",32,13,1700000,100000,"no ice",false,getProductsBuOrder(5)),
];


const SERVICE_PATH = "/orders"
class OrderService{

    static async createOrder(sdt, note, isTakeAway, numberTable, discountCode, products="{id}:{size}:{number}"){//vd:products=["2:S.3;L.1","5:M.3"]
        let body = {
            "sdt":sdt||"",
            "note":note||"",
            "isTakeAway":isTakeAway,
            "numberTable":numberTable||"",
            "discountCode":discountCode||"",
            "products":products
        }
        // return new Response("success",200,"",{newId:3});
        return await API.post(`${SERVICE_PATH}`,body);
    }
    //role: staff
    // static async getAllOrders(page=0,status="open/close"){//new to old
    //     let params = {
    //         "page":page,
    //         "status":status
    //     }
    //     return await API.get(`${SERVICE_PATH}/getAllOrders`,params);
    // }
    static async getAllOrders(){//new to old
        // return new Response("success",200,"",rowsInit);
        return await API.get(`${SERVICE_PATH}`,{});
    }
    static async updateOrderStatus(id, status){//vd:products=["2:S.3;L.1","5:M.3"]
        //only open order
        let body = {
            "status":status
        }
        // return new Response("success",200,"",{});
        return await API.post(`${SERVICE_PATH}/changeStatus/${id}`,body);
    }
    //role: staff
    static async updateOrder(id, sdt, note, isTakeAway,status, numberTable, discountCode, products="{id}:S.{number};M.{number}<>{id}:S.{number};M.{number}"){//vd:products=["2:S.3;L.1","5:M.3"]
        //only open order
        let body = {
            "sdt":sdt||"",
            "note":note||"",
            "isTakeAway":isTakeAway,
            "status":status,
            "numberTable":numberTable,
            "discountCode":discountCode,
            "products":products
        }
        return await API.post(`${SERVICE_PATH}/update/${id}`,body);
    }
    //role: staff
    // static async closeOrder(id){
    //     return await API.post(`${SERVICE_PATH}/closeOrder/${id}`,{});
    // }
    //role: staff
    // static async findOrdersBySdt(sdt){
    //     let params = {
    //         "sdt":sdt
    //     }
    //     return await API.get(`${SERVICE_PATH}/findOrdersBySdt`,params);
    // }
    //role: user/staff
    static async getOrderDetails(id){
        // let productRes=undefined;
        // rowsInit.forEach(product=>{
        //     id=parseInt(id);
        //     if(!productRes&&product.id===id){
        //         productRes = product;
        //     }
        // });
        // if(!productRes){
        //     return new Response("error",100,"Order not found");
        // }else{
        //     return new Response("success",200,"",productRes);
        // }
        return await API.get(`${SERVICE_PATH}/details/${id}`,{});
    }
    static async getOrderDetailsProducts(id){
        return await API.get(`${SERVICE_PATH}/getOrderDetails/${id}`,{});
    }
    //role: user
    static async userGetOrders(){//of them
        return await API.get(`${SERVICE_PATH}/userGetOrders`,{});
    }
    //role: staff
    // static async cancelOrder(id){
    //     return await API.post(`${SERVICE_PATH}/cancelOrder/${id}`,{});
    // }
    
}
export default OrderService;