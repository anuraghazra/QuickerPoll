import React, { useState, useEffect } from 'react';
import Context from './Context';
import axios from 'axios';
import io from 'socket.io-client';
import { message } from 'antd';

const Provider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getPolls();
    const socket = io();
    socket.on("update:server", () => {
      getPolls();
    });
  }, []);


  const getPolls = (callback) => {
    axios.get('/api/polls')
      .then(res => {
        setIsLoading(false);
        setPolls(res.data);
        callback && callback();
      })
      .catch(err => console.log(err));
  }

  const addVote = (id, value, callback) => {
    // eslint-disable-next-line 
    axios.patch(`/api/polls/cast/${id}`, { vote_id: value })
      .then(res => {
        callback();
        getPolls();
        message.success('Thanks for voting!', 3)
        console.log('Updated Votes', res.data);
      })
      .catch(err => {
        console.log('ERROR Updating Poll', err);
      });
  }

  const createPoll = (data, callback) => {
    axios.post('/api/polls', data)
      .then(() => {
        getPolls(callback);
      })
      .catch((error) => {
        console.log(error);
        message.error(`Something went wrong creating new poll!`, 3);
      });
  }

  const handleDeletePoll = (_id) => {
    // eslint-disable-next-line 
    axios.delete(`/api/polls/${_id}`, { data: { poll_id: _id } })
      .then(() => {
        getPolls();
        message.success('Poll has been deleted!', 3)
        const socket = io();
        socket.emit('update:client', true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Context.Provider
      value={{
        polls: polls,
        isLoading: isLoading,
        getPolls: getPolls,
        handleDeletePoll: handleDeletePoll,
        addVote: addVote,
        createPoll: createPoll
      }}>
      {props.children}
    </Context.Provider>
  )
}

export default Provider;