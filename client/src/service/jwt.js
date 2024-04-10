import Cookie from "./cookie";

class JWT{
    static get(){
        return Cookie.get("jwt")||"";
    }
    static set(jwt){
        Cookie.set("jwt",jwt);
    }
    static remove(){
        Cookie.remove("jwt");
    }
}
export default JWT;