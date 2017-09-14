import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from './utils/renderField';
import renderDateField from './utils/renderDateField';

import DayPickerInput from 'react-day-picker/DayPickerInput';
//import 'react-day-picker/lib/style.css';

class Dashboard extends Component {
    handleSubmit=()=>{
        console.log('Submit');
    }
    
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        const dayPickerProps = {todayButton: 'Go to Today'};

        return (
            <form onSubmit={handleSubmit}>
                <div className='abc'>
                    <label>ReactDatePicker</label>
                    <div>
                        <Field name="fdate" component={renderDateField} type="text" placeholder="First Name" />
                    </div>
                </div>

                <div>
                    <label>First Name</label>
                    <div>
                        <Field name="firstName" component={renderField} type="text" placeholder="First Name" />
                    </div>
                </div>
                <div>
                    <label>Last Name</label>
                    <div>
                        <Field name="lastName" component={renderField} type="text" placeholder="Last Name" autoFocus />
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <div>
                        <Field name="email" component={renderField} type="email" placeholder="Email" />
                    </div>
                </div>
                <div>
                    <label>Sex</label>
                    <div>
                        <label><Field name="sex" component="input" type="radio" value="male" /> Male</label>
                        <label><Field name="sex" component="input" type="radio" value="female" /> Female</label>
                    </div>
                </div>
                <div>
                    <label>Favorite Color</label>
                    <div>
                        <Field name="favoriteColor" component="select">
                            <option></option>
                            <option value="ff0000">Red</option>
                            <option value="00ff00">Green</option>
                            <option value="0000ff">Blue</option>
                        </Field>
                    </div>
                </div>
                
                 <div className='abc'>
                    <label>renderDateField</label>
                    <div>
                        <DayPickerInput
                            className='form-control'
                            format="DD/MM/YYYY"
                            hideOnDayClick={false}
                            dayPickerProps={dayPickerProps}
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="employed">Employed</label>
                    <div>
                        <Field name="employed" id="employed" component="input" type="checkbox" />
                    </div>
                </div>
                <div>
                    <label>Notes</label>
                    <div>
                        <Field name="notes" component="textarea" />
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required!!';
    }

    if (!values.lastName) {
        errors.lastName = 'Required!!';
    }

    if (!values.email) {
        errors.email = 'Required!!';
    }
    return errors;
}

export default reduxForm({
    form: 'simple',
    validate
})(Dashboard);