import { useState } from "react";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function useLocalStorage<T>(key: string, initialValue: T) {
  if (!isBrowser()) return [initialValue, () => { }, () => { }] as const; // Fallback for non-browser environments

  const getStoredValue = (): T => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}



export default useLocalStorage;

// WHY TO USE try-catch while accessing or setting value in localstorage ?

// The try-catch blocks are crucial for ensuring the app doesn't break due to localStorage errors. These errors can happen due to:
// Browser restrictions (private mode, disabled storage).
// Quota limits (storage full).
// Corrupt or invalid JSON (prevents JSON.parse