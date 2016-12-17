import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Table } from 'antd';
import Nav from '../Nav.jsx';
import UpdateStudent from './UpdateStudent.jsx';
import classNames from 'classnames';
import '../public.css';
import fetch from 'isomorphic-fetch';

const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;

class StudentDetail extends Component {

  constructor(props){
    super(props);
    this.state={
      stu_id:"",
      stu_name:"",
      stu_sex:"",
      stu_age:"",
      stu_major:"",
      stu_orign:"",
      com_name:"",
      paper_title:"",
      paper_require:"",
      tutorin_name:"",
      tutorout_name:""
    };
  }

  loadStudent(){
    var self = this;
    var paths = window.location.href.split('/');
    console.log(paths[6]);
    fetch('http://localhost:3000/studentdetail/'+paths[6],{
      method: 'GET',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      })
    .then(function(res){return res.json()})
    .then(function(data){
        console.log(data.student.stu_name);
        self.setState({
          stu_id:data.student.stu_id,
          stu_name:data.student.stu_name,
          stu_sex:data.student.stu_sex,
          stu_age:data.student.stu_age,
          stu_major:data.student.stu_major,
          stu_orign:data.student.stu_orign,
          com_name:data.student.com_name,
          paper_title:data.student.paper_title,
          paper_require:data.student.paper_require,
          tutorin_name:data.student.tutorin_name,
          tutorout_name:data.student.tutorout_name
        })
    });
  }

  componentDidMount(props) {
    this.loadStudent();
  }

   render() {
   

      return (
        <div>
        <Row  className="mt20">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/manage/student">学生详细信息</Link></Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
              <Row type="flex">
                <Col span={6} order={4}>
                  <p>学号：
                    <span>{this.state.stu_id}</span>
                  </p>
                  <p>专业：
                    <span>{this.state.stu_major}</span>
                  </p>
                  <p>实习公司：
                    <span>{this.state.com_name}</span>
                  </p>
                </Col>

                <Col span={6} order={4}>
                  <p>姓名：
                    <span>{this.state.stu_name}</span>
                  </p>
                  <p>籍贯：
                    <span>{this.state.stu_orign}</span>
                  </p>
                  <p>指导老师：
                    <span>{this.state.tutorin_name}{this.state.tutorout_name}</span>
                  </p>
                </Col>

                <Col span={6} order={4}>
                  <p>性别：
                    <sapn>{this.state.stu_sex}</sapn>
                  </p>
                  <p>论文题目：
                    <span>{this.state.paper_title}</span>
                  </p>
                </Col>

                <Col span={6} order={4}>
                  <p>年龄：
                          <span>{this.state.stu_age}</span>
                  </p>
                  <p>论文要求：
                    <span>{this.state.paper_require}</span>
                  </p>
                </Col>
              </Row>
            </div>

           <span className="mt20" style={{'display':'inline-block'}}>学生信息更新：</span>
           <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
              <UpdateStudent stu_id={this.state.stu_id} onChange={()=>{this.loadStudent()}}/>
           </div>

          </Col>
        </Row>
    </div>
      );
   }
}

export default StudentDetail;