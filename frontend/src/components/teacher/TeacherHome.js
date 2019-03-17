import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import TeacherWaitingForAcceptList from './TeacherWaitingForAcceptList.jsx';
import TeacherHistoryList from './TeacherHistoryList.jsx';
import FieldList from './FieldList.jsx';
import Account from './Account.jsx';


var $ = require("jquery");

class TeacherHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tab: 0, // 0: Waiting for accept list, 1: createfield, 2: approval history
            item:{
                id:"",
                name:""
            },
            resetTopicOfTeacherBegister:false
        }
    }

    componentWillReceiveProps(){
        if(this.state.resetTopicOfTeacherBegister === true){
            // this.props.onGetTopicOfTeacherBeRegister();
            this.setState({
                resetTopicOfTeacherBegister:false
            })
        }
    }

    componentWillMount() {
        this.props.onGetTopicOfTeacherBeRegister();
    }

    componentDidMount(){
        this.props.onGetUserInfo();
        this.props.onGetTopicOfTeacherBeRegister();
        this.props.onTeacherGetHistory();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }

    onToggleTab = (tab) => {
        if(tab===0){
            this.setState({
                tab:0
            });
        }else {
            if(tab===1){
                this.setState({
                    tab:1
                })
            }else {
                if(tab===2){
                    this.setState({
                        tab:2
                    })
                }else{
                    this.setState({
                        tab:3
                    })
                }
            }
        }
    }

    onResetTopicOfTeacherBeRegister = () => {
        this.setState({
            resetTopicOfTeacherBegister: true
        })
    }

    render() {
        $(document).ready(function () {
            $('.profile-usermenu li').click(function () {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
            });
        });
        var {users, topicOfTeacherBeRegister}=this.props;
        console.log(topicOfTeacherBeRegister);
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
                            {users.data.fullname}
                            </div>
                            <div className="profile-usertitle-job">
                            {users.data.user_field}
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
                                    <a href="#" >
                                        <i className="fas fa-user fa-menu"></i>
                                        My account </a>
                                </li>
                                <li className="" onClick={()=>this.onToggleTab(2)} style={{cursor:'pointer'}}>
                                    <a href="#" >
                                        <i className="fas fa-plus fa-menu"></i>
                                        Field list </a>
                                </li>
                                <li className="" onClick={()=>this.onToggleTab(3)} style={{cursor:'pointer'}}>
                                    <a href="#" >
                                        <i className="fas fa-check fa-menu"></i>
                                        All topic </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    
                    <div className="card-body">

                        <div className="text-center">
                            
                            {/* {this.state.tab ===0 ? <TeacherWaitingForAcceptList
                                topicOfTeacherBeRegister={topicOfTeacherBeRegister}
                            />: (this.state.tab ===1 ? <FieldList
                                resetTopicOfTeacherBegister={this.state.resetTopicOfTeacherBegister}
                                onResetTopicOfTeacherBeRegister={this.onResetTopicOfTeacherBeRegister}/>: <TeacherHistoryList
                                admingetregister={this.props.admingetregister}/>)} */}
                            {this.state.tab ===0 ? <TeacherWaitingForAcceptList
                                topicOfTeacherBeRegister={topicOfTeacherBeRegister}
                                keyword={this.props.keyword}
                                sort={this.props.sort}
                            />: (this.state.tab ===1 ? <Account/>: (this.state.tab===2 ? <FieldList
                                resetTopicOfTeacherBegister={this.state.resetTopicOfTeacherBegister}
                                onResetTopicOfTeacherBeRegister={this.onResetTopicOfTeacherBeRegister}
                                />: <TeacherHistoryList
                                sort={this.props.sort}
                                admingetregister={this.props.admingetregister}/>))}
                        </div>
                        {/* <hr/> */}
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
                    <a href="http://en.hcmute.edu.vn/"> HCMC University of Technology and Education</a>
                    </div>

                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users:state.users,
        topicOfTeacherBeRegister:state.topicOfTeacherBeRegister,
        itemTopics:state.itemTopics,
        admingetregister:state.admingetregister,
        keyword: state.search,
        sort:state.sort,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetUserInfo: ()=>{
            dispatch(actions.axiosUers());
        },
        onGetTopicOfTeacherBeRegister : () => {
            dispatch(actions.axiosTopicOfTeacherBeRegister());
        },
        onTeacherGetHistory: () => {
            dispatch(actions.axiosTeacherGetHistory());
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TeacherHome);
