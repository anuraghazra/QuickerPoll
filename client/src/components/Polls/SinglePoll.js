import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Tooltip, Popconfirm, Button } from 'antd';

import Chart from '../Chart';
import EditPoll from '../EditPoll';
import CastVote from '../CreatePoll/CastVote';

class SinglePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      isEditing: false,
      isUpdated: false,
      _mongo_id: this.props.data._id,
      votes: this.props.data.votes,
      name: this.props.data.name
    }

  }

  updatePoll = (data) => {
    this.setState({
      votes: data.votes,
      name: data.name
    })
  }


  deletePoll = () => {
    this.setState({
      isDeleting: true
    });
    this.props.handleDeletePoll(this.state._mongo_id);
  }

  updateVotes = (votes) => {
    this.setState({ votes: votes })
  }

  render() {
    let poll = { _id: this.state._mongo_id, name: this.state.name, votes: this.state.votes };
    const Actions = [
      <Tooltip placement="left" title="vote">
        <CastVote
          updatePoll={this.updateVotes}
          icon="pie-chart"
          poll={poll}
        />
      </Tooltip>,

      <Tooltip placement="left" title="edit">
        <EditPoll updatePoll={this.updatePoll} poll={poll} />
      </Tooltip>,

      <Popconfirm
        placement="top"
        title={'delete this poll?'}
        onConfirm={this.deletePoll}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip placement="left" title="delete">
          <Button icon={this.state.isDeleting ? 'loading' : 'delete'} />
        </Tooltip>
      </Popconfirm>
    ];

    return (
      <div>
        <Card
          className="polls__item"
          actions={Actions}>
          <h2 className="polls__item-title">{this.state.name}</h2>
          <Chart name={this.state.name} votes={this.state.votes} />
        </Card>
      </div>
    )
  }
}

SinglePoll.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    votes: PropTypes.Array,
    name: PropTypes.string
  }).isRequired,
  handleDeletePoll: PropTypes.func.isRequired
}

export default SinglePoll;