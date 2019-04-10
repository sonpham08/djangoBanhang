import React, { Component } from 'react';

var $ = require("jquery");

class Message extends Component {
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
            <div>

            </div>
        );
    }
}


export default Message;
