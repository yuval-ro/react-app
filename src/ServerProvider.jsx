/**
 * @file src/ServerProvider.jsx
 */
import { createContext, useEffect, useContext } from 'react';
import {
    useSessionStorage,
    useAuthService,
    useResourceService
} from 'src/hooks';


export const ServerContext = createContext();
export const useServer = () => useContext(ServerContext);

export default function ServerProvider({ children }) {
    const [assignmentsData, setAssignmentsData, clearAssignmentsData] = useSessionStorage('assignmentsData');
    const [userProfileData, setUserProfileData, clearUserProfileData] = useSessionStorage('userProfileData');
    const auth = useAuthService();
    const resource = useResourceService();
    const isSignedIn = (userProfileData && userProfileData !== null);
    const hasAppData = assignmentsData && userProfileData;

    const fetchAndLoadAppData = async () => {
        const uri = resource.instance.getUri().slice(0, -1);
        let res = await resource.fetchAssignmentsData.send();
        if (res.ok) {
            let assignments = res.data;
            assignments = assignments.map(a => {
                const instructions = `${uri}/fileServer/instructions/${a.aid}.md`;
                const questions = a.questions.map(q =>
                    ({
                        ...q,
                        anchor: `${instructions}#${q.anchor}`
                    })
                );
                return {
                    ...a,
                    questions,
                    instructions
                };
            });
            setAssignmentsData(assignments);
        }
        else {
            console.error(res.error);
        }
        res = await resource.fetchUserProfileData.send();
        if (res.ok) {
            let userProfile = res.data;
            userProfile.avatarUrl = `${uri}/fileServer/avatars/${userProfile?.uname}`;
            setUserProfileData(userProfile);
        }
        else {
            console.error(res.error);
        }
    };

    const ejectAppData = () => {
        clearAssignmentsData();
        clearUserProfileData();
    }

    const signIn = async (uname, pwd) => {
        let res = await auth.signIn.send(uname, pwd);
        if (res.ok) {
            await fetchAndLoadAppData();
            return true;
        }
        return false;
    };

    const signOut = async () => {
        let res = await auth.signOut.send();
        if (res.ok) {
            ejectAppData();
        }
    };

    const uploadAndTest = async (aid, qid, fileList) => {
        if (fileList.length < 1) {
            throw 'Missing files';
        }
        const formData = new FormData();
        Array.from(fileList).forEach(f => { formData.append('files', f)});
        // Upload and test
        await resource.uploadAndTest.send(formData, { aid, qid });
        // Trigger appData refresh
        await fetchAndLoadAppData();
    };



    const getUserProfileData = () => userProfileData;

    const getAssignmentList = () => assignmentsData;

    const getAssignment = (aid) => assignmentsData?.find(a => a.aid === aid);

    const getQuestion = (aid, qid) => {
        const assignment = getAssignment(aid);
        const question = assignment?.questions?.find(q => q.qid === qid);
        return question;
    };

    useEffect(() => {
        (async () => {
            const res = await auth.validateRt.send();
            if (res.ok && !hasAppData) {
                await fetchAndLoadAppData();
            }
            else if (!res.ok && isSignedIn) {
                // Refresh token is no longer valid => sign out.
                ejectAppData();
            }
        })();
    }, []);

    // NOTE Token expiration mechanism
    resource.instance.interceptors.response.use(
        (res) => res,
        async (error) => {
            if (error.status === 401) {
                // If refresh WAS NOT attempted, we try to refresh the AT using RT.
                if (!auth.refreshAt.error) {
                    let res = auth.refreshAt.send();
                    if (res.ok) {
                        return axiosInstance(error.config);
                    }
                }
                // Otherwise, refresh WAS attempted, failed because of invalid RT, so we sign out.
                await signOut();
                return Promise.reject(error);
            }
        }
    );

    return (
        <ServerContext.Provider value={{
            signIn,
            signOut,
            signInError: auth.signIn.error,
            uploadAndTest,
            isSignedIn,
            getUserProfileData,
            getAssignmentList,
            getAssignment,
            getQuestion,
        }}>
            { children }
        </ServerContext.Provider>
    );
}