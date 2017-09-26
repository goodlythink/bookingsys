import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFacultys } from '../actions/facultyAction';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectFacultys extends Component{
    constructor(props){
        super(props)

        this.state = {
            optionFacultys: [],
            selectValue: ''
        }
    }

    componentDidMount() {
        this.props.loadFacultys();
        //console.log('facultys', this.props.facultyList.facultys);
        this.renderSelect();
    }

    renderSelect() {
        let optionFacultys = []
        this.props.facultyList.facultys.map(({ id, name }) => {
            optionFacultys = [...optionFacultys, { value: id, label: name }]
        })

        this.setState({ optionFacultys });
    }

    updateValue = (newValue) => {
        this.setState({
            selectValue: newValue,
        });
    }

    render() {
        const { input, label, meta: { touched, error, invalid, warning, active } } = this.props
        const { optionFacultys } = this.state;
       
        /*
        let optionFacultys = []
        this.props.facultyList.facultys.map(({ id, name }) => {
            optionFacultys = [...optionFacultys, { value: id, label: name }]
        })
        */
        

        return (
            <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
        <label>{label}</label>
        <Select    
            options={optionFacultys}
            value={this.state.selectValue}
            onChange={this.updateValue}        
        />
        {touched && error && <div className="text-danger">{error}</div>}
    </div>
        )
    }
}

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

const mapStateToProps = (state) => {
    return {
        facultyList: state.facultys.facultyList
    }
}
export default connect(mapStateToProps, { loadFacultys })(SelectFacultys);