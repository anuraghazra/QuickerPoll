import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button, message } from 'antd';
import socket from './io';

import PollTitle from './PollTitle';
import VoteGroup from './VoteGroup/VoteGroup';
import Context from './Context';

/**
 * @class EditPoll
 * @usedIn {SinglePoll} 
 */
class EditPoll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      willRename: false,
      isLoading: false,
      _mongo_id: this.props.poll._id, // eslint-disable-line
      poll: this.props.poll,
    }
  }

  componentDidUpdate(prevprops, prevState) {
    if (prevprops.poll !== this.props.poll) {
      this.setState({ poll: this.props.poll })
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
      isLoading: true
    })
    const updatedValues = [
      { propName: 'name', value: this.state.poll.name },
      { propName: 'votes', value: this.state.poll.votes }
    ]

    context.editPoll(this.state._mongo_id, updatedValues, () => {
      const pollArray = this.context.polls.polls;
      const poll = pollArray.find(e => e._id === this.state.poll._id);
      this.setState({
        visible: false,
        isLoading: false
      })
      socket.emit('update:client', true);
      message.success('Poll has been updated!', 3);
      this.setState(() => {
        return { poll: poll }
      });
    }, (err) => {
      console.error(err);
      message.success('Something went wrong editing the poll!' + err.message, 3);
    })
  }

  handleTitleRename = () => {
    this.setState(prev => {
      return { willRename: !prev.willRename }
    })
  }

  changeTitle = value => {
    this.setState({
      poll: {
        ...this.state.poll,
        name: value
      }
    })
  }

  handleRerender = () => {
    this.forceUpdate();
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          return (
            <div>
              <Button icon="edit" onClick={this.showModal} />
              <Modal
                confirmLoading={this.state.isLoading}
                title="Edit Poll"
                visible={this.state.visible}
                onOk={() => this.handleOk(context)}
                onCancel={this.handleCancel}>
                <PollTitle
                  changeTitle={this.changeTitle}
                  name={this.state.poll.name}
                />

                <VoteGroup
                  isUpdating={true}
                  deletable={false}
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

EditPoll.contextType = Context;

EditPoll.propTypes = {
  poll: PropTypes.shape({
    _id: PropTypes.string,
    votes: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        __id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
    name: PropTypes.string
  }).isRequired,
}

export default EditPoll;
