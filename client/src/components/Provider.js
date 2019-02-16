import React, { Component } from 'react';
import Context from './Context';
import axios from 'axios';
import io from 'socket.io-client';
let socket = io();

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      polls: []
    }
  }

  componentDidMount() {
    this.getPolls();
    socket.on("update:server", data => {
      this.getPolls();
    });
  }

  getPolls = (callback) => {
    axios.get('/api/polls')
      .then(res => {
        callback && callback();
        this.setState({
          polls: res.data,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }

  addVote = (id, value, callback) => {
    axios.patch(`/api/polls/cast/${id}`, { vote_id: value })
      .then(res => {
        callback();
        this.getPolls();
        console.log('Updated Votes', res.data);
      })
      .catch(err => {
        console.log('ERROR Updating Poll', err);
      });
  }

  handleDeletePoll = (_id) => {
    axios.delete(`/api/polls/${_id}`, { data: { poll_id: _id } })
      .then(() => {
        this.getPolls();
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
          state: this.state,
          getPolls: this.getPolls,
          handleDeletePoll: this.handleDeletePoll,
          addVote: this.addVote
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider;