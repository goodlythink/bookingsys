import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import reactTableDefaults from '../../components/utils/reactTableDefaults'
import 'react-table/react-table.css'

import { ButtonEdit, ButtonDelete } from '../../components';

reactTableDefaults();
const DepartItem = (props) => {
    const onDelete = (id) => {
        //this.props.onDelete(id)
        console.log('onDelete', id);
    }
    const onEdit = (id) => {
        //this.props.onEdit(id);
        console.log('onEdit', id);
    }

    const departs = props.data;
    const loading = props.loading;

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
                <ButtonEdit onClick={() => onEdit(row.value)} />&nbsp;
                <ButtonDelete onClick={() => onDelete(row.value)} />
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
                    data={departs}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    )
}

DepartItem.propTypes = {
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    loading: PropTypes.bool.isRequired
}

export default DepartItem;