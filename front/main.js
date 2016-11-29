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
import cookie from "js-cookie";


const Routes = () =>
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="/manage/*" component={Manage}/>
    <Route path="/login" component={Login}/>
    <Route path="/manage/student" component={Student} />
    <Route path="/manage/paper" component={Paper}/>
    <Route path="/manage/tutorin" component={TutorIn}/>
    <Route path="/manage/tutuorout" component={TutorOut}/>
    <Route path="/manage/studentdetail" component={StudentDetail}/>
    <Route path="/manage/studentlist/*" component={TutorDetail}/>
  </Router>



ReactDOM.render(<Routes history={hashHistory} />, document.getElementById('app'));