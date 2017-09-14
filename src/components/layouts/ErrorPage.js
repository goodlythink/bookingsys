import React from 'react';

const ErrorPage = (props) => {
    return <div className='alert alert-danger'>แจ้งเตือน: {props.error}</div>
}
export default ErrorPage;

