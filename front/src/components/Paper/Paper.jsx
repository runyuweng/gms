import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Table } from 'antd';
import classNames from 'classnames';
import '../public.css';
import Search from '../Search.jsx';

const InputGroup = Input.Group;

const FormItem = Form.Item;

class Paper extends Component {
    
    constructor(props) {
          super(props);
          this.state = {
            list: [],
          };
        }

    loadAccounts() {
      var self = this;
            fetch('http://localhost:3000/papers',{
                method: 'GET',
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
              })
            .then(function(res){return res.json()})
            .then(function(data){
              self.setState({
                list:data.paper
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
              title: '论文编号',
              dataIndex: 'paper_id',
              // render: text => <a href="#">{text}</a>,
            }, {
              title: '论文要求',
              dataIndex: 'paper_require',
            }];

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
                        <Breadcrumb.Item><Link to="/manage/paper">论文</Link></Breadcrumb.Item>
                      </Breadcrumb>
                     <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
                      <Table rowSelection={null} loading={false} columns={columns} dataSource={list}  />
                    </div>
                  </Col>
                </Row>
            </div>
          );
       }
    }

export default Paper;