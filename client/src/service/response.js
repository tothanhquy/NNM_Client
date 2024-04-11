class Response{
    status="success";
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
        return new Response("error",statusCode,message,{});
    }
}
export default Response;