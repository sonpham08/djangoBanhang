import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class HistoryItem extends Component {

    render() {
        return (
            <tr>
                <td>1</td>
                <td>Pham Thanh Son</td>
                <td className="text-center">
                    <select 
                    className="form-control"
                    >
                        <option value={-1}>Le Van Thanh</option>
                        <option value={0}>Nguyen Van A</option>
                        <option value={1}>Nguyen Van B</option>
                    </select>
                </td>
                <td>Lap trinh ReactJS va django</td>
                <td>17/02/1997</td>
                <td>18/3/2016</td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItem);
