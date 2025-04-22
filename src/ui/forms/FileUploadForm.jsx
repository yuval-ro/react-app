/**
 * @file src/ui/forms/FileUpload.jsx
 */
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import AsyncSubmitButton from '../components/AsyncSubmitButton';


export default function FileUploadForm(props) {
    const fieldRef = useRef(null);
    
    const renderInnerForm = (formikData) => {
        const { isSubmitting, setFieldValue, values } = formikData;
        const isButtonDisabled = isSubmitting || !values?.fileList;
        return (
            <FormikForm as={Form}>
                <Row>
                    <Col>
                        <Field
                            as={Form.Control}
                            ref={fieldRef}
                            type='file'
                            name='file'
                            accept={props?.accept}
                            multiple
                            onChange={(event) => {
                                setFieldValue('fileList', event.currentTarget.files);
                            }}
                        />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col>
                        <AsyncSubmitButton
                            disabled={!values?.fileList}
                            pending={isSubmitting}
                            className='me-1'
                        >
                            Upload & Test
                        </AsyncSubmitButton>
                        <Button variant='light' disabled={isButtonDisabled} type='reset'>
                            Clear
                        </Button>
                    </Col>
                </Row>
            </FormikForm>
        );
    }
    const formikProps = {
        initialValues: { files: null },
        onSubmit: async ({ fileList }, { setSubmitting, setStatus, resetForm }) => {
            try {
                await props?.onSubmit(fileList);
                setStatus({ success: true });
            }
            catch (err) {
                setStatus({ success: false, message: err })
            }
            finally {
                resetForm();
                setSubmitting(false);
            }
        },
        onReset: () => {
            fieldRef.current.value = null; // HACK Manually reset the input field's value
        }
    }

    return (
        <Formik {...formikProps}>
            {(formikData) => renderInnerForm(formikData)}
        </Formik>
    );
}