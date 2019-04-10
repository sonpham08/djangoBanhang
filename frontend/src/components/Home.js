import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header';
import MenuCategory from './MenuCategory';
import ProductList from './product/ProductList';
import ProductListPC from './product/ProductListPC';
import * as authActions from '../actions/authActions';

var $ = require("jquery");

class Home extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            tab: 0, // 0: Waiting for accept list, 1: createfield, 2: approval history
            resetAccepted: false
        }
    }

    getUserInfo = () => {
        this.props.authActions.getUserInfo();
    }

    logout = () => {
        this.props.authActions.logout();
    }

    render() {
        var {isAuthenticated,user} = this.props;
        return (
            <div style={{background:'gainsboro'}}>
                <Header
                isAuthenticated={isAuthenticated}
                user={user}
                getUserInfo={this.getUserInfo}
                logout={this.logout}
                />
                <MenuCategory />
                <div className="body" style={{ marginTop: '150px', padding: '5px 40px' }}>
                   
                    <div className="row">
                        <ProductList/>
                    </div>

                    <div className="row">
                        <ProductListPC/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
