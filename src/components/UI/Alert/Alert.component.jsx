import { Alert as BAlert, Fade } from 'react-bootstrap';

const Alert = ({props, children}) => {
    return (
        <BAlert variant='danger' transition={Fade} >
            { children }
        </BAlert>
    )
}

export default Alert;