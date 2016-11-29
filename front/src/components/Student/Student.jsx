import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Table } from 'antd';
import Nav from '../Nav.jsx';
import classNames from 'classnames';
import '../public.css';
import fetch from 'isomorphic-fetch';

const InputGroup = Input.Group;

const FormItem = Form.Item;

class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  loadAccounts() {
   	var self = this;
        	fetch('http://localhost:3000/students',{
            	method: 'GET',
            	headers: {
              "Content-Type": "application/x-www-form-urlencoded"
           	}
          	})
        	.then(function(res){return res.json()})
        	.then(function(data){
	  self.setState({
	  	list:data.student
	  })
        	});
  }

    componentDidMount() {
    this.loadAccounts();
  }


   render() {
   	const self = this
    	const { list } = self.state;

   	const columns = [{
	  title: '学号',
	  dataIndex: 'stu_id',
	  render: text => <Link to={'/manage/studentdetail/'+text}>{text}</Link>,
	}, {
	  title: '姓名',
	  dataIndex: 'stu_name',
	}, {
	  title: '性别',
	  dataIndex: 'stu_sex',
	}, {
	  title: '年龄',
	  dataIndex: 'stu_age',
	}, {
	  title: '专业',
	  dataIndex: 'stu_major',
	}, {
	  title: '籍贯',
	  dataIndex: 'stu_orign',
	}];
	// const data = [{
	//   key: '1',
	//   id:'1',
	//   name: '翁润雨',
	//   sex:"男",
	//   age: 32,
	//   major:'计科',
	//   orign:'江苏',
	//   company:'简寻'
	// }];

	// rowSelection object indicates the need for row selection
	const rowSelection = {
	  getCheckboxProps: record => ({
	    disabled: record.name === 'Jim Green',    // Column configuration not to be checked
	  }),
	};


      return (
      	<div>
	    <Row  className="mt20">
	      <Col>
	    	  <Breadcrumb>
		    <Breadcrumb.Item>主页</Breadcrumb.Item>
		    <Breadcrumb.Item><Link to="/manage/student">学生</Link></Breadcrumb.Item>
		  </Breadcrumb>

		  <div className="ant-search-input-wrapper" className="mt20" >
		        <InputGroup className={classNames.searchCls}>
		          <Input />
		          <div className="ant-input-group-wrap">
		            <Button icon="search" className={classNames.btnCls} size={classNames.size} />
		          </div>
		        </InputGroup>
	      	   </div>
                            <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
      	                 <Table rowSelection={null} loading={false} columns={columns} dataSource={list}  />
                            </div>
	      </Col>
	    </Row>
	</div>
      );
   }
}

export default Student;