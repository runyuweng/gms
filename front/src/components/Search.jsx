import React, { Component, PropTypes } from 'react';
import { Form, Input, Select, Button } from 'antd';
import fetch from 'isomorphic-fetch';
const FormItem = Form.Item;
const Option = Select.Option;

const NameInput = React.createClass({
  getInitialState() {
    const value = this.props.value || {};
    return {
      name: value.name || "",
      currency: value.currency || 'stu',
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  },
  handleNumberChange(e) {
    const name = e.target.value || ""
    if (!('value' in this.props)) {
      this.setState({ name });
    }
    this.triggerChange({ name });
  },
  handleCurrencyChange(currency) {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  },
  triggerChange(changedValue) {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  },
  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.name}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="stu">学生</Option>
        </Select>
      </span>
    );
  },
});

const Search = Form.create()(React.createClass({
  handleSubmit(e) {
    var self=this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch('http://localhost:3000/search/'+values.info.currency+'/'+values.info.name,{
            method: 'GET',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
          })
        .then(res=>{return res.json()})
        .then(data=>{
          console.log(data);
          if(self.props.onFind){
            var result = data.result;
            self.props.onFind(result);
        }
      })
    }
  });
},
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('info', {
            initialValue: { name: '', currency: 'stu' },
          })(<NameInput />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
        </FormItem>
      </Form>
    );
  },
}));


export default Search;