import React, { Component } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskControl from './TaskControl';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router-dom';
import WaitingForAcceptList from './WaitingForAcceptList';
import TeacherWaitingForAcceptList from './teacher/TeacherWaitingForAcceptList';

var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var $ = require("jquery");

const usersInitial = {
    username: "",
    id: "",
    is_student: false,
    is_teacher: true,
    is_superuser: false
}

class Body extends Component {

    componentWillMount() {
        this.props.axiosUers(username, password);
    }

    componentDidMount() {
        this.props.axiosUers(username, password);
    }

    // toggle redux
    onToggleForm = () => {
        var { itemEditing } = this.props;
        if (itemEditing && itemEditing.id !== '') {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
    }

    render() {

        var { isDisplayForm, users } = this.props;

        if (users.data === undefined) {
            users.data = usersInitial
        }
        $(document).ready(function(){
            $('.profile-usermenu .nav li').click(function() {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
            });
        });
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <div className="profile-sidebar">

                        <div className="profile-userpic">

                        </div>

                        <div className="profile-usertitle">
                            <div className="profile-usertitle-name">
                            {users.data.username}
                            </div>
                            <div className="profile-usertitle-job">
                            {users.data.is_teacher && users.data.is_superuser ?
                                "Administration"
                            :null}
                            {users.data.is_teacher && !users.data.is_superuser ?
                                "Student"
                            :null
                            }
                            {users.data.is_student ?
                                "Student"
                            :null
                            }    
                            </div>
                        </div>
                        {users.data.is_teacher && users.data.is_superuser ?
                        <div className="profile-usermenu">
                            <ul className="nav">
                                <li className="active">
                                    <Link to="/">
                                        <i className="fa fa-home fa-xs"></i>
                                        Home </Link>
                                </li>
                                <li className="">
                                    <Link to="/createField">
                                        <i className="fas fa-plus fa-sm"></i>
                                        Create Field </Link>
                                </li>
                                <li className="">
                                    <Link to="/history">
                                        <i className="fas fa-history fa-lg"></i>
                                        Approval History </Link>
                                </li>
                            </ul>
                        </div>
                        :null}
                        {users.data.is_teacher && !users.data.is_superuser ?
                        <div className="profile-usermenu">
                            <ul className="nav">
                            <li className="active">
                                    <Link to="/">
                                        <i className="glyphicon glyphicon-home"></i>
                                        Home </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <i className="glyphicon glyphicon-ok"></i>
                                        Approval for topic </Link>
                                </li>
                            </ul>
                        </div>
                        :null}
                        {users.data.is_student ?
                        <div className="profile-usermenu">
                            <ul className="nav">
                                <li className="active">
                                    <Link to="/">
                                        <i className="glyphicon glyphicon-home"></i>
                                        Home </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <i className="glyphicon glyphicon-user"></i>
                                        Register topic </Link>
                                </li>

                            </ul>
                        </div>
                        :null}
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="card-body">

                        <div className="text-center">
                            <h1>All topic register</h1><hr />
                        </div>
                        <div className="row">
                            <div className={isDisplayForm === true  ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                                <TaskForm/>
                            </div>
                            <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                            {users.data.is_teacher && !users.data.is_superuser && users.data.username!=="" ?
                             <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                                        <span className="fa fa-plus"></span>
                                        Add Topic
                            </button>
                            :null}
                            {users.data.is_teacher && !users.data.is_superuser && users.data.username!=="" ?
                                <TaskControl />
                                :null}
                                {users.data.is_teacher && users.data.is_superuser ? <WaitingForAcceptList/>:null }
                                {users.data.is_teacher && !users.data.is_superuser ? <TeacherWaitingForAcceptList/>:null }
                                {users.data.is_student ? <WaitingForAcceptList/>:null }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing,
        users: state.users
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        axiosUers: (username, password) => {
            dispatch(actions.axiosUers(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
