import React, { useState, useContext } from 'react';

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


/**
 * @class EditPoll
 * @usedIn {Poll}
 */
function SinglePoll(props) {
  const [isDeleting, setDeleting] = useState(false);
  const context = useContext(Context);
  const { poll } = props;

  const deletePoll = (context) => {
    setDeleting(true);
    context.state.handleDeletePoll(poll._id);
  }
  

  // Poll Actions (vote/edit/delete)
  const ActionVote = (
    <Tooltip placement="left" title="vote">
      <CastVote icon="pie-chart" poll={poll} />
    </Tooltip>
  )
  const ActionEdit = (
    <Tooltip placement="left" title="edit">
      <EditPoll poll={poll} />
    </Tooltip>
  )
  const ActionPop = (
    <Popconfirm
      placement="top"
      title={'delete this poll?'}
      onConfirm={() => deletePoll(context)}
      okText="Yes"
      cancelText="No"
    >
      <Tooltip placement="left" title="delete">
        <Button icon={isDeleting ? 'loading' : 'delete'} />
      </Tooltip>
    </Popconfirm>
  );

  const Actions = [
    ActionVote,
    ActionEdit,
    ActionPop
  ];

  return (
    <section>
      <div>
        <Card className="polls__item" actions={Actions}>
          <h2 className="polls__item-title">{poll.name}</h2>
          <Chart name={poll.name} votes={poll.votes} />
        </Card>
      </div>
    </section>
  )
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