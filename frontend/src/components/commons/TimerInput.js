import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { data } from '../../constants/data';

var $ = require("jquery");

class TimerInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: '00',
            value: '',
            isClicked : false
        }
    }

    handleChange(event) {
        this.setState({
          value: event.target.value
        })
    }

    tick() {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);
    
        this.setState({
          value: min,
          seconds: sec,
        })
    
        if (sec < 10) {
          this.setState({
            seconds: "0" + this.state.seconds,
          })
    
        }
    
        if (min < 10) {
          this.setState({
            value: "0" + min,
          })
    
        }
    
        if (min === 0 & sec === 0) {
          clearInterval(this.intervalHandle);
        }
    
    
        this.secondsRemaining--
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.value;
        this.secondsRemaining = time * 60;
        this.setState({
          isClicked : true
        })
    }

    render() {
        return (
            <div className="row">
                <h1 style={{ fontSize: 100, marginLeft: 100 }}>{this.props.value}:{this.props.seconds}</h1>
            </div>
        )
    }
}

export default TimerInput;
