import Response from "./response";
import JWT from "./jwt";

const URL = "http://localhost:8081/api";



class API{
    static async get(path,params){
        try{
            const queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');
          
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": JWT.get()
                  },
                redirect: "follow"
            };

            const responseFetch = await fetch(`${URL}${path}?${queryString}`, requestOptions);
            const text = await responseFetch.text();
            console.log(text);
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
            const formData = new FormData();

            // Lặp qua các cặp khóa/giá trị trong đối tượng và thêm chúng vào FormData
            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    formData.append(key, body[key]);
                }
            }
            const requestOptions = {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": JWT.get()
                  },
                redirect: "follow"
            };

            const responseFetch = await fetch(`${URL}${path}`, requestOptions);
            const text = await responseFetch.text();
            console.log(text);
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