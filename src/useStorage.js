import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
    // getting stored value
    const saved = localStorage.getItem(key);
    const savedValue = JSON.parse(saved);
    return savedValue || defaultValue;
}

export const useStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}