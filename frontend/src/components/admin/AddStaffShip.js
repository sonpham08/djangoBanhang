import React, { Component } from 'react';

var $ = require("jquery");

class AddStaffShip extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            category_name: ""
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    addCategory = (e) => {
        e.preventDefault();
        if(this.props.category.category_id == undefined) {
            this.props.addCategory(this.state.category_name);
            this.props.closeAddForm();
        } else {
            let newCategory = {
                category_id: this.props.category.category_id,
                name: this.refs.category_name.value
            };
            this.props.onSaveCategory(newCategory);
            this.props.closeAddForm();
        }
        
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
        this.setState({
            flag_for_msg: false,
        });
    }

    closeAddForm = () => {
        this.props.closeAddForm();
        this.setState({category_name: ""});
    }

    render() {
        if(this.props.openAddForm == false) return null;
            return (
                <div>            
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                                <h3 className="panel-title">{this.props.category.category_id == undefined ? "Thêm danh mục":"Chỉnh sửa danh mục"}</h3>
                        </div>
                        <div className="panel-body">
                                
                                <form onSubmit={this.addCategory} method="POST" className="form-horizontal" role="form">
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Tên danh mục: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input type="text" className="form-control" ref="category_name" onChange={this.onChange}
                                            name="category_name"
                                            value={this.state.category_name}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-10 col-sm-offset-2">
                                            <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                            style={{float: 'right', marginLeft:'10px'}}
                                            >Lưu thay đổi</button>
                                            <button 
                                            type="button" 
                                            className="btn btn-default" 
                                            style={{float: 'right'}}
                                            onClick={this.props.closeAddForm}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </form>   
                        </div>
                    </div>               
                </div>
        );
    }
}

export default AddStaffShip;
