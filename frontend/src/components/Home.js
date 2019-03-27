import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import MenuCategory from './MenuCategory';
import ProductList from './product/ProductList';
import ProductListPC from './product/ProductListPC';

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

    render() {
        
        return (

            <div style={{background:'silver'}}>
                <Header/>
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


export default Home;
