import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import * as actions from './../../actions/index';
var $ = require("jquery");

class RegisterForm extends Component {

    constructor(props){
        super(props);
        this.state={
            selectTeacher:0,
            selectTopic:0,
        };
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value,
        });
    }

    onExitForm=()=>{
        this.props.onExitFormRegister();
    }

    onResetRegister=() => {
        this.props.onResetRegister();
    }

    onSave = (event) => {
        var {selectTeacher,selectTopic}=this.state;
        var {users}=this.props;
        event.preventDefault();
        // check for validate before save
        if(parseInt(selectTeacher) === 0 || !selectTeacher){
            toastr.warning("Please choose a Teacher for support" ,"Warning")
        }else{
            if(parseInt(selectTopic) === 0){
                toastr.warning("Please choose a topic" ,"Warning")
            }
            else{
                this.props.onRegisterTopic(users.id,parseInt(selectTopic));
                this.onResetRegister();
                this.onExitForm();
            }
        }
    }

    render() {
        var {listTeacherAndTopic}=this.props;
        console.log(listTeacherAndTopic);
        var elmListTeacherAndTopic = listTeacherAndTopic.list.map(list => {
            return (
                <option
                key={list.id}
                value={list.id}
                >{list.fullname}</option>
            )
        })

        var filterTopic= listTeacherAndTopic.list.filter(c => c.id === parseInt(this.state.selectTeacher));
        console.log(filterTopic);
        if(filterTopic.length !==0){
            var elmTopic1= filterTopic[0].subject.map(elmtopic1 => {
                return {
                    subjectfield:elmtopic1.subjectfield
                }
            });
            console.log(elmTopic1);
            var elmTopic2= elmTopic1[0].subjectfield.map( elmtopic2 => {
                return (
                    <option
                    key={elmtopic2.id}
                    value={elmtopic2.id}>{elmtopic2.name}</option>
                )
            })
        }
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                    Register topic
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave} >
                        <div className="form-group">
                            <label>Teacher :</label>
                            <select
                            className="form-control"
                            onChange={this.onHandleChange}
                            name="selectTeacher"
                            value={this.state.selectTeacher}
                            placeholder={'All'}
                            >
                            <option value="">No option</option>
                            {elmListTeacherAndTopic}
                            </select><br/>
                        </div>
                        <label>Topic :</label>
                        <select
                            className="form-control"
                            onChange={this.onHandleChange}
                            name="selectTopic"
                            value={this.state.selectTopic}
                            placeholder={'All'}
                        >
                        <option value="">Choose topic</option>
                        {elmTopic2}
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus"></span>Lưu Lại
                            </button>&nbsp;
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onRegisterTopic : (idUser,idSub) => {
            dispatch(actions.axiosRegisterTopic(idUser,idSub));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);
