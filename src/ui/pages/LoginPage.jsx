/**
 * @file src/ui/pages/Login.jsx
 */
import { useEffect, useState } from 'react';
import { Card, Container, Alert, Col, Row } from 'react-bootstrap';
import SignInForm from 'src/ui/forms/SignInForm';
import { useServer } from 'src/ServerProvider';


export default function LoginPage() {
    const { signIn, signInError } = useServer();
    const [showAlert, setShowAlert] = useState(signInError !== null);
    useEffect(() => {
        if (signInError) {
            setShowAlert(true);
        }
    }, [signInError]);
    const renderErrorAlert = (signInError) => {
        // BUG Should be both dismissible but needs to reappear when signInError is updated
        if (signInError) {
            return (
                <Row className='mt-1'>
                <Col>
                    <Alert variant='danger' dismissible onClose={() => setShowAlert(false)} show={showAlert && signInError}>
                        {`Failed to sign in (${String(signInError)})`}
                    </Alert>
                </Col>
            </Row>
            );
        }
        else {
            return null;
        }
    };

    return (
        <>
            <Card className='p-3'>
                <Card.Title className='fs-2 text-center'>
                    Sign in
                </Card.Title>
                <Card.Body className='h-100'>
                    <SignInForm onSubmit={signIn} className='h-100'/>
                </Card.Body>
            </Card>
            {renderErrorAlert(signInError)}
        </>
    );
}