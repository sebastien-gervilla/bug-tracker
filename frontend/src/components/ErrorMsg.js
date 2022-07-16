import React from 'react';

const ErrorMsg = ({ error }) => {
    return (
        <div className="error-msg">
            <p className='error'>{ error }</p>
        </div>
    );
};

export default ErrorMsg;