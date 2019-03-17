import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { Link } from 'react-router-dom';
// import header from './../images/header.jpg';
// import { Button, Modal, ModalHeader, ModalBody,Form } from 'reactstrap';
import {Button, 
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
import {getStudentByFragment
    ,getSubjectByFragment
    ,getTeacherByFragment,
    compareDateTime} from './../Utilities/utils';

var $=require("jquery");

class WaitingForAcceptItem extends Component {

    constructor(props){
        super(props);
        this.state={
            modal:false,
            popoverOpen:false,
            id:'',
            name:'',
            register_at:'',
            deadline_at:''
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops && nextprops.itemEditing){
            this.setState({
                id: nextprops.itemEditing.id,
                name: nextprops.itemEditing.name,
                register_at: nextprops.itemEditing.register_at,
                deadline_at: nextprops.itemEditing.deadline_at
            })
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onHandleBlur = (event) => {
        this.setState({
            deadline_at:event.target.value 
        })
    }

    togglePopover = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    toggle=()=> {
        this.setState({
          modal: !this.state.modal
        });
    }

    onSaveAcception = (idStu) => {
        // need compare between register and deadline time
        this.props.onAccepted(idStu,this.refs.idDeadline.props.value);
        this.props.onResetWaitingForm();
        this.toggle();
    }

    onLoadItemEditing = (subject, deadline_at) => {
        var newState= Object.assign({deadline_at}, subject );
        console.log(newState);
        this.props.onLoadSubjectBeAcception(newState);
        this.toggle();
    }


    render() {
        if(this.refs.idDeadline !== undefined){
            if(this.refs.idDeadline.props.value !== ''){
                $('#btn-save').css('cursor','pointer');
            }
        }
        // if(this.state.deadline_at === ''){
        //     $(document).ready(function () {
        //         $('#btn-save').css('cursor','not-allowed');
        //     })
        // }
        var {register,itemEditing,accepted}=this.props;
        var teacher= getTeacherByFragment(register);
        var subject= getSubjectByFragment(register);
        var student = getStudentByFragment(register);
        // if(itemEditing.deadline_at === null){
        //     itemEditing.deadline_at= ''
        // }
        console.log(subject);
        console.log(itemEditing);
        console.log(accepted);
        console.log(this.state.deadline_at);
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td onClick={this.togglePopover} style={{cursor:"pointer"}}>{student.fullname}</td>
                <Modal isOpen={this.state.popoverOpen} toggle={this.togglePopover}>
                    <ModalHeader toggle={this.togglePopover}>Student Information</ModalHeader>
                    <ModalBody style={{marginLeft: "50px"}}>
                        <FormGroup className="row">
                            <Label for="idInfoFullname"><strong>Fullname: </strong></Label>
                            <div id="idInfoFullname" className="infoStudent">{student.fullname}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idInfoGrade"><strong>Grade: </strong></Label>
                            <div id="idInfoGrade" className="infoStudent">{student.grade}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idMssv"><strong>Student Code: </strong></Label>
                            <div id="idMssv" className="infoStudent">{student.mssv}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idEmail"><strong>Email: </strong></Label>
                            <div id="idEmail" className="infoStudent">{student.email}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idUserField"><strong>Professional: </strong></Label>
                            <div id="idUserField" className="infoStudent">{student.user_field}</div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.togglePopover}>Exit</Button>
                    </ModalFooter>
                </Modal>
                <td >{teacher.fullname}</td>
                <td>{subject.name}</td>
                <td>{subject.register_at}</td>
                <td>Waiting for acception</td>
                <td>
                    <i className="fas fa-check" style={{cursor:"pointer"}} onClick={() => this.onLoadItemEditing(subject, student.deadline_at)}></i>
                    <Form inline onSubmit={(e) => e.preventDefault()}>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Approval For Topic</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="idName">Topic name:</Label>
                                    <Input type="text" name="name" id="idName" ref="idName" value={this.state.name} style={{cursor:'not-allowed'}} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="idRegister">Register at:</Label>
                                    <Input type="text" name="register_at" id="idRegister" ref="idRegister" style={{cursor:'not-allowed'}} value={this.state.register_at} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="idDealine">Deadline at:<i style={{color:'red'}}>*</i></Label>
                                    <Input type="datetime-local" name="deadline_at" id="idDeadline" ref="idDeadline" onChange={this.onChange} value={this.state.deadline_at === null ? '': this.state.deadline_at} onBlur={this.onHandleBlur}/>
                                </FormGroup>
                            </ModalBody>
                            <ModalHeader style={{ marginLeft: '322px' }}>
                                <Button id="btn-save" type="submit" color="primary" className="btn btn-info" disabled={this.state.deadline_at === null || this.state.deadline_at === ''? true:false} onClick={()=>this.onSaveAcception(student.id)}>Save</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalHeader>
                        </Modal>
                    </Form>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing,
        accepted:state.accepted
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadSubjectBeAcception : (item) => {
            dispatch(actions.loadSubjectBeAcception(item));
        },
        onAccepted : (idStu,deadline_at) => {
            dispatch(actions.axiosAcceptTopic(idStu,deadline_at));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForAcceptItem);
