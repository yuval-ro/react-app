/**
 * @file src/ui/pages/MainPage.jsx
 */
import { useServer } from 'src/ServerProvider';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router';


const AssignmentListItem = (props) => (
    <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
    >
        <div className="ms-2 me-auto">
            <div className="fw-bold">
                <Link to={`/main/${props?.aid}`} className='fw-bold'>
                    {props?.title}
                </Link>
            </div>
            <div>
                {(new Date(props?.deadline)).toLocaleString()}
            </div>
        </div>
    </ListGroup.Item>
)

export default function MainPage() {
    const { getAssignmentList } = useServer();
    const assignments = getAssignmentList();
    return (
        <>
            <ListGroup as='ol' numbered>
            { assignments?.map((a, idx) => <AssignmentListItem key={idx} {...a} />) }
            </ListGroup>
        </>
    );
};