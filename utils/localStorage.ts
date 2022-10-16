export const setToLocalStorage = (data: any, key: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    let temp = localStorage.getItem(key);
    // temp would be null if the key doesn't exist
    if (temp) {
      return JSON.parse(temp);
    }

    return temp;
  }
};
