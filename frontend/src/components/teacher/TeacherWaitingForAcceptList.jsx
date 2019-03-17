import React, { Component } from 'react';
import TeacherWaitingForAcceptItem from './TeacherWaitingForAcceptItem.jsx';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import MDSpinner from 'react-md-spinner';
import Status from './../../components/commons/Status';
import Search from '../../components/commons/Search';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Sort from '../../components/commons/Sort';

class TeacherWaitingForAcceptList  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            allTopicOfTeacherBeRegister: [],
            currentPage: 1,
            allListPerPage: 3
        };
    }

    componentDidMount() {
        this.props.onGetTopicOfTeacherBeRegister();
        if(this.props.topicOfTeacherBeRegister.register.length !== 0 ) {
            this.setState({
                allTopicOfTeacherBeRegister: this.props.topicOfTeacherBeRegister.register
            });
        }
    }

    componentWillReceiveProps(nextprops){
        console.log(nextprops);
        if(nextprops && nextprops.topicOfTeacherBeRegister.register.length !== 0) {
            this.setState({
                allTopicOfTeacherBeRegister: nextprops.topicOfTeacherBeRegister.register
            });
            
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
        var value =target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }

    render() {
        var {topicOfTeacherBeRegister,keyword,sort} = this.props;
        var {allTopicOfTeacherBeRegister, currentPage, allListPerPage} = this.state;
        const indexOfLastTodo = currentPage * allListPerPage;
        const indexOfFirstTodo = indexOfLastTodo - allListPerPage;
        var currentLists = "";
        if(allTopicOfTeacherBeRegister.length !== 0 ) {
            currentLists= allTopicOfTeacherBeRegister.slice(indexOfFirstTodo,indexOfLastTodo);
        }else {
            if(topicOfTeacherBeRegister.register !== 0) {
                currentLists = topicOfTeacherBeRegister.register.slice(indexOfFirstTodo,indexOfLastTodo);
            }
        }

        if(topicOfTeacherBeRegister.register.length !== 0){
            if(keyword !== '') {
                // search
                currentLists = topicOfTeacherBeRegister.register.filter((list) => {
                    let listTeacher = Object.assign({}, list.teacher[0]);
                    return listTeacher.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                });
            }
            // sort
            if (sort.by === 'name') {
                currentLists.sort((a, b) => {
                    console.log(a);
                    console.log(b);
                    if (a.teacher[0].student_register[0].choose_by[0].fullname > b.teacher[0].student_register[0].choose_by[0].fullname) return -sort.value;
                    else if (a.teacher[0].student_register[0].choose_by[0].fullname < b.teacher[0].student_register[0].choose_by[0].fullname) return sort.value;
                    else return 0;
                });
            } 
            var elmTeacherWaitingForAcceptItem= currentLists.map((element,idx) => {
                return (
                    <TeacherWaitingForAcceptItem
                    key={idx}
                    index={idx}
                    infoTopic={element}/>
                )
            })
        }else{
            if(topicOfTeacherBeRegister.register.length === 0) {
                return <Status/>
            }
            // var elmTeacherWaitingForAcceptItem=(<tr><MDSpinner className="spinner" size={50}></MDSpinner></tr>)
        }
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allTopicOfTeacherBeRegister.length / allListPerPage); i++) {
        pageNumbers.push(i);
        }
        return (
            <div>
                <div>
                    <Search/>
                </div>
                <div className="row mt-15">
                    
                    <div className="col-md-12"><h2 className="text-center">Topic waiting for acception</h2></div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Subcribers <Sort/></th>
                                    <th className="text-center">Topic name</th>
                                    <th className="text-center">Register Date</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                        
                                {elmTeacherWaitingForAcceptItem}
                            
                            </tbody>
                        </table>
                    </div>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        filterTable : state.filterTable,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetTopicOfTeacherBeRegister : () => {
            dispatch(actions.axiosTopicOfTeacherBeRegister());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherWaitingForAcceptList);
