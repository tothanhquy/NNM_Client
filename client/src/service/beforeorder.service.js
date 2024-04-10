import API from "./api";

const SERVICE_PATH = "/beforeorder"
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
        return await API.post(`${SERVICE_PATH}/createBeforeOrder`,body);
    }
    //role: staff
    static async getAllBeforeOrders(page=0,status="open/close"){//new to old
        let params = {
            "page":page,
            "status":status
        }
        return await API.get(`${SERVICE_PATH}/getAllBeforeOrders`,params);
    }
    //role: staff/user
    static async getBeforeOrderDetails(id){
        return await API.get(`${SERVICE_PATH}/getBeforeOrderDetails/${id}`,{});
    }
    //role: user
    static async getBeforeOrdersOfUser(){
        return await API.get(`${SERVICE_PATH}/getBeforeOrdersOfUser`,{});
    }
    //role: staff
    static async updateBeforeOrderStatus(id,status="prepare/close"){
        let body = {
            "status":status
        }
        return await API.post(`${SERVICE_PATH}/updateBeforeOrderStatus/${id}`,body);
    }
    //role: staff
    static async convertOrder(id){//id of before order
        //convert before order to order
        return await API.post(`${SERVICE_PATH}/convertOrder/${id}`,{});
    }
}
export default BeforeOrderService;