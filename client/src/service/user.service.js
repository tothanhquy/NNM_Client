import API from "./api";
import Response from "./response";

function createData(id,name, sdt, role,isBan) {
    return { id,name, sdt, role,isBan };
  }
const rowsInit = [
    createData(1,"user 1","011394","user",false),
    createData(2,"user 2","011394","user",true),
    createData(3,"user 3","011394","staff",false),
    createData(4,"user 4","011394","staff",false),
    createData(5,"user 5","011394","staff",true),
    createData(6,"user 6","011394","user",false),
    createData(7,"user 7","011394","staff",false),
    createData(8,"user 8","011394","user",false),
    createData(9,"user 9","011394","user",false),
    createData(10,"user 10","011394","user",false),
    createData(11,"user 11","011394","user",false),
    createData(12,"user 12","011394","user",false),
    createData(13,"user 13","011394","user",false),
];

const SERVICE_PATH = "/user";
class UserService{


    static async getAllUsers(){
        // return new Response("success",200,"",rowsInit);
        return await API.get(`${SERVICE_PATH}/getAllUser`,{});
    }
    static async updateRole(id,role){
        let body = {
            "id":id,
            "role":role
        }
        // return new Response("success",200,"",{});
        return await API.post(`${SERVICE_PATH}/updateRole`,body);
    }
    static async updateBan(id,isBan){
        let body = {
            "id":id,
            "isBan":isBan
        }
        // return new Response("success",200,"",{});
        return await API.post(`${SERVICE_PATH}/updateBan`,body);
    }
    static async searchUsers(search, filter){//filter:"name/sdt"
        let params = {
            "search":search,
            "filter":filter
        }
        return await API.get(`${SERVICE_PATH}/searchUsers`,params);
    }
}
export default UserService;