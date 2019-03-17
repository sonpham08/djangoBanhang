import React, { Component } from 'react';
import {getStudentByFragment
    ,getSubjectByFragment
    ,getTeacherByFragment} from './../Utilities/utils';

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

class HistoryItem extends Component {

    constructor(props){
        super(props);
        this.state={
            openPopover: false
        }
    }

    togglePopover = () => {
        this.setState({
            openPopover: !this.state.openPopover
        })
    }

    render() {
        var {register}=this.props;
        var teacher= getTeacherByFragment(register);
        var subject= getSubjectByFragment(register);
        var student = getStudentByFragment(register);
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td onClick={this.togglePopover} style={{cursor:"pointer"}}>{student.fullname}</td>
                <Modal isOpen={this.state.openPopover} toggle={this.togglePopover}>
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
                <td>{teacher.fullname}</td>
                <td>{subject.name}</td>
                <td>{subject.register_at}</td>
                <td>{student.deadline_at}</td>
            </tr>
        );
    }
}

export default HistoryItem;
