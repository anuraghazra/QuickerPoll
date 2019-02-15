import React, { Component } from 'react';
import { Button, Input } from 'antd';

import styled from 'styled-components';

const PollTitleWrapper = styled.div`
  display: flex;
  margin: 20px 0;
  font-size: 24px;

  .title__div {
    margin-right: auto;
  }
  .title__input {
    border-radius: 10px;
    outline: none;
    font-size: 24px;
    border: 2px solid transparent;
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
  .pen__div {
    margin-right: 0;
    margin-left: 0;
    cursor: pointer;
  }
`
class PollTitle extends Component {
  state = {
    willRename: false,
    name : this.props.name
  }

  toggleRename = () => {
    this.setState((prev) => {
      return { willRename: !prev.willRename }
    })
  }

  changeTitle = (e) => {
    this.setState({
      name : e.target.value
    })
  }
  
  handleTitleChange = () => {
    this.props.changeTitle(this.state.name);
    this.toggleRename();
  }

  render() {
    return (
      <PollTitleWrapper>
        <div className="title__div">
          {(
            this.state.willRename
              ?
              <Input
                size="large"
                autoFocus={true}
                className="title__input"
                onChange={this.changeTitle}
                onBlurCapture={this.handleTitleChange}
                value={this.state.name}
              />
              : <p className="title__input">{this.props.name}</p>
          )}
        </div>
        <div className="pen__div">
          <Button onClick={this.toggleRename} shape="circle" icon="edit"></Button>
        </div>
      </PollTitleWrapper>
    )
  }
}
export default PollTitle;