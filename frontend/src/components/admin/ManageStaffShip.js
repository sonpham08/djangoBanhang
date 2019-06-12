import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import AddStaffShip from './AddStaffShip';

class ManageShip extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            tabAd: 1
        }
    }

    componentDidMount() {
        let tabAd = localStorage.getItem('tabAd') || 1;
        this.setState({ tabAd: tabAd });
    }

    componentWillReceiveProps(nextProps) {
        //data staff ship with pagination
        console.log(nextProps.adstaffship);
        this.dataStaffShip = nextProps.adstaffship.map(
            (a, i) => a
        );
        this.pageSizeStaffShip = 5;
        this.pagesCountStaffShip = Math.ceil(this.dataStaffShip.length / this.pageSizeStaffShip);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    openAddFormStaffShip = (staff) => {
        this.props.openAddFormStaffShip(staff);
    }

    deleteStaffShip = (staff_id) => {
        if (window.confirm("Are you sure to delete this category ? ")) {
            this.props.deleteStaffShip(staff_id);
        } 
    }

    render() {
        const { currentPage } = this.state;
        if (this.props.tab == 7) {
            return (
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">

                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quản lý nhân viên giao hàng</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form_handle_manage_ad">

                                <button type="button" className="btn btn-success" onClick={this.props.toggleAddForm}><i className="fas fa-plus"></i> Thêm nhân viên</button>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Tên nhân viên</th>
                                        <th>Số điện thoại</th>
                                        <th>Nhà vận chuyển</th>
                                        <th>Hiệu chỉnh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.dataStaffShip != undefined ?
                                            this.dataStaffShip
                                                .slice(
                                                    currentPage * this.pageSizeStaffShip,
                                                    (currentPage + 1) * this.pageSizeStaffShip
                                                )
                                                .map((staff, idx) =>
                                                    <tr key={idx}>
                                                        <td>{staff.name}</td>
                                                        <td>{staff.phone}</td>
                                                        <td>{staff.transporter[0].name}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-default mg-left" onClick={() => this.openAddFormStaffShip(staff)}>
                                                                <i className="fas fa-edit"></i> Sửa</button>
                                                            {/* <button type="button" className="btn btn-danger mg-left" onClick={() => this.deleteStaffShip(staff.staff_id)}>
                                                                <i className="fas fa-trash"></i> Xóa</button> */}
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
                                    {[...Array(this.pagesCountStaffShip)].map((page, i) =>
                                        <PaginationItem active={i === currentPage} key={i}>
                                            <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem disabled={currentPage >= this.pagesCountStaffShip - 1}>
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

                    <AddStaffShip
                        openAddForm={this.props.openAddForm}
                        staffship={this.props.staffship}
                        transporter={this.props.transporter}
                        closeAddForm={this.props.closeAddForm}
                        addStaffship={this.props.addStaffship}
                        onSaveCategory={this.props.onSaveCategory}
                        editStaffship={this.props.editStaffship} />
                </div>

            )
        }
        return null;
    }
}


export default ManageShip;
