/**
 * @file src/ui/pages/AssignmentView.jsx
 */
import { Link, useParams } from 'react-router';
import { useServer } from 'src/ServerProvider';
import { Row, Col, Badge, ListGroup } from 'react-bootstrap';


const QuestionListItem = (props) => {
    const renderDirectiveText = (type) => {
        switch (type) {
            case 'file':
                return 'File upload - Implement the required code and submit for testing.'
            case 'text':
                return 'Text - Answer as required in the text box.'
            default:
                throw 'NOT IMPLEMENTED';
        }
    };

    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <Link to={`/main/${props?.aid}/${props?.qid}`} className='fw-bold'>
                        {props?.title}
                    </Link>
                </div>
                <div>
                    {renderDirectiveText(props?.submissionType)}
                </div>
                <div className='fst-italic'>
                    {props?.points} Points
                </div>
            </div>
        </ListGroup.Item>
    )
};

export default function AssignmentView(props) {
    const { getAssignment } = useServer();
    const { aid } = useParams();
    const { title, deadline, instructions, questions, tags } = getAssignment(aid);
    
    // Render tags using React Bootstrap Badge
    const renderTags = (tags) => (
        <>
            {tags.map((tag, idx) => (
                <Badge key={idx} pill variant="secondary" className="me-1">
                    {tag}
                </Badge>
            ))}
        </>
    );

    return (
        <>
            <div className='fs-3 fw-bold'>
                <Col>
                
                </Col>
                {title}
            </div>
            <Row className="mb-3">
                <Col>
                    <div>{tags.length > 0 ? renderTags(tags) : 'No tags available'}</div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                <div className='fs-5 fw-bold'>Deadline</div>
                    <div>{(new Date(deadline)).toLocaleString('he-IL')}</div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <div className='fs-5 fw-bold'>Instructions</div>
                    <Link to={instructions} target='_blank' rel='noopener noreferrer'>
                        Link
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='fs-5 fw-bold'>Submission</div>
                    <ListGroup as='ol' numbered>
                        { questions?.map((item, idx) => <QuestionListItem key={idx} aid={aid} {...item} />) }
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
}
