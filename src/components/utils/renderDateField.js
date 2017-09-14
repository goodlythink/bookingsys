import React from 'react';
import ReactDatePicker from '../react-datepicker';
import 'moment/locale/th'

const renderDateField = ({ input, label, type, autoFocus, onDayChange, meta: { touched, error, invalid, warning, active } }) => (
    <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
        <label>{label}</label>

        <ReactDatePicker
        format="DD/MM/YYYY"
        inputFieldClass="form-control"
        todayText="วันนี้"
        openOnInputFocus={true}
        closeOnSelect={true} />

        {touched && error && <div className="text-danger">{error}</div>}
    </div>
);

export default renderDateField;