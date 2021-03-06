import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import toastr from 'toastr';
var $ = require("jquery");

class ManageCustomer extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            tabAd: 1,
            name_customer: "",
            dataCustomerMain: []
        }
    }

    componentDidMount() {
        let tabAd = localStorage.getItem('tabAd') || 1;
        this.setState({ tabAd: tabAd });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.adcustomer);
        
        //data product with pagination
        this.dataCustomer = nextProps.adcustomer.map(
            (a, i) => a
        );
        this.setState({dataCustomerMain: this.dataCustomer});
        this.pageSizeCustomer = 10;
        this.pagesCountCustomer = Math.ceil(this.dataCustomer.length / this.pageSizeCustomer);
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

    openCoin = (user_id) => {
        this.props.openCoin(user_id);
        toastr.success("Bật chế độ kiếm xu cho người dùng thành công");
    }

    render() {
        const { currentPage, name_customer, dataCustomerMain } = this.state;
        
        if(name_customer != "") {
            this.dataCustomer = this.dataCustomer.filter((customer) => {
                return customer.username.toLowerCase().indexOf(name_customer.toLowerCase()) != -1;
            });
        } else {
            this.dataCustomer = dataCustomerMain;
        }
        if (this.props.tab == 5) {
            return (
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quản lý khách hàng</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form_cate_ad" style={{marginRight: '10px', marginTop: '0'}}>
                                <label>Tên khách hàng: </label>
                                <input type="text" className="form-control" name="name_customer" value={name_customer} onChange={this.onChange}/>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Họ và tên</th>
                                        <th style={{ textAlign: 'center' }}>Email</th>
                                        <th style={{ textAlign: 'right' }}>Số điện thoại</th>
                                        <th style={{ textAlign: 'center' }}>Địa chỉ</th>
                                        <th style={{ textAlign: 'right' }}>CMND</th>
                                        <th style={{ textAlign: 'right' }}>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.dataCustomer != undefined ?
                                        this.dataCustomer
                                            .slice(
                                                currentPage * this.pageSizeCustomer,
                                                (currentPage + 1) * this.pageSizeCustomer
                                            ).map((customer, i) =>
                                                <tr align="center" key={customer.id}>
                                                    <td>{customer.fullname}</td>
                                                    <td>{customer.email}</td>
                                                    <td>{customer.phone}</td>
                                                    <td>{customer.address}</td>
                                                    <td>{customer.cmnd}</td>
                                                    <td style={{ cursor: 'pointer' }}>
                                                        <a onClick={() => this.openAddFormProduct()}>Sửa</a>
                                                        {/* <a onClick={() => this.deleteProduct()}>   Xóa</a> */}
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
                                    {[...Array(this.pagesCountCustomer)].map((page, i) =>
                                        <PaginationItem active={i === currentPage} key={i}>
                                            <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem disabled={currentPage >= this.pagesCountCustomer - 1}>
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
            )
        }
        return null;
    }
}


export default ManageCustomer;
