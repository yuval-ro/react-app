import { Button, Spinner } from 'react-bootstrap';


export default function AsyncSubmitButton (props) {
    const { children, pending, ...rest } = props;
    return (
        <Button
            type='submit'
            disabled={pending}
            {...rest}
        >
            {
                pending
                ? <Spinner size='sm' />
                : children
            }
        </Button>
    )
}