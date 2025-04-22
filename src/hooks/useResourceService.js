/**
 * @file src/hooks/useResourceService.js
 */
import axios from 'axios';
import { useAxiosRequest } from 'src/hooks';


export const useResourceService = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_RESOURCE_BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });

    const uploadAndTest = useAxiosRequest((formData, params) => instance.post(
        '/uploadAndTest',
        formData,
        { params, headers: { 'Content-Type': 'multipart/form-data'}}
    ));
    const fetchAssignmentsData = useAxiosRequest((params) => instance.get(
        '/assignmentsData',
        { params }
    ));
    const fetchUserProfileData = useAxiosRequest(() => instance.get(
        '/userProfileData'
    ));

    return {
        instance,
        uploadAndTest,
        fetchAssignmentsData,
        fetchUserProfileData
    };
};