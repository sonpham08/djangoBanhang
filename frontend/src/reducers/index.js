import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';
import users from './users';
import listTeacher from './listTeacher';
import subjects from './subjects';
import listfieldonlyteacher from './listfieldonlyteacher';
import listTeacherAndTopic from './listTeacherAndTopic';
import register from './register';
import registersubject from './registersubject';
import infoteacher from './infoteacher';
import topicOfTeacherBeRegister from './topicOfTeacherBeRegister';
import itemTopics from './itemTopics';
import admingetregister from './admingetregister';
import accepted from './accepted';
import registeredornot from './registeredornot';

const myReducer = combineReducers({
    tasks, // tasks : tasks,
    isDisplayForm, // isDisplayForm : isDisplayForm
    itemEditing, // itemEditing : itemEditing
    filterTable,
    search,
    sort, 
    users,
    listTeacher,
    subjects,
    listfieldonlyteacher,
    listTeacherAndTopic,
    register,
    registersubject,
    infoteacher,
    topicOfTeacherBeRegister,
    itemTopics,
    admingetregister,
    accepted,
    registeredornot,
});

export default myReducer;