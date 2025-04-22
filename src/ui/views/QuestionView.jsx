/**
 * @file src/ui/pages/Question.jsx
 */
import { useParams, Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import FileUploadForm from 'src/ui/forms/FileUploadForm';
import { useServer } from 'src/ServerProvider';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa'; // Importing icons


export default function QuestionView() {
    const { aid, qid } = useParams();
    const { getQuestion, uploadAndTest } = useServer();
    const question = getQuestion(aid, qid);
    const renderSubmission = ({ time, compiled, results }) => {
        const renderSingleSubTest = (subTest) => {
            switch (subTest.result) {
                case 'passed':
                    return (
                        <div className='text-success'>
                            <span>{subTest.serial}</span>
                            <FaCheckCircle className="ms-1" />
                        </div>
                    );
                case 'failed':
                    return (
                        <div className='text-warning'>
                            <span>{subTest.serial}</span>
                            <FaExclamationTriangle className="ms-1" />
                        </div>
                    );
                case 'errored':
                    return (
                        <div className='text-danger'>
                            <span>{subTest.serial}</span>
                            <FaTimesCircle className="ms-1" />
                        </div>
                    );
                default:
                    throw subTest.status;
            }
        };
        return (
            <Row className='mt-3'>
                <Col>
                    <div className='fs-5 fw-bold'>Lastest Submission</div>
                    <div className='fs-6 fw-bold'>Time</div>
                    <div>{(new Date(time)).toLocaleString('he-IL')}</div>
                    <div className='fs-6 fw-bold'>Compilation</div>
                    <div>
                        {
                            compiled
                            ? <span className='fw-bold text-success'>Passed</span>
                            : <span className='fw-bold text-danger'>Failed</span>
                        }
                    </div>
                    {
                        results &&
                        <>
                            <div className='fs-6 fw-bold'>Test Cases</div>
                            <ul className="list-unstyled">
                                {
                                    results.map((subTest, index) => (
                                        <li key={index} className="d-flex align-items-center">
                                            {renderSingleSubTest(subTest)}
                                        </li>
                                    ))
                                }
                        </ul>
                        </>
                    }
                </Col>
            </Row>
        )
    };

    return (
        <>
            <Row>
                <Col className='fs-2 fw-bold'>
                    {question?.title}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <div className='fs-5 fw-bold'>
                        Instructions
                    </div>
                    <Link to={question?.anchor} target='_blank' rel='noopener noreferrer'>
                        Link
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FileUploadForm onSubmit={(fileList) => uploadAndTest(aid, qid, fileList)} accept={'.py'} />
                </Col>
            </Row>
            {question?.submission && renderSubmission(question?.submission)}
        </>
    );
}
