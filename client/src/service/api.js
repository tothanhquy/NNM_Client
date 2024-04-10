import Response from "./response";
import JWT from "./jwt";

const URL = "http://localhost";



class API{
    static async get(path,params){
        try{
            const queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');
          
            let fetchResponse = fetch(`${URL}/${path}?${queryString}`, {
                method: 'GET', // Phương thức HTTP
                headers: {
                'Content-Type': 'application/json', // Tiêu đề 'Content-Type'
                'Authorization': JWT.get() // Tiêu đề 'Authorization'
                // Bạn có thể thêm các tiêu đề khác tùy thuộc vào yêu cầu của API
                }
            })

            if (!fetchResponse.ok){
                throw new Error('Network response was not ok');
            }
            let responseJson = await fetchResponse.json();

            let response = JSON.parse(responseJson);
            
            return new Response(response.status,response.statusCode,response.message,response.data);
        }catch(err){
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
          
            let fetchResponse = fetch(`${URL}/${path}`, {
                method: 'POST', // Phương thức HTTP
                headers: {
                'Authorization': JWT.get() // Tiêu đề 'Authorization'
                // Bạn có thể thêm các tiêu đề khác tùy thuộc vào yêu cầu của API
                },
                body: formData
            })

            if (!fetchResponse.ok){
                throw new Error('Network response was not ok');
            }
            let responseJson = await fetchResponse.json();

            let response = JSON.parse(responseJson);
            
            return new Response(response.status,response.statusCode,response.message,response.data);
        }catch(err){
            return Response.error("Lỗi hệ thống",500);
        }
    }

}


export default API;