import API from "./api";

const SERVICE_PATH = "/table"
class TableService{


    static async  createTable(name,floor,tableNumber){
        let body = {
            "name":name,
            "floor":floor,
            "tableNumber":tableNumber
        }
        return await API.post(`${SERVICE_PATH}/createTable`,body);
    }
    //role: admin
    static async  deleteTable(id){
        let body = {}
        return await API.post(`${SERVICE_PATH}/deleteTable/${id}`,body);
    }
    //role: admin
    static async  updateTable(id,name,floor,tableNumber){
        let body = {
            "name":name,
            "floor":floor,
            "tableNumber":tableNumber
        }
        return await API.post(`${SERVICE_PATH}/updateTable/${id}`,body);
    }
    //role: admin/staff
    static async  getTable(id){
        return await API.get(`${SERVICE_PATH}/getTable/${id}`,{});
    }
    //role: staff
    static async  updateStatusTable(id,status){
        let body = {
            "status":status
        }
        return await API.post(`${SERVICE_PATH}/updateStatusTable/${id}`,body);
    }
    //role: admin/staff
    static async  getAllTables(){
        return await API.get(`${SERVICE_PATH}/getAllTables`,{});
    }
}
export default TableService;