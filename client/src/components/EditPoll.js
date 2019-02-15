import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import axios from 'axios'

import PollTitle from './CreatePoll/PollTitle'
import VoteGroup from './CreatePoll/VoteGroup'

class EditPoll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      willRename: false,
      _mongo_id: this.props.poll._id,
      name: this.props.poll.name,
      votes: this.props.poll.votes
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    this.setState({
      visible: false
    })
    let updatedValues = [
      { propName: 'name', value: this.state.name },
      { propName: 'votes', value: this.state.votes }
    ]

    axios
      .patch(`/api/polls/${this.state._mongo_id}`, updatedValues)
      .then(res => {
        console.log(res.data, 'Updated')
        this.props.updatePoll({ votes: this.state.votes, name: this.state.name })
      })
      .catch(err => {
        console.log('ERROR Updating Poll', err)
      })
  }

  handleCancel = e => {
    this.setState({
      visible: false
    })
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
    let vote_copy = [...this.state.votes]
    this.state.votes.find(a => {
      if (a.__id === id) {
        a.value = value
        return true
      }
      return false
    })
    this.setState({ votes: vote_copy })
  }

  // Updates the color value of VoteGroup
  updateVoteGroupColor = (id, value) => {
    let vote_copy = [...this.state.votes]
    this.state.votes.find(a => {
      if (a.__id === id) {
        a.color = value
        return true
      }
      return false
    })
    this.setState({ votes: vote_copy })
  }

  componentDidUpdate() {
    // this.setState({ votes: this.props.votes })
  }

  render() {
    console.log({ poll: this.props.poll })
    return (
      <div>
        <Button icon="edit" onClick={this.showModal} />
        <Modal
          title="Edit Poll"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <PollTitle changeTitle={this.changeTitle} name={this.state.name} />

          <VoteGroup
            isUpdating={true}
            deletable={false}
            updateValue={this.updateVoteGroupValue}
            updateColor={this.updateVoteGroupColor}
            polls={this.props.poll.votes}
          />
        </Modal>
      </div>
    )
  }
}

export default EditPoll
