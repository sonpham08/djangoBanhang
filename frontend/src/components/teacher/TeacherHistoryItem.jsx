import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class TeacherHistoryItem extends Component {

    constructor(props){
        super(props);
        this.state={
            popoverOpen: false
        }
    }

    togglePopover = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    render() {
        var {register} = this.props;
        console.log(register);
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td onClick={this.togglePopover} style={{cursor:"pointer"}}>{register[0].choose_by[0].fullname}</td>
                <Modal isOpen={this.state.popoverOpen} toggle={this.togglePopover}>
                    <ModalHeader toggle={this.togglePopover}>Student Information</ModalHeader>
                    <ModalBody style={{marginLeft: "50px"}}>
                        <FormGroup className="row">
                            <Label for="idInfoFullname"><strong>Fullname: </strong></Label>
                            <div id="idInfoFullname" className="infoStudent">{register[0].choose_by[0].fullname}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idInfoGrade"><strong>Grade: </strong></Label>
                            <div id="idInfoGrade" className="infoStudent">{register[0].choose_by[0].grade}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idMssv"><strong>Student Code: </strong></Label>
                            <div id="idMssv" className="infoStudent">{register[0].choose_by[0].mssv}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idEmail"><strong>Email: </strong></Label>
                            <div id="idEmail" className="infoStudent">{register[0].choose_by[0].email}</div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="idUserField"><strong>Professional: </strong></Label>
                            <div id="idUserField" className="infoStudent">{register[0].choose_by[0].user_field}</div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.togglePopover}>Exit</Button>
                    </ModalFooter>
                </Modal>
                <td>{register[0].name}</td>
                <td>{register[0].register_at}</td>
                <td>{register[0].choose_by[0].deadline_at}</td>
                <td>Accepted</td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHistoryItem);
