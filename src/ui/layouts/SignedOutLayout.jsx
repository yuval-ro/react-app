/**
 * @file src/ui/layouts/SignedOutLayout.jsx
 */
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';


export default function SignedOutLayout(props) {
    return (
        <div className='bg-light vh-100'>
            <Container fluid='md' className='p-5'>
                <Outlet />
            </Container>
        </div>
    );
};