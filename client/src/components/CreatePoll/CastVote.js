import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Radio } from 'antd'
import axios from 'axios'

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

  handleOk = () => {
    this.setState({ isLoading: true })
    axios
      .patch(`/api/polls/cast/${this.props.poll._id}`, { vote_id: this.state.value })
      .then(res => {
        console.log(res.data, 'Updated')
        axios
          .get(`/api/polls/${this.props.poll._id}`)
          .then(result => {
            this.setState({ visible: false })
            this.reset()
            this.props.updatePoll(result.data.votes)
          })
          .catch(err => console.log(err))
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

  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Button icon="pie-chart" onClick={this.showModal} />
        <Modal
          title="Edit Poll"
          destroyOnClose={true}
          confirmLoading={this.state.isLoading}
          visible={this.state.visible}
          onOk={this.handleOk}
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
  }
}

CastVote.propTypes = {
  poll: PropTypes.shape({
    _id: PropTypes.string,
    votes: PropTypes.Array,
    name: PropTypes.string
  }).isRequired,
  updatePoll: PropTypes.func.isRequired
}
export default CastVote
