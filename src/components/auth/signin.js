import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/authAction';

//import renderField from '../utils/renderField';
import { Loading, ErrorPage } from '../../components/layouts';

const renderInput = ({ input, label, type, autoFocus, icon, meta: { touched, error, invalid, warning, active } }) => (
    <div className={`input-group mb-3 ${touched && error ? 'has-danger' : ''}`}>
        <span className="input-group-addon"><i className={icon}></i></span>
        <input {...input} type={type} className="form-control" autoFocus={autoFocus} />
    </div>
);

class Signin extends Component {
    handleFormSubmit = ({ username, password }) => {
        this.props.signinUser({ username, password })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.authenticated) {
            this.props.history.push('/');
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <ErrorPage error={this.props.errorMessage} />
            )
        }
    }

    renderLoading() {
        if (this.props.authLoading) {
            return (
                <Loading />
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="app flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card-group mb-0">
                                <div className="card p-4">
                                    <div className="card-block">
                                        <h1>เข้าสู่ระบบ</h1>
                                        <p className="text-muted">เข้าสู่ระบบด้วยอีเมลล์หรือชื่อเข้าใช้ระบบ</p>
                                        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                                            <Field name="username" component={renderInput} type="text" label="อีเมลล์หรือชื่อเข้าใช้ระบบ" icon="icon-user" autoFocus={true} />
                                            <Field name="password" component={renderInput} type="password" label="รหัสผ่าน" icon="icon-lock" />
                                            {this.renderAlert()}
                                            {this.renderLoading()}
                                            <div className="row mt-4">
                                                <div className="col text-center">
                                                    <button action="submit" className="btn btn-primary">เข้าสู่ระบบ</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <div className="card-block text-center">
                                        <h2>ลงทะเบียน</h2>
                                        <p>หากคุณยังไม่มีบัญชี สามารถลงทะเบียนได้โดยคลิกปุ่มด้านล่างนี้</p>
                                        <button type="button" className="btn btn-primary active mt-3">ลงทะเบียน</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function validate(values) {
    const errors = {}
    if (!values.username) {
        errors.username = 'จำเป็นต้องกรอก!!'
    }

    if (!values.password) {
        errors.password = 'จำเป็นต้องกรอก!!'
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        authenticated: state.auth.authenticated,
        authLoading: state.auth.loading
    }
}

const form = reduxForm({
    form: 'signin',
    validate
})(Signin);
export default connect(mapStateToProps, actions)(form);