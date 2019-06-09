import React, { Component } from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form, FormGroup, Label, Input, FormText,Row, Col, Badge
} from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import toastr from 'toastr';

var $ = require("jquery");

class AddCommentBox extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            content_cmt: "",
            rating: 0,
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
    }

    componentWillReceiveProps(nextProps) {
        $("#send_comment").prop("disabled", false);
    }

    sendComment = (e) => {
        e.preventDefault();
        let content = this.refs.content_cmt.value;
        let product_id = this.props.product;
        let user_id = this.props.user;
        let rating = (this.state.rating + this.props.rating)/2;
        $("#send_comment").prop("disabled", true);
        this.props.userRatingProduct(product_id, Math.ceil(rating));
        this.props.userAddComment(content, product_id, user_id);
        this.setState({content_cmt: ""});
    }

    handleRating = (rating) => {
        for(var i=1; i<6; i++) {
            if(i == rating) {
                this.setState({rating: rating});
            }
        }
    }

    render() {
        var { product, user } = this.props; 
        var {rating} = this.state;
        return (
            <div className="modal fade" id="addComment" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Thêm đánh giá</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.sendComment}>
                                <div className="row" style={{ marginLeft: '0', marginRight: '0' }}>
                                    <label htmlFor="comment">Để lại đánh giá:</label>
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        id="comment"
                                        ref="content_cmt"
                                        onChange={this.onChange}
                                        value={this.state.content_cmt}
                                        name="content_cmt"></textarea>
                                </div>
                                <Row>
                                    <Col sm="12" style={{ color: 'white' }}>
                                        <Row >
                                            <Col sm="3">
                                            </Col>
                                            <Col sm="6" style={{ marginTop: '22px' }}>
                                                <div className="list_rating">
                                                    <Badge color="primary" style={{ marginRight: '5px', cursor: 'pointer', background: rating == 5 ? "red":"" }} onClick={() => this.handleRating(5)} id="star_5">5 sao</Badge>
                                                    <Badge color="secondary" style={{ marginRight: '5px', cursor: 'pointer', background: rating == 4 ? "red":"" }} onClick={() => this.handleRating(4)} id="star_4">4 sao</Badge>
                                                    <Badge color="success" style={{ marginRight: '5px', cursor: 'pointer', background: rating == 3 ? "red":"" }} onClick={() => this.handleRating(3)} id="star_3">3 sao</Badge>
                                                    <Badge color="danger" style={{ marginRight: '5px', cursor: 'pointer', background: rating == 2 ? "red":"" }} onClick={() => this.handleRating(2)} id="star_2">2 sao</Badge>
                                                    <Badge color="warning" style={{ marginRight: '5px', cursor: 'pointer', background: rating == 1 ? "red":"" }} onClick={() => this.handleRating(1)} id="star_1">1 sao</Badge>
                                                </div>
                                            </Col>
                                            <Col sm="3"></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className="row">
                                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    </div>
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                        <button
                                            className="btn btn-default"
                                            type="submit"
                                            id="send_comment"
                                        >Gửi</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCommentBox;
