import React, { Component } from 'react';
import HistoryItem from './HistoryItem';
import { connect } from 'react-redux';
import * as actions from '../actions';

class HistoryList  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status : name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }

    render() {

        return (
            <div className="row">
                
                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
                
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <br/><br/>
                    <center><h3>History</h3></center>
                    <br/><br/>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Subcribers</th>
                                <th className="text-center">Teacher for Support</th>
                                <th className="text-center">Topic name</th>
                                <th className="text-center">Register Date</th>
                                <th className="text-center">Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={ this.onChange }
                                        value={ this.state.filerName }
                                    />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <HistoryItem/>
                        </tbody>
                    </table>
                </div>
                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks : state.tasks,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);
