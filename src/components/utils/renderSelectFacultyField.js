import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const renderSelectFacultyField = ({ input, label, loadOptions, meta: { touched, error, invalid, warning, active } }) => (
    <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
        <label>{label}</label>
        <Select
            options={loadOptions}
        />
        {touched && error && <div className="text-danger">{error}</div>}
    </div>
);
export default renderSelectFacultyField; 