import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class Account extends Component {

    componentDidMount() {
        this.props.onGetListFieldOnlyTeacher();
    }
    render() {
        var { listfieldonlyteacher, users } = this.props;
        console.log(users);
        console.log(listfieldonlyteacher);
        if(listfieldonlyteacher.data !== undefined) {
            var getOptionLists = listfieldonlyteacher.data.subjectfield.map ((list, idx) => {
                return <option
                        key={idx} value={list.id}>{list.name}</option>
            })
        }else {
            return null;
        }
        return (
            <div className="col-md-6">


                <label className="label-register"><strong>Fullname:</strong></label>
                <p>{users.data.fullname}</p>

                <label className="label-register"><strong>Email:</strong></label>
                <p>{users.data.email}</p>

                <label className="label-register"><strong>Professional:</strong></label>
                <p>{users.data.user_field}</p>

                <label className="label-register"><strong>Topic:</strong></label>
                <select
                    className="form-control"
                    style={{float: 'right', width: '310px'}}
                    name="topic"
                    id="idtopic"
                >
                    {getOptionLists}
                </select>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listfieldonlyteacher: state.listfieldonlyteacher,
        users: state.users
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetListFieldOnlyTeacher: () => {
            dispatch(actions.axiosGetListFieldOnlyTeacher());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);