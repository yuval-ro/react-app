/**
 * @file src/hooks/useAxiosRequest.js
 */
import { useState, useCallback } from 'react';

export const useAxiosRequest = (fetcher) => {
    const [res, setRes] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
        
    const send = useCallback(async (...args) => {
        setLoading(true);
        try {
            const response = await fetcher(...args);
            setRes(response);
            setError(null);
            return { ok: true, ...response };
        }
        catch (err) {
            setRes(err.res);
            setError(err);
            return { ok: false, ...err };
        }
        finally {
            setLoading(false);
        }
    }, [fetcher]);

    return {
        res,
        loading,
        error,
        send,
    };
};
