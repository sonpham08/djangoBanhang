import React, { Component } from 'react';
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

class TeacherWaitingForAcceptItem extends Component {

    constructor(props){
        super(props);
        this.state={
            popoverOpen: false
        }
    }

    componentDidMount(){
    }

    togglePopover = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    render() {
        
        var {infoTopic}=this.props;
        if(infoTopic.length !==0){
            var elmInfoTopic = infoTopic.teacher[0]
        }
        if(elmInfoTopic.choose_by.length !== 0){
            var elmSubcribers= elmInfoTopic.choose_by[0]
        }
        console.log(elmSubcribers);

        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td onClick={this.togglePopover} style={{cursor:"pointer"}}>{elmSubcribers.fullname}</td>
                <Modal isOpen={this.state.popoverOpen} toggle={this.togglePopover}>
                    <ModalHeader toggle={this.togglePopover}>Student Information</ModalHeader>
                    <ModalBody style={{marginLeft: "50px"}}>
                        <FormGroup className="row">
                            <Label for="idInfoFullname"><strong>Fullname: </strong></Label>
                            <div id="idInfoFullname" className="infoStudent">{elmSubcribers.fullname}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idInfoGrade"><strong>Grade: </strong></Label>
                            <div id="idInfoGrade" className="infoStudent">{elmSubcribers.grade}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idMssv"><strong>Student Code: </strong></Label>
                            <div id="idMssv" className="infoStudent">{elmSubcribers.mssv}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idEmail"><strong>Email: </strong></Label>
                            <div id="idEmail" className="infoStudent">{elmSubcribers.email}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idUserField"><strong>Professional: </strong></Label>
                            <div id="idUserField" className="infoStudent">{elmSubcribers.user_field}</div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.togglePopover}>Exit</Button>
                    </ModalFooter>
                </Modal>
                <td>{elmInfoTopic.name}</td>
                <td>{elmInfoTopic.register_at}</td>
                <td>Waiting for acception</td>
            </tr>
        );
    }
}


export default TeacherWaitingForAcceptItem;
