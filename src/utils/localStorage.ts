 export function saveToLocalStorage(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("LocalStorage write failed:", error);
      return false;
    }
  }

  export function getFromLocalStorage(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("LocalStorage read failed:", error);
      return null;
    }
  }