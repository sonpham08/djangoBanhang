import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class TeacherWaitingForAcceptItem extends Component {

    render() {
        return (
            <tr>
                <td>1</td>
                <td>Pham Thanh Son</td>
                <td>Lap trinh ReactJS va django</td>
                <td>17/02/1997</td>
                <td>Waiting for acception</td>
                <td><a href="#" className="accept">Accept</a></td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherWaitingForAcceptItem);
