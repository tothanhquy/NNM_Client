import API from "./api";

const SERVICE_PATH = "/discount"
class DiscountService{
    static async createDiscount(name, description, code, discountPercent, discountMoney, startTime, endTime, productsId="1.4"){
        let body = {
            "name":name,
            "description":description,
            "code":code,
            "discountPercent":discountPercent,
            "discountMoney":discountMoney,
            "startTime":startTime,
            "endTime":endTime,
            "productsId":productsId
        }
        return await API.post(`${SERVICE_PATH}/createDiscount`,body);
    }
    //role: admin
    static async getAllDiscounts(){
        return await API.get(`${SERVICE_PATH}/getAllDiscounts`,{});
    }
    //role: admin
    static async getDiscount(id){
        return await API.get(`${SERVICE_PATH}/getDiscount/${id}`,{});
    }
    //role: admin
    static async deleteDiscount(id){
        return await API.post(`${SERVICE_PATH}/deleteDiscount/${id}`,{});
    }
    //role: admin
    static async updateDiscount(id,name, description,code, discountPercent, discountMoney,startTime,endTime,productsId="1.5"){
        let body = {
            "name":name,
            "description":description,
            "code":code,
            "discountPercent":discountPercent,
            "discountMoney":discountMoney,
            "startTime":startTime,
            "endTime":endTime,
            "productsId":productsId
        }
        return await API.post(`${SERVICE_PATH}/updateDiscount/${id}`,body);
    }
    
    static async getDiscountsOfProductNow(id){
        return await API.get(`${SERVICE_PATH}/getDiscountsOfProductNow/${id}`,{});
    }
    static async getDiscountByCode(code){
        let params = {
            "code":code
        }
        return await API.get(`${SERVICE_PATH}/getDiscountByCode`,params);
    }
    
}
export default DiscountService;