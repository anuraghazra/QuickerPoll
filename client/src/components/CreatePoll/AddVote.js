import React, { Component } from 'react';
import { ColorPopOver } from '../VoteGroup/ColorPicker';
import { Button, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';


import styled from 'styled-components';
const AddPollWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  flex-shrink: initial;
  
  .ui__add {
    display: flex;
    align-items: center;
    flex-shrink: initial;
    
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
  handleColor = (color) => {
    this.setState({ color: color })
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
          <ColorPopOver style={{ height: "38px" }} update={this.handleColor} color={this.state.color} />
        </div>

        <Button
          style={{ minWidth: '40px' }}
          type="primary"
          size="large"
          shape="circle"
          icon="plus"
          onClick={this.handleSubmit}
        />
      </AddPollWrapper>
    )
  }
}

AddVote.propTypes = {
  addPollOption: PropTypes.func.isRequired
}
export default AddVote;