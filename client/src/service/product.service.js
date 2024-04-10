import API from "./api";

const SERVICE_PATH = "/product"
class TableService{

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
        return await API.get(`${SERVICE_PATH}/getAllProducts`,{});
    }
    static async  searchProducts(search){
        let params = {
            "search":search
        }
        return await API.get(`${SERVICE_PATH}/searchProducts`,params);
    }
}
export default TableService;