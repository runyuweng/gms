import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import Manage from './src/components/Manage.jsx';
import Paper from './src/components/Paper/Paper.jsx';
import Login from './src/components/Login/Login.jsx';
import TutorIn from './src/components/In/In.jsx';
import TutorOut from './src/components/Out/Out.jsx';
import Student from './src/components/Student/Student.jsx';
import StudentDetail from './src/components/Student/StudentDetail.jsx';
import TutorDetail from './src/components/In/TutorDetail.jsx';
import auth from "./src/components/auth";

function test(){
    if(auth.getCookie('username')){

    }else{
        hashHistory.push("/login");
    }
}
const Routes = ({history}) =>
  <Router history={hashHistory}>
    <Route path="/" component={Login} onEnter={test}/>
    <Route path="/manage/*" component={Manage} onEnter={test}/>
    <Route path="/login" component={Login}/>
    <Route path="/manage/student" component={Student} onEnter={test}/>
    <Route path="/manage/paper" component={Paper} onEnter={test}/>
    <Route path="/manage/tutorin" component={TutorIn} onEnter={test}/>
    <Route path="/manage/tutuorout" component={TutorOut} onEnter={test}/>
    <Route path="/manage/studentdetail" component={StudentDetail} onEnter={test}/>
    <Route path="/manage/studentlist/*" component={TutorDetail} onEnter={test}/>
  </Router>



ReactDOM.render(<Routes history={hashHistory} />, document.getElementById('app'));