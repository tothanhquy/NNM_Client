import API from "./api";
import JWT from "./jwt";
import Response from "./response";


const SERVICE_PATH = "/auth";
class AuthService{
    static async registerUser(sdt,password,name,email){
        let body = {
            "sdt":sdt,
            "password":password,
            "name":name,
            "email":email,
            "role": "user"
        }
        return await API.post(`${SERVICE_PATH}/register`,body);
    }
    static async loginUser(email,password){
        // return new Response("success",200,"",{role:"admin"});

        let body = {
            "email":email,
            "password":password
        }
        let response = await API.post(`${SERVICE_PATH}/login`,body);
        if(response.status==="success"){
            let jwt = response.data.token;
            JWT.set(jwt);
        }
        return response;
    }
    static async logoutUser(){
        let body = {}
        // return new Response("success",200,"",{role:"admin"});
        return await API.post(`${SERVICE_PATH}/logout`,body);
    }
    static async checkLogin(){
        let body = {}
        // return new Response("success",200,"",{role:"admin"});
        return await API.post(`${SERVICE_PATH}/checkLogin`,body);
    }
}
export default AuthService;