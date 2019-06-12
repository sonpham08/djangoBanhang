import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';

class ManageCoin extends Component {
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
        this.dataCoin = nextProps.coin.map(
            (a, i) => a
        );
        this.pageSizeCoin = 5;
        this.pagesCountCoin = Math.ceil(this.dataCoin.length / this.pageSizeCoin);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    render() {
        const { currentPage } = this.state;
        if (this.props.tab == 8) {
            return (
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">

                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quản lý xu</h3>
                        </div>
                        <div className="panel-body">
                            {/* <div className="form_handle_manage_ad">

                                <button type="button" className="btn btn-success" onClick={this.props.toggleAddForm}><i className="fas fa-plus"></i> Thêm xu</button>
                            </div> */}
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã xu</th>
                                        <th>Chủ sở hữu</th>
                                        <th>Số xu</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.dataCoin != undefined ?
                                            this.dataCoin
                                                .slice(
                                                    currentPage * this.pageSizeCoin,
                                                    (currentPage + 1) * this.pageSizeCoin
                                                )
                                                .map((coin, idx) =>
                                                    <tr key={idx}>
                                                        <td>{coin.coin_id}</td>
                                                        <td>{coin.user[0].fullname}</td>
                                                        <td>{coin.count}</td>
                                                        {/* <td>
                                                            <button type="button" className="btn btn-default mg-left" >
                                                                <i className="fas fa-edit"></i> Sửa</button>
                                                            <button type="button" className="btn btn-danger mg-left" >
                                                                <i className="fas fa-trash"></i> Xóa</button>
                                                        </td> */}
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
                                    {[...Array(this.pagesCountCoin)].map((page, i) =>
                                        <PaginationItem active={i === currentPage} key={i}>
                                            <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem disabled={currentPage >= this.pagesCountCoin - 1}>
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

                    {/* <AddStaffShip
                        openAddForm={this.props.openAddForm}
                        staffship={this.props.staffship}
                        closeAddForm={this.props.closeAddForm}
                        addStaffship={this.props.addStaffship}
                        onSaveCategory={this.props.onSaveCategory}
                        editStaffship={this.props.editStaffship} /> */}
                </div>

            )
        }
        return null;
    }
}


export default ManageCoin;
