import Cookies from 'js-cookie';


class Cookie{
    static set(name, value){
        Cookies.set(name, value,{ expires: 30*6 });
    } 
    static get(name){
        return Cookies.get(name);
    }
    static remove(name){
        return Cookies.remove(name);
    }
}

export default Cookie;
