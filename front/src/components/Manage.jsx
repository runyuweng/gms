import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Icon, Row, Col } from 'antd';
import Student from './Student/Student.jsx';
import StudentDetail from './Student/StudentDetail.jsx';
import Paper from './Paper/Paper.jsx';
import TutorIn from './In/In.jsx';
import TutorDetail from './In/TutorDetail.jsx';
import TutorOut from './Out/Out.jsx';
import Nav from './Nav.jsx';

const SubMenu = Menu.SubMenu;
 
const Manage = ({ location }) => {

  var pathname = location.pathname != '/' ? location.pathname : '/manage/user/', paths = pathname.split('/');

  // if (paths[3] == 'job') paths[2] = paths[3]
  var main = {
    'student': <Student paths={paths} />,
    'paper': <Paper paths={paths} />,
    'tutorin': <TutorIn paths={paths} />,
    'tutorout': <TutorOut paths={paths} />,
    'studentdetail':<StudentDetail paths={paths} />,
    'studentlist':<TutorDetail paths={paths} />
  }[paths[2]], activeKey = {
    'student': 1,
    'paper':2,
    'tutorin':3,
    'tutorout':4,
    'studentdetail':5,
    'studentlist':6
  }[paths[2]];


  return (
    <div>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span:16, offset: 4 }}>
          <div>
           <Nav activeKey={activeKey}/>
          </div>
        </Col>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span:16, offset: 4 }}>
          {main}
        </Col>
      </Row>
    </div>
  );
};

Manage.propTypes = {
};

export default Manage;
