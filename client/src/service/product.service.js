import API from "./api";
import Response from "./response";

const SERVICE_PATH = "/product";
class ProductService{

    static async  createProduct(name,description,image,sizes='S:0.M:0.L:0'){
        let body = {
            "name":name,
            "description":description,
            "image":image,
            "sizes":sizes
        }
        return await API.post(`${SERVICE_PATH}/createProduct`,body);
    }
    //role: admin
    static async  deleteProduct(id){
        return await API.post(`${SERVICE_PATH}/deleteProduct/${id}`,{});
    }
    //role: admin
    static async  updateProduct(id,name,description,image,sizes='S:0.M:0.L:0'){
        let body = {
            "name":name,
            "description":description,
            "image":image,
            "sizes":sizes
        }
        return await API.post(`${SERVICE_PATH}/updateProduct/${id}`,body);
    }
    
    static async  getProduct(id){
        return await API.get(`${SERVICE_PATH}/getProduct/${id}`,{});
    }
    
    static async  getAllProducts(){
        function createData(id,name, image, sizes) {
            return { id,name, image, sizes };
          }
        const rowsInit = [
            createData(1,'Cupcake', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
            createData(2,'Cupcake2', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:30000;M:35000;L:40000"),
            createData(3,'Cupcake3', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
            createData(4,'Cupcake4', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
            createData(5,'Cupcake5', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
            createData(6,'Cupcake6', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
            createData(7,'Cupcake7', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
            createData(8,'Cupcake8', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
            createData(9,'Cupcake9', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000"),
          ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
        return new Response("success",200,"",rowsInit);
          
        // return await API.get(`${SERVICE_PATH}/getAllProducts`,{});
    }
    static async  searchProducts(search){
        let params = {
            "search":search
        }
        return await API.get(`${SERVICE_PATH}/searchProducts`,params);
    }
}
export default ProductService;