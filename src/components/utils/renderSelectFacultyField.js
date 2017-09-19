import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const getOptions = (input, callback) => {
    setTimeout(function () {
        callback(null, {
            options: [
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }
            ],
            complete: true
        });
    }, 500);
}

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];
  
const renderSelectFacultyField = ({ input, label, loadOptions, meta: { touched, error, invalid, warning, active } }) => (
    <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
        <label>{label}</label>
        <Select    
            options = {loadOptions}
        />
        {touched && error && <div className="text-danger">{error}</div>}
        {console.log('loadOptions', loadOptions)}
    </div>
);

export default renderSelectFacultyField;