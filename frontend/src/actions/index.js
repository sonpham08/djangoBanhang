import * as types from './../constants/ActionTypes';
import axios from 'axios';
import toastr from 'toastr';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
};

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task // task : task
    }
};

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
}

export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id // id : id
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id // id : id
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task // task : task
    }
}

export const filterTask = (filter) => {
    return {
        type: types.FILTER_TABLE,
        filter // filter : filter -> filterName, filterStatus
    }
}

export const searchTask = (keyword) => {
    return {
        type: types.SEARCH,
        keyword // keyword : keyword
    }
}

export const sortTask = (sort) => {
    return {
        type: types.SORT,
        sort // sort : sort -> sort.by sort.value
    }
}

export const loadSubjectBeAcception = (item) => {
    return {
        type: types.LOAD_SUBJECT_BE_ACCEPTION,
        itemEditing: item
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


var csrftoken = getCookie('csrftoken');

export const axiosGetListTeachers = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = "/api/users/listTeacher/";
        axios({
            url,
            headers,
            method: "get",
        }).then(function (listTeacher) {
            dispatch({
                type: types.FET_USERS_TEACHER,
                listTeacher
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const axiosAdminGetHistory = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = "/api/subjects/admin_get_history/";
        axios({
            url, headers, method: "get"
        }).then(function (register) {
            dispatch({
                type: types.LOAD_LIST_HISTORY,
                register: register.data
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const axiosAdminGetInfoTopicRegister = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = "/api/subjects/admin_get_info_topic_register/";
        axios({
            url, headers, method: "get"
        }).then(function (register) {
            dispatch({
                type: types.ADMIN_GET_INFO_TOPIC_REGISTER,
                register: register.data
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const axiosAcceptTopic = (idStu, deadline_at) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = `/api/students/${idStu}/`;
        let data = {
            user: idStu,
            status: 1, // accepted
            deadline_at: deadline_at
        }
        axios({
            url, headers, method: "patch", data
        }).then(function (res) {
            dispatch({
                type: types.ACCEPT_TOPIC,
                accepted: res.data
            })
            toastr.success('Accepted this topic successfully', 'Success')
        }).catch(error => {
            toastr.error('Can not doing this request!', 'Error')
        })
    }
}

export const axiosCreateTopic = (topicname) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json" };
        let url = "/api/users/me/";
        axios({ url, method: "get", headers })
            .then(me => {
                console.log(me);
                console.log(topicname);
                let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken , 'Accept': 'application/json'};
                let url = "/api/subjects/";
                let data = {
                    "name": topicname,
                    "teacher": me.data.id,
                    "choose_by": []
                }
                axios({
                    url,
                    headers,
                    method: "post",
                    data: data
                }).then(subjects => {
                    dispatch({
                        type: types.ADD_FIELD,
                        subjects
                    })
                    toastr.success('Create topic successfully', 'Success')
                }).catch(error => {
                    toastr.error('We have problem here. Check again data input!', 'Error')
                })
            })
    }
}

export const axiosDeleteTopic = (id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = `/api/subjects/${id}`;
        axios({
            url, headers, method: "delete",
        }).then(subjects => {
            dispatch({
                type: types.DELETE_FIELD,
                subjects
            })
            toastr.success('Deleted successfully', 'Success')
        }).catch(error => {
            toastr.error('Can not delete it!', 'Error')
        })
    }
}

export const checkTopicRegisteredOrNot = (id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = `/api/subjects/${id}`;
        axios({
            url, headers, method: "get"
        }).then(registeredornot => {
            dispatch({
                type: types.CHECK_SUBJECT_REGISTERED_OR_NOT,
                registeredornot
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const axiosGetListFieldOnlyTeacher = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = "/api/users/me/";
        axios({ url, method: "get", headers })
            .then(me => {
                console.log(me);
                let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
                let url = `/api/teachers/${me.data.id}`;
                axios({
                    url,
                    headers,
                    method: "get",
                }).then(field => {
                    dispatch({
                        type: types.GET_LIST_FIELD_ONLY_TEACHER,
                        field
                    })
                })
            })
    }
}

export const axiosGetListTeacherAndTopic = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json" };
        let url = "/api/subjects/getListTeacherByField/";
        axios({
            url, method: "get", headers,
        }).then(function (lists) {
            dispatch({
                type: types.GET_LIST_TEACHER_AND_TOPIC,
                lists
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const axiosShowRegisterTopic = (idUser) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = `/api/students/${idUser}/`;
        axios({
            url, headers, method: "get"
        }).then(student => {
            let params = student.data.choose_subjects[0];
            console.log(params);
            let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
            let url = `/api/subjects/${params}/`;
            axios({
                url, headers, method: "get"
            }).then(function (registersubject) {
                dispatch({
                    type: types.SHOW_TOPIC_REGISTER,
                    registersubject
                })
            })
        })
    }
}

export const axiosTopicOfTeacherBeRegister = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = "/api/subjects/get_info_register_topic/";
        axios({
            url, headers, method: "get"
        }).then(function (register) {
            dispatch({
                type: types.TOPIC_OF_TEACHER_BE_REGISTER,
                register
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const axiosTeacherGetHistory = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = "/api/subjects/teacher_get_history/";
        axios({
            url, headers, method: "get"
        }).then(function (register) {
            dispatch({
                type: types.TEACHER_LOAD_LIST_HISTORY,
                register: register.data
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const loadItemEdit = (item) => {
    return {
        type: types.LOAD_ITEM,
        item
    }
}

export const axiosEditTopic = (item) => {
    console.log(item);
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = `/api/subjects/${item.id}/`;
        let data = {
            id: item.id,
            name: item.name
        }
        axios({
            url, headers, method: "patch", data: data
        }).then(function (item) {
            dispatch({
                type: types.EDIT_ITEM,
                item
            })
            toastr.success('Edit topic successfully', 'Success')
        }).catch(error => {
            toastr.error('Edit fail. Please try again!', 'Error')
        })
    }
}

export const axiosGetInfoTeacherById = (idUser) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = `/api/students/${idUser}/`;
        axios({
            url, headers, method: "get"
        }).then(student => {
            let params = student.data.choose_subjects[0];
            let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
            let url = `/api/subjects/${params}/`;
            axios({
                url, headers, method: "get"
            }).then(registersubject => {
                let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
                let url = `/api/users/${registersubject.data.teacher}/`;
                axios({
                    url, headers, method: "get"
                }).then(function (infoteacher) {
                    dispatch({
                        type: types.GET_INFO_TEACHER_BY_ID,
                        infoteacher
                    })
                })
            })
        })
    }
}

export const axiosRegisterTopic = (idUser, idSubject) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let url = `/api/students/${idUser}/`;
        let data = {
            "user": idUser,
            "choose_subjects": [idSubject]
        };
        axios({
            url, headers, method: "put", data
        }).then(function (register) {
            dispatch({
                type: types.REGISTER_TOPIC,
                register
            })
            toastr.success('Registered successfully', 'Success')
        }).catch(error => {
            toastr.error('Register fail!', 'Error')
        })
    }
}

export const axiosUers = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'Accept':'application/json' };
        let url = "/api/users/me/";
        axios({
            url, method: "get", headers,
        }).then(function (users) {
            dispatch({
                type: types.FET_USERS,
                users
            })
        }).catch(error => {
            toastr.error('Can not load data!', 'Error')
        })
    }
}

export const studentUpdateInfo = (idUser, fullname, mssv, grade, email) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken  };
        let url= `/api/users/${idUser}/`;
        let data= {
            fullname: fullname,
            mssv: mssv,
            grade: grade,
            email: email
        }
        axios({
            url, method:"patch", headers, data
        }).then(function (users) {
            dispatch({
                type: types.STUDENT_UPDATE_INFO,
                users
            })
            toastr.success('Updated successfully', 'Success')
        }).catch(error => {
            toastr.error('Update fail!', 'Error')
        })
    }
}