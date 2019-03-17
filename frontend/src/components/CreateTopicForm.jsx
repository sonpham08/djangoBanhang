import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

import {makeNewListTeacher} from './../Utilities/utils';
import {ListField} from './../constants/ListField';
var $ = require("jquery");

class CreateTopicForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicName:'',
            listTeacher:[]
        };
    }

    componentWillMount(){
        this.props.axiosGetListTeachers();
        this.setState({
            listTeacher: this.props.listTeacher
        })
    }

    componentWillReceiveProps(nextprops){
        if(nextprops && nextprops.listTeacher){
            this.setState({
                listTeacher: nextprops.listTeacher
            })
        }
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
    }

    onSelectField = (event) => {
        var newListTeacher= makeNewListTeacher(this.props.listTeacher);
        const filterListTeacher = newListTeacher.filter(c => c.index === parseInt(event.target.value));
        this.setState({
            listTeacher: {
                data: {
                    teachers: filterListTeacher
                }
            }
        })
    }

    render() {
        if(this.state.listTeacher.length !== 0){
            var getOptionListField = ListField.list.map ((field, idx) => {
                return (
                    <option key={idx} value={field.id}>{field.name}</option>
                )
            });
            
            var getOptionTeacherList= this.state.listTeacher.data.teachers.map((teacher,idx)=>{
                return (
                    <option key={idx} value={teacher.id}>{teacher.username}</option>
                )
            })
        }
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                Field Topic
                            </h3>
                        </div>
                        <hr/>
                        <div className="panel-body">
                            <form onSubmit={this.onSave} >
                                <div className="form-group">
                                    <label>Available Topic:</label>
                                    <select
                                        className="form-control"
                                        name="availableTopic"
                                        id="availableTopic"
                                        onChange={this.onSelectField}
                                    >
                                    <option>Select Field</option>
                                    {getOptionListField}
                                    </select>
                                </div>
                                <label>Teacher management:</label>
                                <select
                                    className="form-control"
                                    // value={this.state.teachers}
                                    onChange={this.onHandleChange}
                                    name="teachers"
                                    id="teachers"
                                >
                                {getOptionTeacherList}
                                </select><br />
                                
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listTeacher:state.listTeacher,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        axiosGetListTeachers: () => {
            dispatch(actions.axiosGetListTeachers());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopicForm);
