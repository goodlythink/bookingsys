import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';

import { renderField } from '../Utils';
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { Loading, ErrorPage } from '../../components/layouts';
import { SelectFacultys } from '../../components'

class DepartForm extends Component {
    static propType = {
        onSubmit: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            optionFacultys: []
        }
    }

    componentDidMount() {
        this.handleInitialize();
        this.renderSelect();
    }

    onSubmit = (values) => {
        this.props.onSubmit(values);
    }

    toggle = () => {
        this.props.onToggle();
    }

    handleInitialize() {
        this.props.initialize(this.props.data[0]);
    }

    renderSelect() {
        let optionFacultys = []
        this.props.dataFacultys.map(({ id, name }) => {
            optionFacultys = [...optionFacultys, { value: id, label: name }]
        })

        this.setState({ optionFacultys });

        //console.log('option', optionFacultys);
    }
    render() {
        const { handleSubmit } = this.props;
        const { loading, error } = this.props.depart;
        const { optionFacultys } = this.state;

        return (
            <div>
                {!error && loading && <Loading />}
                {error && <ErrorPage error={error.message} />}
                <form>
                    <ModalBody>
                        <Field name="id" component="input" type="hidden" />
                        <Field name="code" component={renderField} type="text" label="รหัส" autoFocus />
                        <Field name="name" component={renderField} type="text" label="ชื่อแผนก" />
                        <Field name="faculty_id" component={SelectFacultys} label="หน่วยงาน" loadOptions={optionFacultys} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>ปิด</Button>
                        <Button color="primary" onClick={handleSubmit(this.onSubmit)}><i className="fa fa-save"></i> บันทึกข้อมูล</Button>
                    </ModalFooter>
                </form>
            </div>

        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.code) {
        errors.code = "จำเป็นต้องกรอกรหัส";
    } else if (values.code.length > 20) {
        errors.code = "รหัสต้องไม่เกิน 20 ตัวอักษร";
    }

    if (!values.name) {
        errors.name = "จำเป็นต้องกรอกชื่อหน่วยงาน";
    } else if (values.name.length > 100) {
        errors.name = "ชื่อต้องไม่เกิน 100 ตัวอักษร";
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        depart: state.departs.departSave
    }
}

const form = reduxForm({
    form: 'DepartForm',
    validate
});

export default connect(mapStateToProps, null)(form(DepartForm))
