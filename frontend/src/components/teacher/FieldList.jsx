import React, { Component } from 'react';
import FieldItem from './FieldItem';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import TeacherCreateTopicForm from './TeacherCreateTopicForm';
// import Pagination from './../../components/commons/Pagination';
import { css } from 'glamor';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Search from '../../components/commons/Search';

class FieldList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            allListFieldOnlyTeacher: [],
            currentPage: 1,
            allListPerPage: 3
        };
    }

    componentDidMount() {
        this.props.onGetListFieldOnlyTeacher();
    }


    componentWillReceiveProps(nextprops) {
        if (this.props.resetTopicOfTeacherBegister === true) {
            this.props.onGetListFieldOnlyTeacher();
        }
        if(nextprops && nextprops.listfieldonlyteacher.data !== undefined){
            this.setState({
                allListFieldOnlyTeacher: nextprops.listfieldonlyteacher.data.subjectfield
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
        var value = target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }

    onToggleForm = () => {
        this.props.onToggleForm();
    }

    onDeleteTopic = (id) => {
        this.props.onDeleteTopic(id);
        this.props.onGetListFieldOnlyTeacher();
    }

    onSave = () => {
        this.props.onGetListFieldOnlyTeacher();
    }

    onCreateTopic = (name) => {
        this.props.onCreateTopic(name);
        this.props.onGetListFieldOnlyTeacher();
    }

    render() {
        var {allListFieldOnlyTeacher, currentPage, allListPerPage} = this.state;
        var { isDisplayForm, subjects, listfieldonlyteacher, filterTable, keyword } = this.props;
        console.log(listfieldonlyteacher);
        console.log(allListFieldOnlyTeacher);
        console.log(keyword);
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * allListPerPage;
        const indexOfFirstTodo = indexOfLastTodo - allListPerPage;
        var currentLists = allListFieldOnlyTeacher.slice(indexOfFirstTodo, indexOfLastTodo);

        if (listfieldonlyteacher.data !== undefined) {
            if(keyword !== '') {
                // search
                currentLists = allListFieldOnlyTeacher.filter((list) => {
                    return list.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                });
            }
            var elmFieldItem = currentLists.map((field, idx) => {
                return (
                    <FieldItem
                        key={field.id}
                        index={idx}
                        field={field}
                        onDeleteTopic={this.onDeleteTopic}
                        onEditTopic={this.props.onEditTopic}
                        onResetTopicOfTeacherBeRegister={this.props.onResetTopicOfTeacherBeRegister} />
                )
            })
        }

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allListFieldOnlyTeacher.length / allListPerPage); i++) {
        pageNumbers.push(i);
        }
        return (
            <div>
            <div><Search/></div>
            <div className="row mt-15">
                
                <div className={isDisplayForm ? "col-md-4" : null}>
                    {isDisplayForm ? <TeacherCreateTopicForm
                        onCreateTopic={this.onCreateTopic}
                        onSave={this.onSave} /> : null}
                </div>
                <div className={isDisplayForm ? "col-md-8" : "col-md-12"}>
                    <button type="button" className="btn btn-primary btn-add-topic"
                        onClick={this.onToggleForm}>
                        <span className={!isDisplayForm ? "fa fa-plus" : "fa fa-times"}> {!isDisplayForm ? "Add Topic" : "Close Form"}</span>

                    </button>

                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">ID Number</th>
                                <th className="text-center">Topic name</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmFieldItem}
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
        isDisplayForm: state.isDisplayForm,
        subjects: state.subjects,
        listfieldonlyteacher: state.listfieldonlyteacher,
        keyword: state.search,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onGetListFieldOnlyTeacher: () => {
            dispatch(actions.axiosGetListFieldOnlyTeacher());
        },
        onDeleteTopic: (id) => {
            dispatch(actions.axiosDeleteTopic(id));
        }
        , onCreateTopic: (name) => {
            dispatch(actions.axiosCreateTopic(name));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldList);
