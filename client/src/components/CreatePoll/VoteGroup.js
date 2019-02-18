import React, { useState, useEffect } from 'react';
import { List, Button, Input } from 'antd';


/**
 * @class VoteGroup
 * @usedIn {EditPoll, CreatePoll}
 */

function VoteGroup(props) {
  const [votes, setVotes] = useState(props.votes);

  useEffect(() => {
    setVotes(props.votes)
  });

  const update = (id, value, type) => {
    const voteCopy = [...votes]
    votes.find(a => {
      if (a.__id === id) {
        a[type] = value
        return true
      }
      return false
    })
    setVotes(voteCopy);
    props.rerender && props.rerender();
  }

  const { handleDelete, deletable, isUpdating } = props;
  isUpdating && votes.map(e => (e.__id = e._id));

  return (
    <List
      itemLayout="horizontal"
      dataSource={votes}
      renderItem={item => {
        const actions = [
          <Input
            type="color"
            defaultValue={item.color}
            value={item.color}
            onChange={e => update(item.__id, e.target.value, 'color')}
            style={{ width: '80px' }}
          />,
          <Input
            type="number"
            defaultValue={item.value}
            value={item.value}
            onChange={e => update(item.__id, e.target.value, 'value')}
            placeholder="vote value"
          />,
          deletable && (
            <Button icon="delete" shape="circle" onClick={() => handleDelete(item.__id)} />
          )
        ];
        return (
          <List.Item
            actions={actions}>
            <List.Item.Meta title={<p>{item.name}</p>} />
          </List.Item>
        )
      }}
    />
  )
}

export default VoteGroup
