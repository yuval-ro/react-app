/**
 * @file src/hooks/useSessionStorage.js
 */
import { useState } from 'react';


export const useSessionStorage = (key) => {
    const [valueState, setValueState] = useState(() => {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : value;
    });

    const setValue = (value) => {
        if (typeof value === 'function') {
            setValueState(prev => {
                const fn = value;
                const newValue = fn(prev);
                sessionStorage.setItem(key, JSON.stringify(newValue));
                return newValue;
            });
        }
        else {
            setValueState(value);
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    };
    const unsetValue = () => {
        setValueState(null);
        sessionStorage.removeItem(key);
    }

    return [ valueState, setValue, unsetValue ];
};