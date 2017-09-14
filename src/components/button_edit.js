import React from 'react';
import PropTypes from 'prop-types';

const ButtonEdit = (props) => {
    return (
        <button className='btn btn-primary btn-sm btn-xs' onClick={props.onClick}>
            <i className="icon-pencil"></i> แก้ไข
        </button>
    )
}

ButtonEdit.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ButtonEdit;