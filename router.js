class Response{
    status="success/error";
    statusCode=200;
    message="";
    data={};
    constructor(status,statusCode,message,data={}){
        this.status=status;
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
    }
    static success(message="",data={}){
        return new Response("success",200,message,data);
    }
    static error(message="",statusCode=500){
        return new Response("error",statusCode,message,statusCode);
    }
}

//User
function registerUser(sdt,password,name){
    return Response.success();
}
function loginUser(sdt,password,name){
    let jwt = "jwt";
    return Response.success("success",{jwt});
}
function logoutUser(){
    return Response.success();
}
function getAllUser(){
    let staffs = [];
    return Response.success("success",staffs);
}
function updateRole(id,role){
    return Response.success();
}
function searchUsers(search, filter:"name/sdt"){
    let users = [];
    return Response.success("success",users);
}

//table
//role: admin
function createTable(name,floor,tableNumber){
    let newTable = {};
    return Response.success("success",{newTable});
}
//role: admin
function deleteTable(id){
    return Response.success();
}
//role: admin
function updateTable(id,name,floor,tableNumber){
    return Response.success();
}
//role: admin/staff
function getTable(id){
    let table = {};
    return Response.success("success",table);
}
//role: staff
function updateStatusTable(id,status){
    return Response.success();
}
//role: admin/staff
function getAllTables(){
    let tables = [];
    return Response.success("success",tables);
}


//product
//role: admin
function createProduct(name,description,images:[file],sizes:'S.M.L'){
    let newTable = {};
    return Response.success("success",{newTable});
}
//role: admin
function deleteProduct(id){
    return Response.success();
}
//role: admin
function updateProduct(id,name,description,imgs:[file],sizes:'S.M.L'){
    let updateTable = {};
    return Response.success("success",{updateTable});
}

function getProduct(id){
    let product = {};
    return Response.success("success",product);
}

function getAllProducts(){
    let products = [];
    return Response.success("success",products);
}
function searchProducts(search){
    let products = [];
    return Response.success("success",products);
}

//discount
//role: admin
function createDiscount(name, description, code, discountPercent, discountMoney, startTime, endTime, productsId:[id]){
    let newDiscount = {};
    return Response.success("success",{newDiscount});
}
//role: admin
function getAllDiscounts(){
    let discounts = [];
    return Response.success("success",discounts);
}
//role: admin
function getDiscount(id){
    let discount = {};
    return Response.success("success",discount);
}
//role: admin
function deleteDiscount(id){
    return Response.success();
}
//role: admin
function updateDiscount(id,name, description,code, discountPercent, discountMoney,startTime,endTime,productsId:[id]){
    let updateDiscount = {};
    return Response.success("success",{updateDiscount});
}

function getDiscountsOfProductNow(id){
    let discounts = [];
    return Response.success("success",discounts);
}
function getDiscountByCode(code){
    let discount = {};
    return Response.success("success",discount);
}

//order
//role: staff
function createOrder(sdt, note, numberTable, discountCode, products:["{id}:S.{number};M.{number}"]){//vd:products=["2:S.3;L.1","5:M.3"]
    let order = {};
    return Response.success("success",order);
}
//role: staff
function getAllOrders(page=0,status="open/close"){//new to old
    let orders = [];
    return Response.success("success",orders);
}
//role: staff
function updateOrder(id, sdt, note, numberTable, discountCode, products:["{id}:S.{number};M.{number}"]){//vd:products=["2:S.3;L.1","5:M.3"]
    //only open order
    let order = {};
    return Response.success("success",order);
}
//role: staff
function closeOrder(id){
    return Response.success();
}
//role: staff
function findOrdersBySdt(sdt){
    let orders = [];
    return Response.success("success",orders);
}
//role: user/staff
function getOrderDetails(id){
    let order = {};
    return Response.success("success",order);
}
//role: user
function userGetOrders(){//of them
    let orders = [];
    return Response.success("success",orders);
}
//role: staff
function cancelOrder(id){
    return Response.success();
}


//before order
//role: user
function createBeforeOrder(tableNumber, isTakeAway, note, discountCode, products:["{id}:S.{number};M.{number}"]){
    let beforeOrder = {};
    return Response.success("success",beforeOrder);
}
//role: staff
function getAllBeforeOrders(page=0,status="open/close"){//new to old
    let beforeOrders = [];
    return Response.success("success",beforeOrders);
}
//role: staff/user
function getBeforeOrderDetails(id){
    let beforeOrder = {};
    return Response.success("success",beforeOrder);
}
//role: user
function getBeforeOrdersOfUser(){
    let beforeOrders = [];
    return Response.success("success",beforeOrders);
}
//role: staff
function updateBeforeOrderStatus(id,status="prepare/close"){
    return Response.success();
}
//role: staff
function convertOrder(id){//id of before order
    //convert before order to order
    let order = {};
    return Response.success("success",order);
}