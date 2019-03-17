import React, { Component } from 'react';
import WaitingForAcceptItem from './WaitingForAcceptItem.jsx';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Sort from '../components/commons/Sort';

class WaitingForAcceptList extends Component {

    constructor(props){
        super(props);
        this.state= {
            allAdmingetregister: [],
            currentPage: 1,
            allListPerPage: 3
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops && nextprops.admingetregister.length !== 0) {
            this.setState({
                allAdmingetregister: nextprops.admingetregister
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
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        var {admingetregister, keyword,sort}= this.props;
        var {allAdmingetregister, currentPage, allListPerPage} = this.state;
        const indexOfLastTodo = currentPage * allListPerPage;
        const indexOfFirstTodo = indexOfLastTodo - allListPerPage;
        var currentLists = allAdmingetregister.slice(indexOfFirstTodo, indexOfLastTodo);
        console.log(admingetregister);
        console.log(sort);
        if(admingetregister.length!==0){
            if(keyword !== '') {
                // search
                currentLists = allAdmingetregister.filter((list) => {
                    let listTeacher= Object.assign({}, list.teacher[0].student_register[0]);
                    return listTeacher.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                });
            }
            // sort
            // can not sort
            // if (sort.by === 'name') {
            //     currentLists.sort((a, b) => {
            //         console.log("son");
            //         console.log(a);
            //         console.log(b);
            //         if (a.teacher[0].name > b.teacher[0].name) return -sort.value;
            //         else if (a.teacher[0].name < b.teacher[0].name) return sort.value;
            //         else return 0;
            //     });
            // }
            var elmItem=currentLists.map((register,idx) => {
                return (
                    <WaitingForAcceptItem
                    onResetWaitingForm={this.props.onResetWaitingForm}
                    key={idx}
                    index={idx}
                    register={register}/>
                )
            })
        }
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allAdmingetregister.length / allListPerPage); i++) {
        pageNumbers.push(i);
        }
        return (
            <div className="row mt-15">
                <div className="col-md-12"><h2 className="text-center">All list of topic</h2></div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Subcribers<Sort /></th>
                                <th className="text-center">Teacher for Support</th>
                                <th className="text-center">Topic name</th>
                                <th className="text-center">Register Date</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Acception</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmItem}
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
        )
    }
}

export default WaitingForAcceptList;
