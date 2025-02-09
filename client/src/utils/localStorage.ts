// Set an item in local storage
export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

// Get an item from local storage
export const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

// Remove an item from local storage
export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

// Clear all items from local storage
export const clearStorage = (): void => {
  localStorage.clear();
};