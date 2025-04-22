/**
 * @file src/Router.jsx
 */
import { useEffect } from 'react';
import { useLocation, useNavigate, Navigate, Routes, Route, Outlet } from 'react-router';
import LoginPage from 'src/ui/pages/LoginPage';
import MainPage from 'src/ui/pages/MainPage';
import AssignmentView from 'src/ui/views/AssignmentView';
import QuestionView from 'src/ui/views/QuestionView';
import SignedInLayout from 'src/ui/layouts/SignedInLayout';
import SignedOutLayout from 'src/ui/layouts/SignedOutLayout';
import { useServer } from 'src/ServerProvider';


export default function Router() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isSignedIn } = useServer();

    // Store the current path in session storage
    useEffect(() => {
        sessionStorage.setItem('currentPath', pathname);
    }, [pathname]);

    // Handle initial navigation based on sign-in state
    useEffect(() => {
        if (!isSignedIn) {
            navigate('/login');
        }
    }, [isSignedIn, navigate]);

    return (
        <Routes>
            <Route element={<SignedOutLayout />}>
                <Route path='/login' element={isSignedIn ? <Navigate to='/main' replace /> : <LoginPage />} />
                <Route path='*' element={<Navigate to='/login' replace />} />
            </Route>
            <Route element={<SignedInLayout />}>
                <Route path='/main' element={isSignedIn ? <Outlet /> : <Navigate to='/login' replace />}>
                    <Route index element={<MainPage />} />
                    <Route path=':aid' element={<AssignmentView />} />
                    <Route path=':aid/:qid' element={<QuestionView />} />
                    <Route path='*' element={<Navigate to='/main' replace />} />
                </Route>
            </Route>
        </Routes>
    );
}
