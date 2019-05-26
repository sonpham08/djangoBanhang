import React, { Component } from 'react';

var $ = require("jquery");

class AddStaffShip extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            staffship_name: "",
            staffship_phone: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.staffship.name != undefined) {
            this.setState({
                staffship_name: nextProps.staffship.name,
                staffship_phone: nextProps.staffship.phone
            });
        } else {
            this.setState({ staffship_name: "", staffship_phone: "" });
        }
    }

    addStaffship = (e) => {
        e.preventDefault();
        if (this.props.staffship.name == undefined) {
            this.props.addStaffship(this.state.staffship_name, this.state.staffship_phone,
            this.refs.choose_transporter.value);
            this.props.closeAddForm();
        } else {
            let newStaffship = {
                id: this.props.staffship.staff_id,
                name: this.refs.staffship_name.value,
                phone: this.refs.staffship_phone.value,
                transporter: this.refs.choose_transporter.value
            };
            this.props.editStaffship(newStaffship);
            this.props.closeAddForm();
        }

    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    closeAddForm = () => {
        this.props.closeAddForm();
        this.setState({ staffship_name: "", staffship_phone: "" });
    }

    render() {
        if (this.props.openAddForm == false) return null;
        return (
            <div>
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.staffship.name == undefined ? "Thêm nhân viên giao hàng" : "Chỉnh sửa nhân viên giao hàng"}</h3>
                    </div>
                    <div className="panel-body">

                        <form onSubmit={this.addStaffship} method="POST" className="form-horizontal" role="form">
                            <div className="form-group">
                                <div className="col-md-1">
                                    <label>Tên nhân viên: </label>
                                </div>
                                <div className="col-md-11">
                                    <input type="text" className="form-control" ref="staffship_name" onChange={this.onChange}
                                        name="staffship_name"
                                        value={this.state.staffship_name} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-1">
                                    <label>Số điện thoại: </label>
                                </div>
                                <div className="col-md-11">
                                    <input type="text" className="form-control" ref="staffship_phone" onChange={this.onChange}
                                        name="staffship_phone"
                                        value={this.state.staffship_phone} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-1">
                                    <label>Nhà vận chuyển: </label>
                                </div>
                                <div className="col-md-11">
                                    <select name="" id="input" className="form-control" required="required" ref="choose_transporter">
                                        <option value={-1}>All</option>
                                        {
                                            this.props.transporter.map((transporter, idx) =>
                                                <option key={idx} value={transporter.transporter_id}>{transporter.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-10 col-sm-offset-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ float: 'right', marginLeft: '10px' }}
                                    >Lưu thay đổi</button>
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        style={{ float: 'right' }}
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
