import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import AdminHome from './AdminHome';
import Home from './Home';
import TeacherHome from './teacher/TeacherHome';
import StudentHome from './student/StudentHome';

var $ = require("jquery");

const usersInitial = {
    username: "",
    id: "",
    is_student: false,
    is_teacher: true,
    is_superuser: false
}

class Body extends Component {

    constructor(props) {
        super(props);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }


    render() {
       return <Home/>;
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        axiosUers: () => {
            dispatch(actions.axiosUers());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
