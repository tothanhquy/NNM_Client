import API from "./api";
import Response from "./response";

const SERVICE_PATH = "/products";



function createData(id,name, image, sizes,description="") {
    return { id,name, image, sizes,description };
  }
const rowsInit = [
    createData(1,'Cupcake', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
    createData(2,'Cupcake2', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:30000;M:35000;L:40000","description"),
    createData(3,'Cupcake3', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
    createData(4,'Cupcake4', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
    createData(5,'Cupcake5', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
    createData(6,'Cupcake6', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
    createData(7,'Cupcake7', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
    createData(8,'Cupcake8', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
    createData(9,'Cupcake9', "https://media-cdn.tripadvisor.com/media/photo-s/0e/96/7f/97/coffe-latte-100-arabica.jpg", "S:20000;M:25000;L:30000","description"),
  ];

class ProductService{

    static async  createProduct(name,description,image,sizes='S:0;M:0;L:0'){
        let body = {
            "name":name,
            "description":description,
            "img":image,
            "sizes":sizes
        }
        // return new Response("success", 200,"",{newId:3});
        return await API.postWithFile(`${SERVICE_PATH}`,body);
    }
    //role: admin
    static async  deleteProduct(id){
        return await API.delete(`${SERVICE_PATH}/${id}`,{});
    }
    //role: admin
    static async  updateProduct(id,name,description,image,sizes='S:0;M:0;L:0'){
        let body = {
            "name":name,
            "description":description,
            "img":image,
            "sizes":sizes
        }
        // return new Response("success", 200,"",{newId:3});
        return await API.postWithFile(`${SERVICE_PATH}/${id}`,body);
    }
    
    static async getProduct(id){

        return await API.get(`${SERVICE_PATH}/${id}`,{});
        // let productRes=undefined;
        // rowsInit.forEach(product=>{
        //     id=parseInt(id);
        //     if(!productRes&&product.id===id){
        //         productRes = product;
        //     }
        // });
        // if(!productRes){
        //     return new Response("error",100,"Product not found");
        // }else{
        //     return new Response("success",200,"",productRes);
        // }
    }
    
    static async  getAllProducts(){
        // return new Response("success",200,"",rowsInit);
          
        return await API.get(`${SERVICE_PATH}`,{});
    }
    static async  searchProducts(search){
        let params = {
            "search":search
        }
        return await API.get(`${SERVICE_PATH}/searchProducts`,params);
    }
}
export default ProductService;