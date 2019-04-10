import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as authActions from '../../actions/authActions';

class Sort extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by : sortBy,
            value : sortValue
        });
    }

    render() {
        return (
                <div className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{fontSize: '17px', cursor: 'pointer'}}><span className="caret"></span></a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={ () => this.onClick('name', 1) }>
                            <a
                                href="#"
                                role="button"
                                className={(this.props.sort.by === 'name' && this.props.sort.value === 1) ? 'fa fa-check' : ''}
                            >
                            Tên A-Z
                            </a>
                        </li>
                        <hr/>
                        <li onClick={ () => this.onClick('name', -1) }>
                            <a
                                href="#"
                                role="button"
                                className={(this.props.sort.by === 'name' && this.props.sort.value === -1) ? 'fa fa-check' : ''}
                            >
                            Tên Z-A
                            </a>
                        </li>
                    </ul>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sort : state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        // onSort : (sort) => { // sort.by sort.value
        //     dispatch(actions.sortTask(sort));
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);