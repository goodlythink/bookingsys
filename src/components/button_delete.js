import React from 'react';
import PropTypes from 'prop-types';

const ButtonDelete = (props) => {
    return (
        <button className='btn btn-danger btn-sm btn-xs' onClick={props.onClick}>
            <i className="icon-ban"></i> ลบ
        </button>
    )
}

ButtonDelete.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ButtonDelete;