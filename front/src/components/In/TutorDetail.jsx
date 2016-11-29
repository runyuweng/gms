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


   render() {

    const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions<Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

   

      return (
        <div>
        <Row  className="mt20">
          <Col>
            <div className="ant-search-input-wrapper" >
              <InputGroup className={classNames.searchCls} className="mb20">
                <Input />
                <div className="ant-input-group-wrap">
                  <Button icon="search" className={classNames.btnCls} size={classNames.size} />
                </div>
              </InputGroup>
             </div>
            <Breadcrumb>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/manage/student">学生详细信息</Link></Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
              <Table columns={columns} dataSource={data} />
            </div>
          </Col>
        </Row>
    </div>
      );
   }
}

export default TutorDetail;