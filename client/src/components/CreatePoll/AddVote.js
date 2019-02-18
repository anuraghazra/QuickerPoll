import React, { Component } from 'react';
import { Input, Button, InputNumber } from 'antd';
import styled from 'styled-components';


const AddPollWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  
  .ui__add {
    display: flex;
    > * {
      margin: 5px;
      flex: 1;
    }
  }
  `;

function randomHex(e) {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

class AddVote extends Component {
  state = {
    name: '',
    value: 0,
    color: randomHex()
  }

  handleName = (e) => {
    this.setState({ name: e.target.value })
  }
  handleValue = (value) => {
    this.setState({ value: value })
  }
  handleColor = (e) => {
    this.setState({ color: e.target.value })
  }
  handleSubmit = (e) => {
    this.props.addPollOption(this.state);
    this.setState({
      name: '',
      value: 0,
      color: randomHex()
    })
  }

  render() {
    return (
      <AddPollWrapper>
        <div className="ui__add">
          <Input
            size="large"
            onChange={this.handleName}
            value={this.state.name}
            placeholder="poll option" />
          <InputNumber
            size="large"
            onChange={this.handleValue}
            value={this.state.value}
            defaultValue={this.state.value} />
          <Input
            size="large"
            type="color"
            onChange={this.handleColor}
            defaultValue={this.state.color}
            value={this.state.color}
            placeholder="poll option" />
        </div>
        <Button
          type="primary"
          size="large"
          shape="circle"
          icon="plus"
          onClick={this.handleSubmit} />
      </AddPollWrapper>
    )
  }
}

export default AddVote;