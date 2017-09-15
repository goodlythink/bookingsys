import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFacultys, deleteFaculty, saveFaculty, loadFaculty, resetFaculty } from '../../actions/facultyAction';

import { Modal, ModalHeader } from 'reactstrap';
import { Loading, ErrorPage } from '../../components/layouts';
import { confirmModalDialog } from '../Utils'

import { SearchBar, ButtonNew } from '../../components';
import FacultyItem from './faculty_item';
import FacultyForm from './faculty_form';

class Faculty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalTitle: ''
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    componentDidMount() {
        this.props.loadFacultys();
    }

    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => this.props.deleteFaculty(id).then(() => {
                this.props.loadFacultys();
            })
        })
    }

    handleNew = () => {
        this.props.resetFaculty();
        this.setState({ modalTitle: 'เพิ่ม' })
        this.toggle();
    }

    handleEdit = (id) => {
        this.props.loadFaculty(id).then(() => {
            this.setState({ modalTitle: 'แก้ไข' })
            this.toggle();
        })
    }

    handleSubmit_ = (values) => {
        this.props.saveFaculty(values).then(() => {
            if (!this.props.faculty.error) {
                this.props.loadFacultys();
                this.toggle();
            }
        })
    }

    handleSubmit = (values) => {
        this.props.saveFaculty(values, () => {
            this.props.loadFacultys();
            this.toggle();
        })
    }

    facultySearch(term) {
        this.props.loadFacultys(term);
    }

    render() {
        const { loading, error, facultys } = this.props.facultyList;
        const facultyDelete = this.props.facultyDelete;
        const facultySearch = _.debounce(term => { this.facultySearch(term) }, 500);

        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header card-header-button">
                        <strong>หน่วยงาน</strong>
                        <div className="pull-right">
                            <ButtonNew onClick={this.handleNew} />
                        </div>
                    </div>

                    <div className="card-block table-responsive">
                        <div className="row margin-bottom-5">
                            <div className="col">
                                <SearchBar
                                    onSearchTermChange={facultySearch}
                                    placeholder="ค้นหา...รหัส, ชื่อหน่วยงาน" />
                            </div>
                        </div>

                        {facultyDelete.loading && <Loading />}
                        {(error || facultyDelete.error) && <ErrorPage error={error.message || facultyDelete.error.message} />}
                        {
                            !error &&
                            <FacultyItem
                                facultys={facultys}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                                loading={loading} />
                        }
                    </div>

                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary" autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>{this.state.modalTitle}หน่วยงาน</ModalHeader>
                    <FacultyForm
                        facultyShow={this.props.facultyShow.faculty}
                        onSubmit={this.handleSubmit}
                        onToggle={this.toggle} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        facultyList: state.facultys.facultyList,
        faculty: state.facultys.facultySave,
        facultyDelete: state.facultys.facultyDelete,
        facultyShow: state.facultys.facultyShow
    }
}

export default connect(mapStateToProps,
    { loadFacultys, deleteFaculty, saveFaculty, loadFaculty, resetFaculty })
    (Faculty);
