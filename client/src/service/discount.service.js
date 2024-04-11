import API from "./api";
import Response from "./response";



function createData(id,name, code, startTime, endTime,productId,discountPercent=0, discountMoney=0, description="") {
    return { id,name, code, startTime, endTime,productId,discountPercent, discountMoney, description };
}
const rowsInit = [
    createData(1,"discount 1","HUTECH11",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(2,"discount 2","HUTECH22",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(3,"discount 3","HUTECH33",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(4,"discount 4","HUTECH44",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(5,"discount 5","HUTECH55",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(6,"discount 6","HUTECH66",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(7,"discount 7","HUTECH77",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(8,"discount 8","HUTECH88",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(9,"discount 9","HUTECH99",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(10,"discount 10","HUTECH1010",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(11,"discount 11","HUTECH1111",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(12,"discount 12","HUTECH1212",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(13,"discount 13","HUTECH1313",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
    createData(14,"discount 14","HUTECH1414",Date.now(),Date.now()+1000*60*60*24*30,1,10,0,"description"),
];


const SERVICE_PATH = "/discount"
class DiscountService{
    static async createDiscount(name,code, description,  discountPercent, discountMoney, startTime, endTime, productId="1.4"){
        let body = {
            "name":name,
            "code":code,
            "description":description,
            "discountPercent":discountPercent,
            "discountMoney":discountMoney,
            "startTime":startTime,
            "endTime":endTime,
            "productId":productId
        }
        return new Response("success", 200,"",{newId:3});
        // return await API.post(`${SERVICE_PATH}/createDiscount`,body);
    }
    //role: admin
    static async getAllDiscounts(){
        return new Response("success",200,"",rowsInit);
        // return await API.get(`${SERVICE_PATH}/getAllDiscounts`,{});
    }
    //role: admin
    static async getDiscount(id){
        let productRes=undefined;
        rowsInit.forEach(product=>{
            id=parseInt(id);
            if(!productRes&&product.id===id){
                productRes = product;
            }
        });
        if(!productRes){
            return new Response("error",100,"Discount not found");
        }else{
            return new Response("success",200,"",productRes);
        }
        //return await API.get(`${SERVICE_PATH}/getDiscount/${id}`,{});
    }
    //role: admin
    static async deleteDiscount(id){
        return new Response("success", 200,"",{newId:3});
        // return await API.post(`${SERVICE_PATH}/deleteDiscount/${id}`,{});
    }
    //role: admin
    static async updateDiscount(id,code,name, description, discountPercent, discountMoney,startTime,endTime,productId="1.5"){
        let body = {
            "name":name,
            "description":description,
            "code":code,
            "discountPercent":discountPercent,
            "discountMoney":discountMoney,
            "startTime":startTime,
            "endTime":endTime,
            "productId":productId
        }
        return new Response("success", 200,"",{newId:3});
        //return await API.post(`${SERVICE_PATH}/updateDiscount/${id}`,body);
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