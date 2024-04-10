import API from "./api";

const SERVICE_PATH = "/order"
class OrderService{

    static async createOrder(sdt, note, numberTable, discountCode, products="{id}:S.{number};M.{number}<>{id}:S.{number};M.{number}"){//vd:products=["2:S.3;L.1","5:M.3"]
        let body = {
            "sdt":sdt,
            "note":note,
            "numberTable":numberTable,
            "discountCode":discountCode,
            "products":products
        }
        return await API.post(`${SERVICE_PATH}/createOrder`,body);
    }
    //role: staff
    static async getAllOrders(page=0,status="open/close"){//new to old
        let params = {
            "page":page,
            "status":status
        }
        return await API.get(`${SERVICE_PATH}/getAllOrders`,params);
    }
    //role: staff
    static async updateOrder(id, sdt, note, numberTable, discountCode, products="{id}:S.{number};M.{number}<>{id}:S.{number};M.{number}"){//vd:products=["2:S.3;L.1","5:M.3"]
        //only open order
        let body = {
            "sdt":sdt,
            "note":note,
            "numberTable":numberTable,
            "discountCode":discountCode,
            "products":products
        }
        return await API.post(`${SERVICE_PATH}/updateOrder/${id}`,body);
    }
    //role: staff
    static async closeOrder(id){
        return await API.post(`${SERVICE_PATH}/closeOrder/${id}`,{});
    }
    //role: staff
    static async findOrdersBySdt(sdt){
        let params = {
            "sdt":sdt
        }
        return await API.get(`${SERVICE_PATH}/findOrdersBySdt`,params);
    }
    //role: user/staff
    static async getOrderDetails(id){
        return await API.get(`${SERVICE_PATH}/getOrderDetails/${id}`,{});
    }
    //role: user
    static async userGetOrders(){//of them
        return await API.get(`${SERVICE_PATH}/userGetOrders`,{});
    }
    //role: staff
    static async cancelOrder(id){
        return await API.post(`${SERVICE_PATH}/cancelOrder/${id}`,{});
    }
    
}
export default OrderService;