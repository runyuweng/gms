import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox,Alert,message} from 'antd';
import { hashHistory } from 'react-router';
import './login.css';
import auth from "../auth";
import fetch from 'isomorphic-fetch';
const FormItem = Form.Item;

const warning = function () {
  message.warning('用户名或密码错误！请重新登录');
};

const success = function () {
  message.success('登录成功!');
};

const NormalLoginForm = Form.create()(React.createClass({
  // getInitialState(){
  //   if(!this.props.location.state){
  //     this.props.history.push('login');
  //   }
  // },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log( values);
        fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body:"username="+values.username+"&pass="+values.pass
            // body:values
          })
        .then(function(res){return res.json()})
        .then(function(data){
          console.log(data);
          if(data.code=="S01"){
            success();
            hashHistory.push('/manage/student');
          }else{
            warning();
          }
          return data;
        })


        // if(values.userName=="wry"&&values.password=="0000"){
        //   success();
        //   hashHistory.push('/manage/student');
        // }else{
        //   warning();
        // }
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('pass', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" className="width100 mb20">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  },
}));

export default NormalLoginForm;