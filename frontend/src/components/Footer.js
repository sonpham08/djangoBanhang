import React, { Component } from 'react';
var $ = require("jquery");


class Footer extends Component {
    render() {
        return (
            <section id="footer">
                <div className="container">
                    <div className="row text-center text-xs-center text-sm-left text-md-left">
                        <div className="col-xs-12 col-sm-2 col-md-2">
                            {/* <h5>Quick links</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Home</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>About</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Videos</a></li>
                            </ul> */}
                        </div>
                        <div className="col-xs-12 col-sm-8 col-md-8">
                            <h5>Liên hệ với chúng tôi</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i> <strong>Giờ làm việc:</strong> Thứ 2 - Thứ 7: 8h00 đến 17h30, Chủ Nhật làm việc.</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>  <strong>Email bán hàng:</strong> gunstore.com</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i> <strong>Số điện thoại bán hàng:</strong> 0339157154</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i> <strong>Facebook Hỏi - Đáp kỹ thuật:</strong> https://www.facebook.com/profile.php?id=100009367567639</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i> <strong>Liên hệ WebDeveloper:</strong> gunmap08@gmail.com</a></li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-sm-2 col-md-2">
                            {/* <h5>Quick links</h5>
                            <ul className="list-unstyled quick-links">
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Home</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>About</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                                <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                                <li><a href="https://wwwe.sunlimetech.com" title="Design and developed by"><i className="fa fa-angle-double-right"></i>Imprint</a></li>
                            </ul> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                            <p><u><a href="https://www.nationaltransaction.com/">National Transaction Corporation</a></u> is a Registered MSP/ISO of Elavon, Inc. Georgia [a wholly owned subsidiary of U.S. Bancorp, Minneapolis, MN]</p>
                            <p className="h6">&copy All right Reversed.<a className="text-green ml-2" href="https://www.sunlimetech.com" target="_blank">Sunlimetech</a></p>
                        </div>
                        <hr />
                    </div>
                </div>
            </section>
        )
    }
}

export default Footer;
