function setCookie(cookieName, cookieValue, expiryDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000)); // Tính toán thời gian hết hạn
    const expires = "expires=" + date.toUTCString();
    const encodedCookieValue = encodeURIComponent(cookieValue); // Mã hóa giá trị cookie
    console.log(encodedCookieValue);
    // document.cookie = cookieValue;
    document.cookie = cookieName + "=" + encodedCookieValue + ";" + expires + ";path=/"; // Thiết lập cookie
}
  
  // Hàm để lấy giá trị của cookie
function getCookie(cookieName) {
    // return document.cookie; 
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return decodeURIComponent(cookie.substring(name.length, cookie.length)); // Giải mã giá trị cookie
        }
    }
    return "";
}


export function getCartItems(){
    try{
        const cartItemStr = getCookie("cartItems");
        if(!cartItemStr||cartItemStr===""){
            return [];
        }
        let cartItems = cartItemStr.split(".").map(itemStr=>{
            let split = itemStr.split(":");
            return {productId:split[0],size:split[1],number:parseInt(split[2])};
        });
    
        return cartItems;
    }catch(e){
        return [];
    }
}
export function setCartItems(cartItems){
    try{
        let cartItemsStr = cartItems.map(item=>`${item.productId}:${item.size}:${item.number}`).join('.');
        setCookie("cartItems",cartItemsStr,30);
    }catch(e){
        return false;
    }
}