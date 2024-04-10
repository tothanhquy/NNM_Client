import API from "./api";

const SERVICE_PATH = "/user";
class UserService{


    static async getAllUser(){
        return await API.get(`${SERVICE_PATH}/getAllUser`,{});
    }
    static async updateRole(id,role){
        let body = {
            "id":id,
            "role":role
        }
        return await API.post(`${SERVICE_PATH}/updateRole`,body);
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