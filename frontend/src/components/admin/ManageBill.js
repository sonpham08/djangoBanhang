import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import moment from 'moment';
import 'moment-timezone';
var $ = require("jquery");

class ManageBill extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        //data product with pagination
        console.log(nextProps);
        
        this.dataBill = nextProps.detail.map(
            (a, i) => a
        );
        this.pageSizeBill = 7;
        this.pagesCountBill = Math.ceil(this.dataBill.length / this.pageSizeBill);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
    }

    render() {
        var { currentPage } = this.state;
        var { adcustomer, adstaffship } = this.props;
        var listDetails = [];
        
        if (this.dataBill != undefined) {
            listDetails = this.dataBill
                .slice(
                    currentPage * this.pageSizeBill,
                    (currentPage + 1) * this.pageSizeBill)
                .map((EachDetail, idx) => {
                    let user = adcustomer[adcustomer.findIndex(obj => obj.id == EachDetail.user)].fullname;
                    let staffs = adstaffship[adstaffship.findIndex(obj => obj.staff_id == EachDetail.bill.staff)].name;
                    let timestamp = moment(EachDetail.bill.create_date).unix();
                    let date = moment(timestamp).format("MM/DD/YYYY HH:mm");
                    return (
                        <tr key={idx}>
                            <td>{EachDetail.bill.bill_id}</td>
                            <td>{user}</td>
                            <td>{date}</td>
                            <td>{EachDetail.bill.status_product == 1 ? "Chưa thanh toán" : (EachDetail.bill.status_product == 2 ? "Đã giao hàng" : "Đang giao hàng")}</td>
                            <td align={"center"}>
                                {EachDetail.bill.status_product == 1 ? <i
                                    className="fas fa-caret-down"
                                    data-toggle="modal" data-target="#detailmodal"
                                    onClick={() => this.showDetailProduct(EachDetail.product, EachDetail.bill)}
                                ></i> :
                                    (EachDetail.bill.status_product == 2) ?
                                        <i className="fas fa-check"></i> : <i className="fas fa-exchange-alt"></i>
                                }
                            </td>
                            <td>{staffs}</td>
                            {/* <td align="right">
                                <button type="button" className="btn btn-default mg-left"
                                    onClick={() => this.changeStatusProduct(EachDetail.bill.bill_id, EachDetail.bill.staff, 2)}>
                                    <i className="fas fa-edit"></i> Sửa</button>
                                <button type="button" className="btn btn-danger mg-left"
                                    disabled={EachDetail.bill.status_product == 1 ? false : true}
                                    onClick={() => this.deleteBill(EachDetail.bill.bill_id)}
                                >
                                    <i className="fas fa-trash"></i> Xóa</button>
                            </td> */}
                        </tr>
                    )
                });
        }
        if (this.props.tab == 6) {
            return (
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quản lý các đơn hàng đã được giao</h3>
                        </div>
                        <div className="panel-body">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Người mua</th>
                                        <th>Ngày đặt</th>
                                        <th>Tình trạng</th>
                                        <th>Chi tiết đơn hàng</th>
                                        <th>Nhân viên giao hàng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listDetails}
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
                                    {[...Array(this.pagesCountBill)].map((page, i) =>
                                        <PaginationItem active={i === currentPage} key={i}>
                                            <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem disabled={currentPage >= this.pagesCountBill - 1}>
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
                </div>
            );
        }
        return null;
    }
}

export default ManageBill;
