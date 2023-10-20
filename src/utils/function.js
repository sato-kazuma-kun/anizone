"use client"

export function checkLocalStorage(key, defaultValue) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const storedValue = localStorage.getItem(key);
        return storedValue || defaultValue;
    }
    return defaultValue;
}
