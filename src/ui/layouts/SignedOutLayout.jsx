/**
 * @file src/ui/layouts/SignedOutLayout.jsx
 */
import { Outlet } from 'react-router';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { FaGithub, FaIdBadge, FaMarkdown } from 'react-icons/fa';


export default function SignedOutLayout(props) {
    return (
        <div className='bg-light vh-100'>
            <Container fluid='md' className='p-5'>
                <Outlet />
            </Container>
            <Navbar className='text-muted'>
                <Container className='d-flex flex-row justify-content-center'>
                    <Nav>
                        <Nav.Link
                            href='https://github.com/yuval-ro/react-app'
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaGithub className='me-1' />
                            <span>Source Code</span>
                        </Nav.Link>
                        <Nav.Link
                            href='https://blog.yuvalro.com'
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaIdBadge className='me-1' />
                            <span>Blog</span>
                        </Nav.Link>
                        <Nav.Link
                            href='https://chromewebstore.google.com/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk'
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaMarkdown className='me-1' />
                            <span>MarkDown Viewer</span>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};