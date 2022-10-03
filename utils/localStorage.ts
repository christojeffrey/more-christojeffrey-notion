export const setToLocalStorage = (data: any, key: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};
