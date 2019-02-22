import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import io from 'socket.io-client';

import { Button, Row, Col, message } from 'antd';

import Chart from '../Chart';
import PollTitle from '../PollTitle';
import AddVote from './AddVote';
import VoteGroup from '../VoteGroup/VoteGroup';

import Context from '../Context';


import styled from 'styled-components';
const CreatePollWrapper = styled.div`
  max-width: 980px;
  margin: auto;
  padding: 20px;
  color: #353535; 
`;

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willRedirect: false,
      isLoading: false,
      isError: false,
      name: 'My Poll',
      votes: [
        { "name": "react", value: 50, color: '#60cbee', __id: 0 },
        { "name": "angular", value: 30, color: '#f11b66', __id: 1 },
        { "name": "vue", value: 15, color: '#69e99c', __id: 2 }
      ]
    }
  }

  submitPoll = (context) => {
    this.setState({ isLoading: true });
    const data = {
      name: this.state.name,
      votes: this.state.votes,
    }
    context.createPoll(data, () => {
      this.setState({
        willRedirect: true
      })
      const socket = io();
      socket.emit('update:client', true);
      message.success(`${this.state.name} successfully created`, 3);
    })
  }


  addPollOption = (addedPoll) => {
    addedPoll.__id = Math.random() * 1000;
    const newvotes = [...this.state.votes, addedPoll];
    this.setState({
      votes: newvotes
    })
  }

  handleDelete = (id) => {
    this.setState(state => {
      return { votes: state.votes.filter(item => item.__id !== id) }
    })
  }

  changeTitle = (value) => {
    this.setState({ name: value })
  }

  handleRerender = () => {
    this.forceUpdate();
  }

  render() {
    if (this.state.willRedirect) {
      return <Redirect to="/" />
    }

    if (this.state.isError) {
      return <Button loading warning>Hmmmm.. Something Went Wrong</Button>
    }

    return (
      <Context.Consumer>
        {(context) => {
          return (
            <CreatePollWrapper>
              <PollTitle
                name={this.state.name}
                changeTitle={this.changeTitle}
              />

              <Row align="middle" justify="center" type="flex" >
                <Col md={24} lg={12}>

                  <AddVote addPollOption={this.addPollOption} />
                  <VoteGroup
                    deletable={true}
                    rerender={this.handleRerender}
                    handleDelete={this.handleDelete}
                    votes={this.state.votes}
                  />

                </Col>
                <Col md={24} lg={12}>
                  <Chart name={this.state.name} votes={this.state.votes} />
                </Col>
              </Row>

              <Button loading={this.state.isLoading} onClick={() => this.submitPoll(context)}>Create Poll</Button>
            </CreatePollWrapper>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default CreatePoll;