export function convertTimeToDateTime(time) {
    // var date;
    // if (typeof time === 'number') {
    //     date = new Date(time * 1000); // Nếu time là Unix timestamp, nhân với 1000 để chuyển đổi thành miligiây
    // } else {
    //     date = new Date(time); // Nếu time là một chuỗi ngày/tháng/năm, không cần nhân với 1000
    // }
    // return (new Date()).toLocaleString();
    // return (new Date(time)).toLocaleString();
    var date = new Date(time);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
}
export function convertTimeToDate(time) {
    // var date;
    // if (typeof time === 'number') {
    //     date = new Date(time * 1000); // Nếu time là Unix timestamp, nhân với 1000 để chuyển đổi thành miligiây
    // } else {
    //     date = new Date(time); // Nếu time là một chuỗi ngày/tháng/năm, không cần nhân với 1000
    // }
    var date = new Date(time);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
export function convertDateInputToTimestamp(dateString) {
    try{
        console.log(dateString);
        const dateParts = dateString.split("-"); // ["4", "10", "2020"]

        const year = parseInt(dateParts[2]);
        const month = parseInt(dateParts[1]); // Tháng bắt đầu từ 0 nên trừ đi 1
        const day = parseInt(dateParts[0]);

        const timestamp = Date.parse(year+"-"+month+"-"+day);
        console.log(dateParts);
        if(isNaN(timestamp))return undefined;

        return timestamp;
    }catch(err){
        return undefined;
    }
}
export function convertTimestampToDateInput(timeSpan) {
    const date = new Date(timeSpan);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + "-" + month + "-" + year;
}