import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onHandleChange = (event) => {
        this.setState({
            keyword : event.target.value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword); // dispatch searchTask
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{padding: '0'}}>
                <div className="input-group">
                    <input
                        style={{height: '37px'}}
                        name="keyword"
                        value={this.state.keyword}
                        type="text"
                        className="form-control"
                        placeholder="Enter keyword..."
                        onChange={this.onHandleChange}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                            <span className="fa fa-search"></span>Tìm
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
