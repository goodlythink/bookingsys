import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import reactTableDefaults from '../../components/utils/reactTableDefaults'
import 'react-table/react-table.css'

import { ButtonEdit, ButtonDelete } from '../../components';

class DepartTable extends Component {
    constructor(props) {
        super(props)
        reactTableDefaults();

        this.state = {
            loading: true
        }
    }

    onDelete(id) {
        this.props.onDelete(id)
    }

    onEdit(id) {
        this.props.onEdit(id);
    }

    render() {
        //console.log('loading',this.props.loading);
        const data = this.props.data;
        const loading = this.props.loading;

        const columns = [{
            Header: 'รหัส',
            maxWidth: 120,
            accessor: 'code',
            className: 'text-center'
        }, {
            Header: 'ชื่อแผนก',
            accessor: 'name'
        }, {
            Header: '',
            accessor: 'id',
            Cell: row =>
                <div>
                    <ButtonEdit onClick={() => this.onEdit(row.value)} />&nbsp;
                    <ButtonDelete onClick={() => this.onDelete(row.value)} />
                </div>,
            className: 'text-center',
            width: 140,
            sortable: false
        },]

        return (
            <div className="row">
                <div className="col">
                    <ReactTable
                        className="-striped -highlight"
                        data={data}
                        columns={columns}
                        loading={loading}
                    />
                </div>
            </div>
        )
    }
}

DepartTable.propTypes = {
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    loading: PropTypes.bool.isRequired
}

export default DepartTable;

