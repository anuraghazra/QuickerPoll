import React, { Component } from 'react';
import Context from './Context';
import axios from 'axios';
import io from 'socket.io-client';
import { message } from 'antd';

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      polls: [],
      getPolls: this.getPolls,
      handleDeletePoll: this.handleDeletePoll,
      addVote: this.addVote
    }
  }

  componentDidMount() {
    this.state.getPolls();
    const socket = io();
    socket.on("update:server", () => {
      this.state.getPolls();
    });
  }

  getPolls = (callback) => {
    axios.get('/api/polls')
      .then(res => {
        this.setState({
          polls: res.data,
          isLoading: false
        }, () => {
          callback && callback();
        });
      })
      .catch(err => console.log(err));
  }

  addVote = (id, value, callback) => {
    // eslint-disable-next-line 
    axios.patch(`/api/polls/cast/${id}`, { vote_id: value })
      .then(res => {
        callback();
        this.state.getPolls();
        message.success('Thanks for voting!', 3)
        console.log('Updated Votes', res.data);
      })
      .catch(err => {
        console.log('ERROR Updating Poll', err);
      });
  }

  handleDeletePoll = (_id) => {
    // eslint-disable-next-line 
    axios.delete(`/api/polls/${_id}`, { data: { poll_id: _id } })
      .then(() => {
        this.state.getPolls();
        message.success('Poll has been deleted!', 3)        
        const socket = io();
        socket.emit('update:client', true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider;