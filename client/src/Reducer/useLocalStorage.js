import { useState, useEffect } from "react";

const localStorage_Prefix = "Medicine-Shop-"

function getStorageValue(key, defaultValue) {

    // getting stored value
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        const initial = saved !== null ? JSON.parse(saved) : defaultValue;
        return initial;
    }
}

export const useLocalStorage = (key, defaultValue) => {

    const prefixedKey = localStorage_Prefix + key;

    const [value, setValue] = useState(() => {
        return getStorageValue(prefixedKey, defaultValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
};