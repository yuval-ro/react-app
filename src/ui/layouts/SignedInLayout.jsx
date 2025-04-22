/**
 * @file src/ui/layouts/SignedInLayout.jsx
 */
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router';
import MainNavbar from 'src/ui/nav/MainNavbar';
import { useServer } from 'src/ServerProvider';


export default function SignedInLayout(props) {
    const { isSignedIn, getUserProfileData, signOut } = useServer();
    const fluidBreakpoint = 'md';
    return (
        <div>
            <MainNavbar
                isSignedIn={isSignedIn}
                userProfile={getUserProfileData()}
                onSignOut={signOut}
                fluid={fluidBreakpoint}
            />
            <Container fluid={fluidBreakpoint}>
                <Outlet />
            </Container>
        </div>
    );
};