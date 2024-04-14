import API from "./api";
import Response from "./response";

function createData(id,name, floor, tableNumber,status) {
    return { id,name, floor, tableNumber,status };
  }
const rowsInit = [
    createData(1,"table 1",1,1,"open"),
    createData(2,"table 2",1,2,"close"),
    createData(3,"table 3",1,3,"open"),
    createData(4,"table 4",1,4,"open"),
    createData(5,"table 5",2,5,"close"),
    createData(6,"table 6",2,6,"open"),
    createData(7,"table 7",2,7,"close"),
    createData(8,"table 8",2,8,"close"),
    createData(9,"table 9",3,9,"close"),
    createData(10,"table 10",3,10,"close"),
    createData(11,"table 11",3,11,"close"),
];


const SERVICE_PATH = "/tables"
class TableService{
    static async  createTable(name,floor,tableNumber){
        let body = {
            "name":name,
            "floor":floor,
            "tableNumber":tableNumber,
            "status":"close"
        }
        // return new Response("success", 200,"",{newId:3});
        return await API.post(`${SERVICE_PATH}`,body);
    }
    //role: admin
    static async  deleteTable(id){
        let body = {}
        // return new Response("success", 200,"",{newId:3});
        return await API.delete(`${SERVICE_PATH}/${id}`,body);
    }
    //role: admin
    static async  updateTable(id,name,floor,tableNumber){
        let body = {
            "name":name,
            "floor":floor,
            "tableNumber":tableNumber
        }
        // return new Response("success", 200,"",{newId:3});
        return await API.post(`${SERVICE_PATH}/updateTable/${id}`,body);
    }
    //role: admin/staff
    static async  getTable(id){
        return await API.get(`${SERVICE_PATH}/${id}`,{});

        // let productRes=undefined;
        // rowsInit.forEach(product=>{
        //     id=parseInt(id);
        //     if(!productRes&&product.id===id){
        //         productRes = product;
        //     }
        // });
        // if(!productRes){
        //     return new Response("error",100,"Table not found");
        // }else{
        //     return new Response("success",200,"",productRes);
        // }
    }
    //role: staff
    static async  updateStatusTable(id,status){
        let body = {
            "status":status
        }
        // return new Response("success",200,"",{});
        return await API.post(`${SERVICE_PATH}/updateStatusTables/${id}`,body);
    }
    //role: admin/staff
    static async  getAllTables(){
        // return new Response("success",200,"",rowsInit);
        return await API.get(`${SERVICE_PATH}`,{});
    }
}
export default TableService;