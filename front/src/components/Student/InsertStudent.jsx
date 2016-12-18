import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { message,Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Cascader,Table,Select,Tooltip } from 'antd';
import Nav from '../Nav.jsx';
import classNames from 'classnames';
import '../public.css';



const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

const AdvancedSearchForm=React.createClass({
    getInitialState() {
      return {
        options:[{
          value: '校内导师',
          label: '校内导师',
          children: [],
        }, {
          value: '校外导师',
          label: '校外导师',
          children: [],
        }],
      }
    },

    componentDidMount(){
      var self = this;
      fetch('http://localhost:3000/tutorsin',{
        method: 'GET',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
        })
      .then(function(res){return res.json()})
      .then((data)=>{
        console.log(data.tutorin);
        let state = this.state;
        for(let i=0;i<data.tutorin.length;i++){
          state.options[0].children.push({value:data.tutorin[i].tutorin_name,label:data.tutorin[i].tutorin_name});
        }
        this.setState(state);
      })
      fetch('http://localhost:3000/tutorsout',{
        method: 'GET',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        }
        })
      .then(function(res){return res.json()})
      .then((data)=>{
        console.log(data.tutorin);
        let state = this.state;
        for(let i=0;i<data.tutorout.length;i++){
          state.options[1].children.push({value:data.tutorout[i].tutorout_name,label:data.tutorout[i].tutorout_name});
        }
        this.setState(state);
      })
    },


  handleReset(){
    this.props.form.resetFields();
  },

  
  handleSearch(e){
    var self = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      fetch('http://localhost:3000/insertStudent',{
        method: 'POST',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body:"stu_sex="+values.sex+"&stu_name="+values.username+"&stu_age="+values.age+"&stu_major="+values.major+"&stu_orign="+values.place+"&tutor="+values.tutor+"&paper_title="+values.paper_title+"&paper_require="+values.paper_require
        })
      .then(function(res){
          self.props.onChange();
          message.success('信息更新成功!');
          self.handleReset();
      })
    });
},

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    function onChange(value) {
      console.log(value);
    }

    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          <Col span={8} key={0}>
            <FormItem {...formItemLayout} label="姓名">
                {getFieldDecorator('username',{rules:[{required:true, message: '请输入姓名'}]})(
                  <Input placeholder="姓名" />
                )}
            </FormItem>
          </Col>
          <Col span={8} key={1}>
            <FormItem {...formItemLayout} label="性别">
                {getFieldDecorator('sex',{rules:[{required:true, message: '请输入性别'}]})(
                  <Input placeholder="性别" />
                )}
            </FormItem>
          </Col>
          <Col span={8} key={2}>
            <FormItem {...formItemLayout} label="年龄">
                {getFieldDecorator('age',{rules:[{required:true, message: '请输入年龄'}]})(
                  <Input placeholder="年龄" />
                )}
            </FormItem>
          </Col>
          <Col span={8} key={3}>
            <FormItem {...formItemLayout} label="专业">
                {getFieldDecorator('major',{rules:[{required:true, message: '请输入专业'}]})(
                  <Input placeholder="专业" />
                )}
            </FormItem>
          </Col>
          <Col span={8} key={4}>
            <FormItem {...formItemLayout} label="籍贯">
                {getFieldDecorator('place',{rules:[{required:true, message: '请输入籍贯'}]})(
                  <Input placeholder="籍贯" />
                )}
            </FormItem>
          </Col>
          <Col span={8} key={5}>
            <FormItem {...formItemLayout} label="导师">
                {getFieldDecorator('tutor')(
                  <Cascader options={this.state.options} onChange={onChange} placeholder="导师" />
                )}
            </FormItem>
          </Col>
          <Col span={8} key={6}>
            <FormItem {...formItemLayout} label="论文">
                {getFieldDecorator('paper_title',{rules:[{required:true, message: '请输入论文题目'}]})(
                  <Input placeholder="论文题目" />
                )}
            </FormItem>
          </Col>
          <Col span={16} key={7}>
            <FormItem {...formItemLayout} label="论文">
                {getFieldDecorator('paper_require',{rules:[{required:true, message: '请输入论文要求'}]})(
                  <Input placeholder="论文要求" />
                )}
            </FormItem>
          </Col>


        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">插入信息</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空输入
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
})
const InsertStudent = Form.create()(AdvancedSearchForm);

export default InsertStudent;