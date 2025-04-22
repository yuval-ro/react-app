/**
 * @file src/hooks/useCurrentPath.js
 */
import { useLocation } from 'react-router';


export const useCurrentPath = () => {
    const { pathname } = useLocation();
    const arr = pathname.split('/');
    const res = {};
    if (arr.at(1)) {
        res.page = arr.at(1);
    }
    if (arr.at(2)) {
        res.exid = arr.at(2);
    }
    if (arr.at(3)) {
        res.qid = arr.at(3);
    }
    return res;
};