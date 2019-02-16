import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import axios from 'axios'
import io from 'socket.io-client';

import PollTitle from './CreatePoll/PollTitle'
import VoteGroup from './CreatePoll/VoteGroup'
import Context from './Context';

class EditPoll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      willRename: false,
      _mongo_id: this.props.poll._id,
      poll: this.props.poll
    }
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({ poll: newProps.poll });
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.poll !== prevState.poll) {
      return ({ poll: nextProps.poll }) // <- this is setState equivalent
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleOk = context => {
    this.setState({
      visible: false
    })
    let updatedValues = [
      { propName: 'name', value: this.state.poll.name },
      { propName: 'votes', value: this.state.poll.votes }
    ]

    axios.patch(`/api/polls/${this.state._mongo_id}`, updatedValues)
      .then(res => {
        console.log(res.data, 'Updated');
        context.getPolls();
        this.setState({
          poll: this.props.poll
        })
      })
      .catch(err => {
        console.log('ERROR Updating Poll', err)
      })
    const socket = io();
    socket.emit('update:client', true);
  }

  handleTitleRename = () => {
    this.setState(prev => {
      return { willRename: !prev.willRename }
    })
  }

  changeTitle = value => {
    this.setState({ name: value })
  }

  // Updates the input value of VoteGroup
  updateVoteGroupValue = (id, value) => {
    let vote_copy = [...this.state.poll.votes]
    this.state.poll.votes.find(a => {
      if (a.__id === id) {
        a.value = value
        return true
      }
      return false
    })
    this.setState({
      poll: { ...this.state.poll, votes: vote_copy }
    })
  }

  // Updates the color value of VoteGroup
  updateVoteGroupColor = (id, value) => {
    let vote_copy = [...this.state.poll.votes]
    this.state.poll.votes.find(a => {
      if (a.__id === id) {
        a.color = value
        return true;
      }
      return false;
    })
    this.setState({
      poll: { ...this.state.poll, votes: vote_copy }
    })
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          return (
            <div>
              <Button icon="edit" onClick={this.showModal} />
              <Modal
                title="Edit Poll"
                visible={this.state.visible}
                onOk={() => this.handleOk(context)}
                onCancel={this.handleCancel}>
                <PollTitle changeTitle={this.changeTitle} name={this.state.poll.name} />

                <VoteGroup
                  isUpdating={true}
                  deletable={false}
                  updateValue={this.updateVoteGroupValue}
                  updateColor={this.updateVoteGroupColor}
                  votes={this.state.poll.votes}
                />
              </Modal>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default EditPoll;
