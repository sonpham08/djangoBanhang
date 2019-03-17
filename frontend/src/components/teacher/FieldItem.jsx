import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import toastr from 'toastr';
import {Button, 
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
    Label,
    Input,
    FormGroup,
    } from 'reactstrap';

class FieldItem extends Component {

    constructor(props){
        super(props);
        this.state={
            modal:false,
            item:{
                name:""
            },
            register: false
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops && nextprops.itemTopics){
            this.setState({
                item:{
                    name: nextprops.itemTopics.name,
                    register: nextprops.registeredornot
                }
            })
        }
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name =  target.name;
        var value =target.value;
        if(name==="name"){
            this.setState({
                item:{
                    name: value
                }
            })
        }else{
            this.setState({
                [name]:value
            })
        }
        console.log(this.state);
    }


    toggleFormEdit = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    openFormEdit = () => {
        this.setState({
            modal: true
        })
    }

    closeFormEdit = () => {
        this.setState({
            modal: false
        })
    }

    onDeleteTopic=(id)=>{
        //check if topic is being registered , it wont be delete
        this.props.onCheckTopicRegisteredOrNot(id);
        if(this.state.register === true){
            console.log('khong duoc xoa');
        }
        //this.props.onDeleteTopic(id);
    }

    onEditTopic= (field) =>{
        // e.preventDefault();
        this.props.onEditTopic(field);
        this.openFormEdit();
    }

    onSave = (id) => {
        console.log(id);
        var {itemTopics}=this.props;
        // console.log(this.state.name);
        let newItem= {
            id: itemTopics.id,
            name: this.state.item.name  //new name
        }
        console.log(newItem);
        this.props.onSaveEditTopic(newItem);
        this.props.onResetTopicOfTeacherBeRegister();
        this.closeFormEdit();
    }

    render() {
        var {field}=this.props;
        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td>{field.name}</td>
                <td className="btn-action">
                        <span className="badge badge-primary" style={{cursor:"pointer"}} onClick={() => this.onEditTopic(field)}>Edit</span>
                        <Form inline onSubmit={(e) => e.preventDefault()}>
                            <Modal isOpen={this.state.modal} toggle={this.toggleFormEdit}>
                                <ModalHeader toggle={this.toggleFormEdit}>Edit Topic</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="idName">Topic name:</Label>
                                        <Input type="text" name="name" id="idName" ref="idName" onChange={this.onHandleChange} value={this.state.item.name}/>
                                    </FormGroup>
                                </ModalBody>
                                <ModalHeader style={{marginLeft: '322px'}}>
                                    <Button type="submit" color="primary" className="btn btn-info" onClick={this.onSave}>Save</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleFormEdit}>Cancel</Button>
                                </ModalHeader>
                            </Modal>
                        </Form>
                        &nbsp;
                        {/* <span className="badge badge-danger" onClick={()=>this.onDeleteTopic(field.id)}  style={{cursor:"pointer"}}>Delete</span> */}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemTopics : state.itemTopics,
        registeredornot: state.registeredornot
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onEditTopic: (item) => {
            dispatch(actions.loadItemEdit(item));
        },
        onSaveEditTopic : (item) => {
            dispatch(actions.axiosEditTopic(item));
        },
        onCheckTopicRegisteredOrNot : (id) => {
            dispatch(actions.checkTopicRegisteredOrNot(id));
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(FieldItem);
