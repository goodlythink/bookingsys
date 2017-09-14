import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDeparts, deleteDepart, saveDepart, loadDepart, resetDepart } from '../../actions/departAction';

import { Modal, ModalHeader } from 'reactstrap';
import { Loading, ErrorPage } from '../../components/layouts';
import { confirmModalDialog } from '../Utils'

import { SearchBar, ButtonNew } from '../../components';
import DepartItem from './depart_item';
import DepartForm from './depart_form';

class Depart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalTitle: ''
        }
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    componentDidMount() {
        this.props.loadDeparts();
    }

    handleNew = () => {
        this.props.resetDepart();
        this.setState({ modalTitle: 'เพิ่ม' });
        this.toggle();
    }

    departSearch = (term) => {
        this.props.loadDeparts(term);
    }

    handleEdit = (id) => {
        this.props.loadDepart(id, () => {
            this.setState({ modalTitle: 'แก้ไข' })
            this.toggle();
        })
    }

    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => this.props.deleteDepart(id, () => {
                this.props.loadDeparts();
            })
        })
    }

    handleSubmit = (values) => {
        this.props.saveDepart(values, () => {
            this.props.loadDeparts();
            this.toggle();
        })
    }

    render() {
        const { loading, error, departs } = this.props.departList;
        const departSearch = _.debounce(term => { this.departSearch(term) }, 500);

        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header card-header-buton">
                        <strong>แผนก</strong>
                        <div className="pull-right">
                            <ButtonNew onClick={this.handleNew} />
                        </div>
                    </div>

                    <div className="card-block table-responsive">
                        <div className="row margin-bottom-5">
                            <div className="col">
                                <SearchBar
                                    onSearchTermChange={departSearch}
                                    placeholder="ค้นหา...รหัส, ชื่อแผนก" />
                            </div>
                        </div>

                        {error && <ErrorPage error={error.message} />}
                        {!error &&
                            <DepartItem
                                data={departs}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                                loading={loading} />
                        }
                    </div>
                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary" autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>{this.state.modalTitle}แผนก</ModalHeader>
                    <DepartForm
                        data={this.props.departShow.depart}
                        onSubmit={this.handleSubmit}
                        onToggle={this.toggle}
                    />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departList: state.departs.departList,
        departShow: state.departs.departShow
    }
}
export default connect(mapStateToProps, 
    { loadDeparts, deleteDepart, saveDepart, loadDepart, resetDepart })
    (Depart);
