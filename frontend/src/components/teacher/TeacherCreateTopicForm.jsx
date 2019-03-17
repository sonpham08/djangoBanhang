import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import toastr from 'toastr';

var $ = require("jquery");

class TeacherCreateTopicForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicName:'',
        };
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }


    onClear = () => {
        this.setState({
            topicName:''
        });
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onCreateTopic(this.state.topicName);
        this.onClear();
        this.props.closeForm();
        this.props.onSave();
        
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                Create Topic
                            </h3>
                        </div>
                        <hr/>
                        <div className="panel-body">
                            <form onSubmit={this.onSave} >
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="topicName"
                                        value={this.state.topicName}
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning">
                                        <span className="fa fa-plus"></span> Save
                            </button>&nbsp;
                            <button type="button" onClick={this.onClear} className="btn btn-danger">
                                        <span className="fa fa-times"></span> Cancle
                            </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subjects:state.subjects,
        isDisplayForm:state.isDisplayForm
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        closeForm: () => {
            dispatch(actions.closeForm());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCreateTopicForm);
