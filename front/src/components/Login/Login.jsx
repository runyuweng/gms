import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css';
import NormalLoginForm from './NormalLoginForm.jsx';

const FormItem = Form.Item;

class Login extends React.Component {


   render() {
      return (
      	<div className="mt20">
	    <Row>
	    <Col xs={{ span: 10, offset: 7 }} lg={{ span:6, offset: 9 }}>
                    <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
    	       <h1 className="mb20 center">学生毕业设计管理系统</h1>
            	       <NormalLoginForm />
                    </div>
	      </Col>
	    </Row>
	</div>
      );
   }
}

export default Login;