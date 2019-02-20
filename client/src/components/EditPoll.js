import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd'
import axios from 'axios'
import io from 'socket.io-client';

import PollTitle from './PollTitle'
import VoteGroup from './VoteGroup/VoteGroup'
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
      _mongo_id: this.props.poll._id, // eslint-disable-line
      poll: this.props.poll
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
      visible: false
    })
    const updatedValues = [
      { propName: 'name', value: this.state.poll.name },
      { propName: 'votes', value: this.state.poll.votes }
    ]

    axios.patch(`/api/polls/${this.state._mongo_id}`, updatedValues)
      .then(res => {
        console.log(res.data, 'Updated');
        context.state.getPolls(() => {
          const pollArray = this.context.state.polls.polls;
          const poll = pollArray.find(e => e._id === this.state.poll._id);
          this.setState(() => {
            return { poll: poll }
          }, () => {
            const socket = io();
            socket.emit('update:client', true);
          })
        });
      })
      .catch(err => {
        console.log('ERROR Updating Poll', err)
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
