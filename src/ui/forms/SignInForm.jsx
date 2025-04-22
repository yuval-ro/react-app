/**
 * @file src/ui/forms/SignInForm.jsx
 */
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import AsyncSubmitButton from '../components/AsyncSubmitButton';



export default function SignInForm(props) {
    const formikProps = {
        initialValues: {
            uname: '',
            pwd: ''
        },
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            await props?.onSubmit(values.uname, values.pwd);
            actions.resetForm();
            actions.setSubmitting(false);
        },
        validate: (values) => {
            const errors = {};
            if (!values.uname) {
                errors.uname = 'Username is required.';
            }
            if (!values.pwd) {
                errors.pwd = 'Password is required.';
            }
            return errors;
        }
    }
    const renderInnerForm = ({ isSubmitting }) => (
        <FormikForm as={Form} className={'d-flex flex-column ' + props?.className}>
            <Row>
                <Form.Group as={Col} className='my-1'>
                    <FloatingLabel label='Username'>
                        <Field as={Form.Control} type='text' name='uname' placeholder=''/>
                    </FloatingLabel>
                    {/* <ErrorMessage name='uname' component='div' className='text-danger' /> */}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className='my-1'>
                    <FloatingLabel label='Password'>
                        <Field as={Form.Control} type='password' name='pwd' placeholder=''/>
                    </FloatingLabel>
                    {/* <ErrorMessage name='pwd' component='div' className='text-danger' /> */}
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Form.Group className='d-flex'>
                        <Form.Check />
                        <Form.Label className='ms-1'>Remember Me</Form.Label>
                    </Form.Group>
                </Col>
                <Col className='d-flex flex-row-reverse'>
                    <span className='link-primary'>Forgot password?</span>
                </Col>
            </Row>
            <Row className='mt-5 d-flex flex-column'>
                <Col>
                    <AsyncSubmitButton pending={isSubmitting} className='w-100'>
                        Sign in
                    </AsyncSubmitButton>
                </Col>
                <Col className='mt-3 text-center'>
                    <span>Don't have an account?</span>
                    <span className='link-primary ms-2'>
                        Sign up here
                    </span>
                </Col>
            </Row>
        </FormikForm>
    )

    return <Formik {...formikProps}>
        {(formikData) => renderInnerForm(formikData)}
    </Formik>
}
