import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { term: "" }
    }

    static propTypes = {
        onSearchTermChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    }

    render() {
        return (

            <div className="input-group">
                <input
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.state.term}
                    onChange={e => this.onInputChange(e.target.value)} />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-primary" onClick={this.searchTerm}>
                        <i className="fa fa-search"></i>
                    </button>
                </span>
            </div>
        )
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }

    searchTerm = () => {
        this.props.onSearchTermChange(this.state.term);
    }
}

export default SearchBar;