import { useState, useEffect } from "react";

const sessionStorage_Prefix = "Medicine-admin-"

function getStorageValue(key, defaultValue) {

    // getting stored value
    if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem(key);
        const initial = saved !== null ? JSON.parse(saved) : defaultValue;
        return initial;
    }
}

export const useSessionStorage = (key, defaultValue) => {

    const prefixedKey = sessionStorage_Prefix + key;

    const [value, setValue] = useState(() => {
        return getStorageValue(prefixedKey, defaultValue);
    });

    useEffect(() => {
        // storing input name
        sessionStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
};