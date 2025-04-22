/**
 * @file src/hooks/useAuthService.js
 */
import axios from 'axios';
import { useAxiosRequest } from 'src/hooks';


export const useAuthService = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_AUTH_BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });

    const signIn = useAxiosRequest((uname, pwd) => instance.post(
        '/signIn',
        { uname, pwd }
    ));
    const signOut = useAxiosRequest(() => instance.get('/signOut'));
    const validateRt = useAxiosRequest(() => instance.get('/validateRefreshToken'));
    const refreshAt = useAxiosRequest(() => instance.get('/refreshAccessToken'));
    
    return {
        instance,
        signIn,
        signOut,
        validateRt,
        refreshAt
    };
};