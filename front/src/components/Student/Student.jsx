import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Table,message } from 'antd';
import Nav from '../Nav.jsx';
import classNames from 'classnames';
import '../public.css';
import fetch from 'isomorphic-fetch';
import ReactDOM from 'react-dom';
import Search from '../Search.jsx';
import InsertStudent from './InsertStudent.jsx';

const InputGroup = Input.Group;

const FormItem = Form.Item;

class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
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
          var list = data.student;
          for(var i=0;i<data.student.length;i++){
            list[i].key=i;
          }
      	   self.setState({
      	    	list:list
      	   })
           console.log(self.state.list);
      	});
  }

    componentDidMount() {
      this.loadAccounts();
    }

    onFind(result){
      this.setState({list:result});
    }


   render() {
    	const self = this;
    	const { list,search,loading, selectedRowKeys } = self.state;
      const rowSelection={
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
          this.setState({selectedRowKeys});
        }
      }
        const hasSelected = selectedRowKeys.length > 0;

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

      return (
      	<div>
	    <Row  className="mt20">
	      <Col>
	    	  <Breadcrumb>
		    <Breadcrumb.Item>主页</Breadcrumb.Item>
		    <Breadcrumb.Item><Link to="/manage/student">学生</Link></Breadcrumb.Item>
		  </Breadcrumb>
              <div className="mt20">
                <Search onFind={this.onFind.bind(this)} />
              </div>
              <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
                    <div style={{ marginBottom: 16 }}>
                      <Button type="delete" onClick={()=>{
                        var self = this;
                        console.log(selectedRowKeys);
                        fetch('http://localhost:3000/deleteStudent',{
                          method: 'POST',
                          headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                          },
                           body:"list="+selectedRowKeys
                        })
                      .then(function(res){
                        console.log(res);
                        message.success('删除成功');
                        self.loadAccounts();
                      })
                      }} 
                      disabled={!selectedRowKeys.length}>删除</Button>
                    </div>
                   <Table rowSelection={rowSelection} columns={columns} rowKey={record => record.stu_id} dataSource={list}  />
              </div>
              <span className="mt20" style={{'display':'inline-block'}}>插入学生信息：</span>
              <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
                <InsertStudent onChange={()=>{this.loadAccounts()}}/>
              </div>
	      </Col>
	    </Row>
	</div>
      );
   }
}

export default Student;