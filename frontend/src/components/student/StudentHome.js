import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import RegisterForm from './RegisterForm.jsx';
import EditInfoForm from './EditInfoForm.jsx';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
    Label,
    Input,
    FormGroup,
    Popover,
    PopoverHeader,
    PopoverBody,
} from 'reactstrap';

var $ = require("jquery");

class StudentHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tab: 0, // 0: Waiting for accept list, 1: createfield, 2: approval history
            displayFormRegister: false,
            resetRegister: false,
            displayFormEdit: false,
            fullname:"",
            grade:"",
            mssv: "",
            email:""
        }
    }

    componentWillReceiveProps(nextprops) {
        var { users } = this.props;
        var {fullname,mssv,email,grade}= this.state;
        console.log(this.state.resetRegister);
        if (this.state.resetRegister === true) {
            this.props.onShowRegisterTopic(users.data.id);
            this.props.onGetInfoTeacherById(users.data.id);
            this.props.onGetInfoUser();
            this.setState({
                resetRegister: false
            });
            console.log("da show");
        }
    }

    componentDidMount() {
        var { users } = this.props;
        console.log(users.data.id);
        this.props.onShowRegisterTopic(users.data.id);
        this.props.onGetInfoTeacherById(users.data.id);
        this.props.onGetInfoUser();
        this.props.onGetListTeacherAndTopic();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onExitFormRegister = () => {
        this.setState({
            displayFormRegister: false
        });
    }

    onToggleFormRegister = () => {
        this.setState({
            displayFormRegister: !this.state.displayFormRegister
        });
    }

    onToggleFormEdit = () => {
        var {fullname,mssv,email,grade}= this.props.users.data;
        this.setState({
            displayFormEdit: !this.state.displayFormEdit,
            fullname: fullname,
            mssv:mssv,
            email:email,
            grade:grade
        })
    }

    onResetRegister = () => {
        this.setState({
            resetRegister: true
        });
    }

    onSaveChangeInfo = () => {
        var {fullname,mssv,email,grade}= this.state;
        var {users}=this.props;
        console.log(fullname+ "--"+mssv+"---" + email+"----"+ grade);
        this.props.onStudentUpdateInfo(users.data.id,fullname,mssv,grade,email);
        this.onResetRegister();
        this.onToggleFormEdit();
    }

    render() {
        $(document).ready(function () {
            $('.profile-usermenu li').click(function () {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
            });
        });

        var { displayFormRegister } = this.state;
        var { users, listTeacherAndTopic, registersubject, infoteacher } = this.props;
        var countRegister = registersubject.teacher.length;
        console.log(users);
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
                                        <li className="active">
                                            <a href="#">
                                                <i className="fa fa-home fa-menu"></i>
                                                Home </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">

                                <div className="text-center">

                                    <div className="row">
                                        {displayFormRegister ? <div className="col-md-3">
                                            <RegisterForm
                                                onResetRegister={this.onResetRegister}
                                                listTeacherAndTopic={listTeacherAndTopic}
                                                onExitFormRegister={this.onExitFormRegister}
                                                users={users.data} />
                                        </div> : null}
                                        <div className="col-md-3">

                                            <button type="button" className="btn btn-info btn-register"
                                                onClick={this.onToggleFormRegister} disabled={countRegister !== 0}>RegisterTopic</button>
                                            <button type="button" className="btn btn-info btn-edit" style={{ marginLeft: "-12px" }}
                                                onClick={this.onToggleFormEdit}>Update</button>
                                            <Modal isOpen={this.state.displayFormEdit} toggle={this.onToggleFormEdit}>
                                                <ModalHeader toggle={this.onToggleFormEdit}>Student Information</ModalHeader>
                                                <ModalBody style={{ marginLeft: "50px" }}>
                                                    <FormGroup className="row">
                                                        <Label for="idInfoFullname"><strong>Fullname: </strong></Label>
                                                        <input value={this.state.fullname} name="fullname" onChange={this.onChange}/>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label for="idInfoGrade"><strong>Grade: </strong></Label>
                                                        <input value={this.state.grade} name="grade" onChange={this.onChange}/>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label for="idMssv"><strong>Student Code: </strong></Label>
                                                        <input value={this.state.mssv} name="mssv" onChange={this.onChange}/>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label for="idEmail"><strong>Email: </strong></Label>
                                                        <input value={this.state.email} name="email" onChange={this.onChange}/>
                                                    </FormGroup>
                                                    
                                                </ModalBody>
                                                <ModalFooter>
                                                    <button onClick={this.onSaveChangeInfo}>Save</button>
                                                    <button  onClick={this.onToggleFormEdit}>Exit</button>
                                                </ModalFooter>
                                            </Modal>
                                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />

                                        </div>
                                        <div className="col-md-6">


                                            <label className="label-register"><strong>Name:</strong></label>
                                            <p>{users.data.fullname}</p>

                                            <label className="label-register"><strong>Student number:</strong></label>
                                            <p>{users.data.mssv}</p>

                                            <label className="label-register"><strong>Email:</strong></label>
                                            <p>{users.data.email}</p>

                                            <label className="label-register"><strong>Grade:</strong></label>
                                            <p>{users.data.grade}</p>


                                            <label className="label-register"><strong>Register for topic:</strong></label>
                                            <p>{countRegister === 0 ? "None topic" : `${registersubject.name}`}</p>

                                            <label className="label-register"><strong>Status:</strong></label>
                                            <p>{countRegister === 0 ? "" : `${registersubject.choose_by[0].status === 0 ? "Waitting for acception" : "Accepted"}`}</p>


                                            <label className="label-register"><strong>Register at:</strong></label>
                                            <p>{countRegister === 0 ? "None" : `${registersubject.register_at}`}</p>


                                            <label className="label-register"><strong>Teacher support:</strong></label>
                                            <p>{countRegister === 0 && infoteacher.data.id === "" ? "None" : `${infoteacher.data.fullname}`}</p>

                                            <label className="label-register"><strong>Deadline at:</strong></label>
                                            <p>{countRegister === 0 ? "None" : `${registersubject.choose_by[0].deadline_at === null ? "None" : registersubject.choose_by[0].deadline_at}`}</p>

                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="page-footer font-small blue pt-4">
                    <div className="container-fluid text-center text-md-left">
                        <div className="row">
                        </div>
                    </div>
                    <div className="footer-copyright text-center py-3" style={{ backgroundColor: 'cadetblue' }}>© 2018 Copyright:
                    <a href="http://en.hcmute.edu.vn/"> HCMC University of Technology and Education</a>
                    </div>

                </footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        listTeacherAndTopic: state.listTeacherAndTopic,
        register: state.register,
        registersubject: state.registersubject,
        infoteacher: state.infoteacher,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetInfoUser: () => {
            dispatch(actions.axiosUers());
        },
        onGetListTeacherAndTopic: () => {
            dispatch(actions.axiosGetListTeacherAndTopic());
        },
        onShowRegisterTopic: (idUser) => {
            dispatch(actions.axiosShowRegisterTopic(idUser));
        },
        onGetInfoTeacherById: (id) => {
            dispatch(actions.axiosGetInfoTeacherById(id));
        },
        onStudentUpdateInfo: (idUser, fullname, mssv, grade, email) => {
            dispatch(actions.studentUpdateInfo(idUser, fullname, mssv, grade, email));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentHome);
