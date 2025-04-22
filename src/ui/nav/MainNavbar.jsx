import { useState } from 'react';
import { Nav, Image, Dropdown, Container } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router';

const CustomToggle = (props) => {
    const [showRing, setShowRing] = useState(false);
    return (
        <Image
            ref={props?.ref}
            onClick={(e) => {
                e.preventDefault();
                props?.onClick(e);
                setShowRing(prev => !prev);
            }}
            onBlur={() => setShowRing(false)}
            className={showRing ? 'focus-ring' : ''}
            tabIndex={0} // Make the div focusable
            src={props?.avatarUrl}
            style={{ height: '2rem', cursor: 'pointer'}}
            roundedCircle
        />
    );
};

export default function MainNavbar({ userProfile, onSignOut, fluid }) {
    const params = useParams();
    const { pathname } = useLocation();

    const renderBreadcrumbs = (pathname, params) => {
        const base = pathname.split('/').at(1);
        const vals = [base, ...Object.values(params)];
        return vals.map((v, idx) => 
            <Nav.Item key={idx} className='font-monospace'>
                <Link as={Nav.Link} to={vals.slice(0, idx + 1).join('/')} style={{ marginRight: 4, textDecoration: 'none' }}>
                    /{v}
                </Link>
            </Nav.Item>
        );
    };

    return (
        <Nav className=' bg-light'>
            <Container
                fluid={fluid}
                className='d-flex flex-row justify-content-start align-items-center'
                style={{ height: '3.5rem' }}
            >
                {renderBreadcrumbs(pathname, params)}
                <Dropdown align='end' className='ms-auto' autoClose='outside'>
                    <Dropdown.Toggle as={(props) => <CustomToggle {...props} avatarUrl={userProfile?.avatarUrl} />} />
                    <Dropdown.Menu>
                        <Dropdown.ItemText className='fw-bold'>{userProfile?.displayName}</Dropdown.ItemText>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => onSignOut()}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Nav>
    );
}
