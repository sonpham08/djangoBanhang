import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TopicForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            create_by: 0
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
            id: "",
            name: "",
            create_by: 0
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                Create Field Topic
                            </h3>
                        </div>
                        <hr/>
                        <div className="panel-body">
                            <form onSubmit={this.onSave} >
                                <div className="form-group">
                                    <label>Topic Field Name :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                <label>Teacher management:</label>
                                <select
                                    className="form-control"
                                    value={this.state.create_by}
                                    onChange={this.onHandleChange}
                                    name="create_by"
                                >
                                    <option value={true}>Kích Hoạt</option>
                                    <option value={false}>Ẩn</option>
                                </select><br />
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning">
                                        <span className="fa fa-plus"></span>Save
                            </button>&nbsp;
                            <button type="button" onClick={this.onClear} className="btn btn-danger">
                                        <span className="fa fa-close"></span>Cancle
                            </button>
                                </div>
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
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
