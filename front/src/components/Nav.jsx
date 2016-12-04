import { Menu, Icon, Row, Col  } from 'antd';
import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import classNames from 'classnames';
import './public.css';
import auth from './auth.js';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Nav = React.createClass({

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  //登出
    if(e.key == 'logout'){
      auth.logout(()=>{
        auth.delCookie('username');
        hashHistory.push("/");
      });
    }
  },
  render() {
    const { activeKey } = this.props;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[''+activeKey]}
        mode="horizontal"
        theme="light"
        style={{background:"white"}}
      >
        <Menu.Item key="0" style={{display:"none"}}>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/manage/student" style={{color:"#7f7f7f"}}>
            <Icon type="user" />学生
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/manage/paper" style={{color:"#7f7f7f"}}>
            <Icon type="file" />论文
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/manage/tutorin" style={{color:"#7f7f7f"}}>
            <Icon type="folder" />校内导师
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
        <Link to="/manage/tutorout" style={{color:"#7f7f7f"}}>
          <Icon type="folder-open" />校外导师
          </Link>
        </Menu.Item>
        <Menu.Item key="logout" style={{float:"right"}}>
          退出
        </Menu.Item>
      </Menu>
    );
  },
});

export default Nav;