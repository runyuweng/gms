import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Table } from 'antd';
import Nav from '../Nav.jsx';
import classNames from 'classnames';
import '../public.css';
import fetch from 'isomorphic-fetch';

const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;

class TutorDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  loadList(){
    var self = this;
    var paths = window.location.href.split('/');
    fetch('http://localhost:3000/studentlist/'+paths[6]+'/'+paths[7],{
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

  componentDidMount(props) {
    this.loadList();
  }


   render() {
    const self = this
    const { list } = self.state;

    const columns = [{
      title: '学生编号',
      dataIndex: 'stu_id',
      key: 'name',
      render: text => <Link to={'/manage/studentdetail/'+text}>{text}</Link>,
    }, {
      title: '姓名',
      dataIndex: 'stu_name'
    }, {
      title: '年龄',
      dataIndex: 'stu_age'
    }, {
      title: '性别',
      dataIndex: 'stu_sex'
    }, {
      title: '专业',
      dataIndex: 'stu_major'
    }, {
      title: '籍贯',
      dataIndex: 'stu_orign'
    }];
   

      return (
        <div>
        <Row  className="mt20">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/manage/student">导师指导学生列表</Link></Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
              <Table columns={columns} dataSource={list} />
            </div>
          </Col>
        </Row>
    </div>
      );
   }
}

export default TutorDetail;