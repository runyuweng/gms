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

class StudentDetail extends Component {


   render() {
   

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
              <Row type="flex">
                <Col span={6} order={4}>
                  <p>学号：
                    <span>1</span>
                  </p>
                  <p>专业：
                    <span>计算机</span>
                  </p>
                  <p>实习公司：
                    <span>简寻</span>
                  </p>
                </Col>


                <Col span={6} order={4}>
                  <p>姓名：
                    <span>翁润雨</span>
                  </p>
                  <p>籍贯：
                    <span>江苏</span>
                  </p>
                  <p>指导老师：
                    <span>周林</span>
                  </p>
                </Col>


                <Col span={6} order={4}>
                  <p>性别：
                    <sapn>男</sapn>
                  </p>
                  <p>论文题目：
                    <span>react</span>
                  </p>
                </Col>

                <Col span={6} order={4}>
                  <p>年龄：
                          <span>21</span>
                  </p>
                  <p>论文要求：
                    <span>react</span>
                  </p>
                </Col>



              </Row>
            </div>

          </Col>
        </Row>
    </div>
      );
   }
}

export default StudentDetail;