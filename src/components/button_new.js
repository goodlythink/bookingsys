import React from 'react';
import PropTypes from 'prop-types';

const ButtonNew = (props) => {
    return (
        <button className='btn btn-success btn-sm' onClick={props.onClick}>
            <i className="fa fa-plus"></i> เพิ่มข้อมูล
        </button>
    )
}

ButtonNew.propTypes = {
    onClick: PropTypes.func.isRequired
}
export default ButtonNew;