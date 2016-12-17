import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { message,Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Cascader,Table,Select,Tooltip } from 'antd';
import Nav from '../Nav.jsx';
import classNames from 'classnames';
import '../public.css';
import fetch from 'isomorphic-fetch';
const InputGroup = Input.Group;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

const AdvancedSearchForm=React.createClass({


  handleSearch(e){
    var self = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      fetch('http://localhost:3000/updateStudent',{
        method: 'POST',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body:"stu_id="+this.props.stu_id+"&stu_name="+values.username+"&stu_age="+values.age+"&stu_major="+values.major+"&stu_orign"+values.place
        })
      .then(function(res){
          self.props.onChange();
          message.success('信息更新成功!');
      })
    });
},

  handleReset(){
    this.props.form.resetFields();
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          <Col span={8} key={0}>
            <FormItem {...formItemLayout} label="姓名">
                {getFieldDecorator('username')(
                  <Input placeholder="姓名" />
                )}
            </FormItem>
          </Col>
          <Col span={8} key={1}>
            <FormItem {...formItemLayout} label="年龄">
                {getFieldDecorator('age')(
                  <Input placeholder="年龄" />
                )}
            </FormItem>
          </Col>
                    <Col span={8} key={2}>
            <FormItem {...formItemLayout} label="专业">
                {getFieldDecorator('major')(
                  <Input placeholder="专业" />
                )}
            </FormItem>
          </Col>
                    <Col span={8} key={3}>
            <FormItem {...formItemLayout} label="籍贯">
                {getFieldDecorator('place')(
                  <Input placeholder="籍贯" />
                )}
            </FormItem>
          </Col>


        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">更新信息</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空输入
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
})
const UpdateStudent = Form.create()(AdvancedSearchForm);

export default UpdateStudent;