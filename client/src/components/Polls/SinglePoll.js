import React, { Component } from 'react';

import {
  Card,
  Tooltip,
  Popconfirm,
  Button
} from 'antd';

import Chart from '../Chart';
import EditPoll from '../EditPoll';
import CastVote from '../CastVote';
import Context from '../Context';

class SinglePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      isEditing: false,
      isUpdated: false,
      isLoading: true
    }
  }

  deletePoll = (context) => {
    this.setState({
      isDeleting: true
    });
    context.handleDeletePoll(this.props.poll._id);
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          let poll_array = context.state.polls.polls;
          let poll = poll_array.find(e => e._id === this.props.pollid);
          console.log(poll)
          const Actions = [
            <Tooltip placement="left" title="vote">
              <CastVote
                icon="pie-chart"
                poll={poll}
              />
            </Tooltip>,

            <Tooltip placement="left" title="edit">
              <EditPoll poll={poll} />
            </Tooltip>,

            <Popconfirm
              placement="top"
              title={'delete this poll?'}
              onConfirm={() => this.deletePoll(context)}
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
                <h2 className="polls__item-title">{poll.name}</h2>
                <Chart name={poll.name} votes={poll.votes} />
              </Card>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

// SinglePoll.propTypes = {
//   poll: PropTypes.shape({
//     _id: PropTypes.string,
//     votes: PropTypes.Array,
//     name: PropTypes.string
//   }),
//   handleDeletePoll: PropTypes.func
// }

export default SinglePoll;