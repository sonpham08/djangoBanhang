import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { data } from '../../constants/data';
import AddCategory from './AddCategory';
var $ = require("jquery");

class ManageCategory extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        //data product with pagination
        this.dataCategory = nextProps.adcategories.map(
            (a, i) => a
        );
        this.pageSizeCategory = 6;
        this.pagesCountCategory = Math.ceil(this.dataCategory.length / this.pageSizeCategory);
    }

    openFormEditCategory = (category) => {
        // this.setState({ openAddForm: !this.state.openAddForm });
        this.props.openFormEditCategory(category);
    }

    deleteCatgory = (category_id) => {
        if (window.confirm("Are you sure to delete this category ? ")) {
            this.props.deleteCategory(category_id);
        }

    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    render() {
        var { currentPage } = this.state;
        if(this.props.tab == 4) {
            return (
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quản lý dạnh mục loại hàng</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form_handle_manage_ad">
    
                                <button type="button" className="btn btn-success" onClick={this.props.toggleAddForm}>
                                    <i className="fas fa-plus"></i> Thêm danh mục</button>
    
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>ID</th>
                                        <th style={{ textAlign: 'center' }}>Tên danh mục</th>
                                        <th style={{ textAlign: 'right' }}>Hiệu chỉnh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.dataCategory != undefined ?
                                        this.dataCategory
                                            .slice(
                                                currentPage * this.pageSizeCategory,
                                                (currentPage + 1) * this.pageSizeCategory
                                            ).map((category, i) =>
                                                <tr align="center" key={category.category_id}>
                                                    <td>{category.category_id}</td>
                                                    <td>{category.name}</td>
                                                    <td align="right">
                                                        <button type="button" className="btn btn-default mg-left" onClick={() => this.openFormEditCategory(category)}>
                                                            <i className="fas fa-edit"></i> Sửa</button>
                                                        <button type="button" className="btn btn-danger mg-left" onClick={() => this.deleteCatgory(category.category_id)}>
                                                            <i className="fas fa-trash"></i> Xóa</button>
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
                                    {[...Array(this.pagesCountCategory)].map((page, i) =>
                                        <PaginationItem active={i === currentPage} key={i}>
                                            <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem disabled={currentPage >= this.pagesCountCategory - 1}>
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
                    <AddCategory
                        openAddForm={this.props.openAddForm}
                        category={this.props.category}
                        closeAddForm={this.props.closeAddForm}
                        addCategory={this.props.addCategory}
                        onSaveCategory={this.props.onSaveCategory}
                    />
                </div>
            );
        }
        return null;
    }
}

export default ManageCategory;
