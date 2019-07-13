import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import AddStaff from './AddStaff';
var $ = require("jquery");

class ManageStaff extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            tabAd: 1,
            name_staff: "",
            dataStaffMain: []
        }
    }

    componentDidMount() {
        let tabAd = localStorage.getItem('tabAd') || 1;
        this.setState({ tabAd: tabAd });
    }

    componentWillReceiveProps(nextProps) {
        //data product with pagination
        this.dataStaff = nextProps.adstaff.map(
            (a, i) => a
        );
        this.setState({dataStaffMain: this.dataStaff});
        this.pageSizeStaff = 7;
        this.pagesCountStaff = Math.ceil(this.dataStaff.length / this.pageSizeStaff);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    openFormEditStaff = (staff) => {
        this.props.openFormEditStaff(staff);
    }

    openFormChangePass = (staff) => {
        this.props.openFormChangePass(staff);
    }

    deleteStaff = (id) => {
        if (window.confirm("Are you sure to delete this staff ? ")) {
            this.props.deleteStaff(id);
        }
    }

    onSaveChangeStaff = (staff) => {
        this.props.onSaveChangeStaff(staff);
    }

    closeEditForm = () => {
        this.props.closeAddForm();
    }

    closeChangeForm = () => {
        this.props.closeChangeForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
        // this.props.onSearchByName(value);
    }

    render() {
        const { currentPage, name_staff, dataStaffMain } = this.state;
        console.log(this.dataStaff);
        
        if(name_staff != "") {
            this.dataStaff = this.dataStaff.filter((staff) => {
                return staff.username.toLowerCase().indexOf(name_staff.toLowerCase()) != -1;
            });
        } else {
            this.dataStaff = dataStaffMain;
        }
        if (this.props.tab == 2) {
            return (
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quản lý nhân viên</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form_handle_manage_ad">
                
                                <button type="button" className="btn btn-success" onClick={this.props.toggleAddForm}>
                                    <i className="fas fa-plus"></i> Thêm nhân viên</button>
                                
                            </div>
                            <div className="form_cate_ad" style={{marginRight: '10px'}}>
                                <label>Tên nhân viên: </label>
                                <input type="text" className="form-control" name="name_staff" value={name_staff} onChange={this.onChange}/>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Họ và tên</th>
                                        <th style={{ textAlign: 'center' }}>Email</th>
                                        <th style={{ textAlign: 'right' }}>Số điện thoại</th>
                                        <th style={{ textAlign: 'center' }}>Địa chỉ</th>
                                        <th style={{ textAlign: 'right' }}>CMND</th>
                                        <th style={{ textAlign: 'center' }}>Hiệu chỉnh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.dataStaff != undefined ?
                                        this.dataStaff
                                            .slice(
                                                currentPage * this.pageSizeStaff,
                                                (currentPage + 1) * this.pageSizeStaff
                                            ).map((staff, i) =>
                                                <tr align="center" key={staff.id}>
                                                    <td>{staff.fullname}</td>
                                                    <td>{staff.email}</td>
                                                    <td>{staff.phone}</td>
                                                    <td>{staff.address}</td>
                                                    <td>{staff.cmnd}</td>
                                                    {/* <td align="right">
                                                        <button type="button" className="btn btn-default mg-left" onClick={() => this.openFormEditStaff(staff)}>
                                                            <i className="fas fa-edit"></i> Sửa</button>
                                                        <button type="button" className="btn btn-danger mg-left" onClick={() => this.deleteStaff(staff.id)}>
                                                            <i className="fas fa-trash"></i> Xóa</button>
                                                    </td> */}
                                                    <td style={{ cursor: 'pointer' }}>
                                                        <a onClick={() => this.openFormEditStaff(staff)}>Sửa</a>
                                                        {/* <a onClick={() => this.deleteStaff(staff.id)}>  |   Xóa</a> */}
                                                    </td>
                                                </tr>
                                            ) : <tr></tr>
                                    }
                                </tbody>
                            </table>

                        </div>
                        <React.Fragment>
                            <div className="pagination-wrapper">
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem disabled={currentPage <= 0}>
                                        <PaginationLink
                                            onClick={e => this.handleSwitchPagination(e, currentPage - 1)}
                                            previous
                                            href="#"
                                        />
                                    </PaginationItem>
                                    {[...Array(this.pagesCountStaff)].map((page, i) =>
                                        <PaginationItem active={i === currentPage} key={i}>
                                            <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem disabled={currentPage >= this.pagesCountStaff - 1}>
                                        <PaginationLink
                                            onClick={e => this.handleSwitchPagination(e, currentPage + 1)}
                                            next
                                            href="#"
                                        />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                        </React.Fragment>
                    </div>
                    <AddStaff
                    // openEditForm={this.state.openEditForm}
                    staff={this.props.staff}
                    closeEditForm={this.closeEditForm}
                    onSaveChangeStaff={this.onSaveChangeStaff}
                    openAddForm={this.props.openAddForm}
                    addStaff={this.props.addStaff}
                    />
                </div>
            )
        }
        return null;
    }
}


export default ManageStaff;
