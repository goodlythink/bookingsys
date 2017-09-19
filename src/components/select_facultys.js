import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectFacultys extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectValue: ''
        }
    }

    updateValue = (newValue) => {
        this.setState({
            selectValue: newValue,
        });
    }

    render() {
        const { input, label, loadOptions, meta: { touched, error, invalid, warning, active } } = this.props
        return (
            <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
        <label>{label}</label>
        <Select    
            options={loadOptions}
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

export default SelectFacultys;