import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {data} from '../../constants/data';
import { bindActionCreators } from 'redux';

var $ = require("jquery");

class SpecialDaySale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        };
    }

    componentWillMount() {
        this.dataSet = data.map(
            (a,i) => a
        )
        this.pageSize = 4;
        this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);

    }

    handleSwitchPagination(e, index) {

        e.preventDefault();

        this.setState({
            currentPage: index
        });

    }

    onLogout = () => {
        this.props.authActions.logout();
        window.location.reload(true);
    }

    render() {
        const { currentPage } = this.state;
        return (
            <div className="product-list">
                <div className="panel panel-default" style={{ border: 'none' }}>
                    <div className="panel-body" style={{ background: 'gainsboro', padding: '0' }}>
                        <div className="row" key={data.id}>
                            {this.dataSet
                            .slice(
                                currentPage * this.pageSize,
                                (currentPage + 1) * this.pageSize
                            )
                            .map((data, i) =>           
                                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel" key={i}>
                                    <img src={data.img} className="img-responsive" alt="Image"/>
                                    <p>{data.title}</p>
                                    <h4>{data.price}vnd</h4>
                                    <h5><strike>{data.price}vnd</strike> 
                                    <span className="label label-danger" style={{float: 'right'}}>15/8-20/8</span>
                                    </h5>
                                </div>
                            )}
                        </div>
                    </div>
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
                            {[...Array(this.pagesCount)].map((page, i) =>
                                <PaginationItem active={i === currentPage} key={i}>
                                    <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
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
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        // onTryAutoSignup: () => {
        //     dispatch(actions.authCheckState());
        // },
        // onLogout: () => {
        //     dispatch(actions.logout());
        // }
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDaySale);
