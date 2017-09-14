import React from 'react';

const renderField = ({ input, label, type, autoFocus, meta: { touched, error, invalid, warning, active } }) => (
    <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control" autoFocus={autoFocus} />
        {touched && error && <div className="text-danger">{error}</div>}
    </div>
);

export default renderField;