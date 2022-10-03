export const setToLocalStorage = (data: any, key: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    let temp = localStorage.getItem(key);
    if (temp) {
      return JSON.parse(temp);
    }
    return temp;
  }
};
