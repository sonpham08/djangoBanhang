import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import * as actions from './../../actions/index';
var $ = require("jquery");

class EditInfoForm extends Component {

    constructor(props){
        super(props);
        this.state={

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
                            <input
                            className="form-control"
                            onChange={this.onHandleChange}
                            name="selectTeacher"
                            value={this.state.selectTeacher}
                            placeholder={'All'}
                            />
                            <br/>
                        </div>
                        <label>Topic :</label>
                        <input
                            className="form-control"
                            onChange={this.onHandleChange}
                            name="selectTopic"
                            value={this.state.selectTopic}
                            placeholder={'All'}
                        /><br/>
                        <div className="text-center">
                            <input
                            type="submit"
                            value="Save"
                            />
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditInfoForm);
