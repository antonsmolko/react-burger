export const ls = {
  get(key, defaultValue) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      throw new Error(`[Local Storage warn]: Ошибка получения значения по ключу "${key}": ${error}`);
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(`[Local Storage warn]: Ошибка сохранения значения по ключу "${key}": ${error}`);
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      throw new Error(`[Local Storage warn]: Ошибка удаления ключу "${key}": ${error}`);
    }
  }
};
