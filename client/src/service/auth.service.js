import API from "./api";
import JWT from "./jwt";


const SERVICE_PATH = "/auth";
class AuthService{
    static async registerUser(sdt,password,name){
        let body = {
            "sdt":sdt,
            "password":password,
            "name":name
        }
        return await API.post(`${SERVICE_PATH}/register`,body);
    }
    static async loginUser(sdt,password,name=""){
        let body = {
            "sdt":sdt,
            "password":password,
            "name":name
        }
        let response = await API.post(`${SERVICE_PATH}/login`,body);
        if(response.status==="success"){
            let jwt = response.data.jwt;
            JWT.set(jwt);
        }
        return response;
    }
    static async logoutUser(){
        let body = {}
        return await API.post(`${SERVICE_PATH}/logout`,body);
    }
}
export default AuthService;