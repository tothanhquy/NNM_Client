export function convertTimeToDateTime(time) {
    var date = new Date(time);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
}
export function convertTimeToDate(time) {
    var date = new Date(time);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
export function convertDateInputToTimestamp(dateString) {
    try{
        const dateParts = dateString.split("-"); // ["4", "10", "2020"]

        const year = parseInt(dateParts[2]);
        const month = parseInt(dateParts[1]) - 1; // Tháng bắt đầu từ 0 nên trừ đi 1
        const day = parseInt(dateParts[0]);

        const timestamp = Date.parse(year+"-"+month+"-"+day);
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