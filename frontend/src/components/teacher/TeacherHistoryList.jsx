import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import TeacherHistoryItem from './TeacherHistoryItem.jsx';
import Search from '../commons/Search';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Sort from '../../components/commons/Sort';

class TeacherHistoryList  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            allAdminGetRegister: [],
            currentPage: 1,
            allListPerPage: 3
        };
    }

    componentDidMount() {
        if(this.props.admingetregister.length !== 0 ) {
            this.setState({
                allAdminGetRegister: this.props.admingetregister
            })
        }
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops);
        if(nextprops && nextprops.admingetregister.length !== 0){
            console.log(nextprops);
            this.setState({
                allAdminGetRegister: nextprops.admingetregister
            })
        }
    }

    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }

    render() {
        var {allAdminGetRegister, currentPage, allListPerPage} = this.state;
        var {keyword, admingetregister,sort} = this.props;
        console.log(keyword);
        // if(keyword !== '') {
        //     // search
        //     admingetregister = admingetregister[0].filter((list) => {
        //         return list.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        //     });
        // }
        const indexOfLastTodo = currentPage * allListPerPage;
        const indexOfFirstTodo = indexOfLastTodo - allListPerPage;
        var currentLists = allAdminGetRegister.slice(indexOfFirstTodo, indexOfLastTodo);
        console.log(currentLists);
        if(admingetregister.length !== 0){
            if(keyword !== '') {
                // search
                currentLists = admingetregister.filter((list) => {
                    console.log(list);
                    return list.teacher[0].name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                });
            }
            // sort

            if (sort.by === 'name') {
                currentLists.sort((a, b) => {
                    console.log(a);
                    console.log(b);
                    if (a.teacher[0].choose_by[0].fullname > b.teacher[0].choose_by[0].fullname) return -sort.value;
                    else if (a.teacher[0].choose_by[0].fullname < b.teacher[0].choose_by[0].fullname) return sort.value;
                    else return 0;
                });
            }
            var elmRegister = currentLists.map((register,idx) => {
                return (
                    <TeacherHistoryItem
                    key={idx}
                    index={idx}
                    register={register.teacher}/>
                )
            })
        }

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allAdminGetRegister.length / allListPerPage); i++) {
        pageNumbers.push(i);
        }
        return (
            <div>
                <div><Search/></div>
                <div className="row mt-15">
                    <div className="col-md-12"><h2 className="text-center">Topic has been accepted</h2></div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Subcribers <Sort/></th>
                                    <th className="text-center">Topic name</th>
                                    <th className="text-center">Register Date</th>
                                    <th className="text-center">Deadline</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elmRegister}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                    <Pagination aria-label="Page navigation" style={{width: '0', marginLeft: '430px'}}>
                        {
                            pageNumbers.map((number,idx) => {
                                return (
                                    <PaginationItem key={number}>
                                    <PaginationLink
                                    index={idx}
                                    key={idx}
                                    id={number}
                                    onClick={this.handleClick}
                                    >
                                        {number}
                                    </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                    </Pagination>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        keyword: state.search,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(TeacherHistoryList);
