import API from "./api";
import Response from "./response";

function createData(id,name, floor, tableNumber) {
    return { id,name, floor, tableNumber };
  }
const rowsInit = [
    createData(1,"table 1",1,1),
    createData(2,"table 2",1,2),
    createData(3,"table 3",1,3),
    createData(4,"table 4",1,4),
    createData(5,"table 5",2,5),
    createData(6,"table 6",2,6),
    createData(7,"table 7",2,7),
    createData(8,"table 8",2,8),
    createData(9,"table 9",3,9),
    createData(10,"table 10",3,10),
    createData(11,"table 11",3,11),
];


const SERVICE_PATH = "/table"
class TableService{
    static async  createTable(name,floor,tableNumber){
        let body = {
            "name":name,
            "floor":floor,
            "tableNumber":tableNumber
        }
        return new Response("success", 200,"",{newId:3});
        //return await API.post(`${SERVICE_PATH}/createTable`,body);
    }
    //role: admin
    static async  deleteTable(id){
        let body = {}
        return new Response("success", 200,"",{newId:3});
        // return await API.post(`${SERVICE_PATH}/deleteTable/${id}`,body);
    }
    //role: admin
    static async  updateTable(id,name,floor,tableNumber){
        let body = {
            "name":name,
            "floor":floor,
            "tableNumber":tableNumber
        }
        return new Response("success", 200,"",{newId:3});
        // return await API.post(`${SERVICE_PATH}/updateTable/${id}`,body);
    }
    //role: admin/staff
    static async  getTable(id){
        // return await API.get(`${SERVICE_PATH}/getTable/${id}`,{});

        let productRes=undefined;
        rowsInit.forEach(product=>{
            id=parseInt(id);
            if(!productRes&&product.id===id){
                productRes = product;
            }
        });
        if(!productRes){
            return new Response("error",100,"Table not found");
        }else{
            return new Response("success",200,"",productRes);
        }
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
        return new Response("success",200,"",rowsInit);
        // return await API.get(`${SERVICE_PATH}/getAllTables`,{});
    }
}
export default TableService;