import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Radio } from 'antd'
import Context from './Context';
import io from 'socket.io-client';

const RadioGroup = Radio.Group

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
}

class CastVote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      isLoading: false,
      value: null
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  reset = () => {
    this.setState({
      isLoading: false,
      value: null
    })
  }

  handleOk = (context) => {
    this.setState({ isLoading: true })
    context.addVote(this.props.poll._id, this.state.value, () => {
      this.setState({ visible: false });
      this.reset();
    });
    const socket = io();
    socket.emit('update:client', true);
    // this.props.updatePoll(result.data.votes);
  }


  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <Context.Consumer>
        {(context) => {
          return (
            <div>
              <Button icon="pie-chart" onClick={this.showModal} />
              <Modal
                title="Edit Poll"
                destroyOnClose={true}
                confirmLoading={this.state.isLoading}
                visible={this.state.visible}
                onOk={() => this.handleOk(context)}
                onCancel={this.handleCancel}>
                <h2>Vote for "{this.props.poll.name}"</h2>

                <RadioGroup onChange={this.onChange} value={this.state.value}>
                  {this.props.poll.votes.map(item => {
                    return (
                      <Radio style={radioStyle} key={item._id} value={item._id}>
                        {item.name}
                      </Radio>
                    )
                  })}
                </RadioGroup>
              </Modal>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

CastVote.propTypes = {
  poll: PropTypes.shape({
    _id: PropTypes.string,
    votes: PropTypes.Array,
    name: PropTypes.string
  }).isRequired,
  updatePoll: PropTypes.func
}
export default CastVote
