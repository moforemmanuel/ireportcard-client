export module DateUtil {

  export const setToRcDateString = (date: string): string => {
    // input format: yyyy-mm-dd
    // return format: dd-mm-yyyy hh:mm:ss
    let dateAsNum = Date.parse(date);
    if (isNaN(dateAsNum)) {
      dateAsNum = Date.parse(new Date().toString());
    }
    const dateObj = new Date(dateAsNum);
    const day = addZero(dateObj.getDate());
    const month = addZero(dateObj.getMonth() + 1);
    const year = dateObj.getFullYear();
    const hours = addZero(dateObj.getHours());
    const minutes = addZero(dateObj.getMinutes());
    const seconds = addZero(dateObj.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  export const toString = (date: Date): string => {
    const day = addZero(date.getDate());
    const month = addZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const addZero = (num: number): string => {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  }

}
