import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import WaitingForAcceptList from './WaitingforAcceptList.jsx';
import CreateTopicForm from './CreateTopicForm.jsx';
import HistoryList from './HistoryList';
import Search from '../components/commons/Search';

var $ = require("jquery");

const usersInitial = {
    username: "",
    id: "",
    is_student: false,
    is_teacher: true,
    is_superuser: false,
    resetWaitingForm: false,
}

class AdminHome extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            tab: 0, // 0: Waiting for accept list, 1: createfield, 2: approval history
            resetAccepted:false
        }
    }

    onResetWaitingForm = () => {
        this.setState({
            resetAccepted: true
        });
    }

    onToggleTab = (tab) => {
        if(tab===0){
            this.setState({
                tab:0
            });
            this.props.onAdminGetTopicRegister();
        }else {
            if(tab===1){
                this.setState({
                    tab:1
                })
            }else{
                if(tab===2){
                    this.setState({
                        tab:2
                    })
                    this.props.onAdminGetHistory();
                }
            }
        }
    }

    render() {
        $(document).ready(function () {
            $('.profile-usermenu li').click(function () {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
            });
        });

        return (

            <div className="container-fluid">
                {/* Body here */}
                <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div className="profile-sidebar">

                            <div className="profile-userpic">

                            </div>

                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                </div>
                                <div className="profile-usertitle-job">
                                    Administration
                                </div>
                            </div>
                            <div className="profile-usermenu">
                                <ul className="nav">
                                    <li className="active" onClick={()=>this.onToggleTab(0)} style={{cursor:'pointer'}}>
                                        <a href="#">
                                            <i className="fa fa-home fa-menu"></i>
                                            Home </a>
                                    </li>
                                    <li className="" onClick={()=>this.onToggleTab(1)} style={{cursor:'pointer'}}>
                                        <a href="#" onClick={()=>this.onToggleTab(1)}>
                                            <i className="fas fa-plus fa-menu"></i>
                                            Managing Topic Field </a>
                                    </li>
                                    <li className="" onClick={()=>this.onToggleTab(2)} style={{cursor:'pointer'}}>
                                        <a href="#" onClick={()=>this.onToggleTab(2)}>
                                            <i className="fas fa-history fa-menu"></i>
                                            Topic Be Accepted </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            {this.state.tab === 0 || this.state.tab === 2 ? <Search/>: null}
                            <div className="text-center">

                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
                <footer className="page-footer font-small blue pt-4">
                    <div className="container-fluid text-center text-md-left">
                        <div className="row">
                        </div>
                    </div>
                    <div className="footer-copyright text-center py-3">© 2018 Copyright:
                    <a href="http://hcmute.edu.vn/"> HCMC University of Technology and Education</a>
                    </div>

                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        admingetregister: state.admingetregister,
        keyword: state.search,
        sort:state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        axiosUers: () => {
            dispatch(actions.axiosUers());
        },
        onAdminGetTopicRegister : () => {
            dispatch(actions.axiosAdminGetInfoTopicRegister());
        },
        onAdminGetHistory: () => {
            dispatch(actions.axiosAdminGetHistory());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
