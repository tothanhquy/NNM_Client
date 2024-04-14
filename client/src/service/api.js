import Response from "./response";
import JWT from "./jwt";

const URL = "http://localhost:8081/Laravel-jwt-auth/public";
const API_URL = URL+"/api";
const RESOURCE_URL = URL+"/storage";

class API{
    static IMAGE_URL = RESOURCE_URL+"/images/";
    static async get(path,params){
        try{
            const queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');

            console.log(queryString);
          
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JWT.get()}`
                  },
                redirect: "follow"
            };

            const responseFetch = await fetch(`${API_URL}${path}?${queryString}`, requestOptions);
            const text = await responseFetch.text();
            const response = JSON.parse(text);
            console.log(response);
                
            return new Response(response.status,response.statusCode,response.message,response.data);
        }catch(err){
            console.log(err);
            return Response.error("Lỗi hệ thống",500);
        }
    }
    static async delete(path){
        try{
            
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JWT.get()}`
                  },
                redirect: "follow"
            };

            const responseFetch = await fetch(`${API_URL}${path}?`, requestOptions);
            const text = await responseFetch.text();
            const response = JSON.parse(text);
            console.log(response);
                
            return new Response(response.status,response.statusCode,response.message,response.data);
        }catch(err){
            console.log(err);
            return Response.error("Lỗi hệ thống",500);
        }
    }
    static async post(path,body){
        try{
            let formData = new FormData();
            Object.keys(body).forEach(key => {
                formData.append(key, body[key]);
            });
            console.log(Object.fromEntries(formData.entries()));
            const requestOptions = {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${JWT.get()}`
                  },
                redirect: "follow"
            };

            const responseFetch = await fetch(`${API_URL}${path}`, requestOptions);
            const text = await responseFetch.text();
            const response = JSON.parse(text);
            console.log(response);
                
            return new Response(response.status,response.statusCode,response.message,response.data);
        }catch(err){
            console.log(err);
            return Response.error("Lỗi hệ thống",500);
        }
        
    }

}


export default API;