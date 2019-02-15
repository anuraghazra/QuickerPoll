import React from 'react'
import { List, Button, InputNumber, Input } from 'antd'

const VoteGroup = ({ polls, handleDelete, updateValue, updateColor, deletable, isUpdating }) => {
  isUpdating && polls.map(e => (e.__id = e._id))
  return (
    <List
      itemLayout="horizontal"
      dataSource={polls}
      renderItem={item => (
        <List.Item
          actions={[
            <Input
              type="color"
              defaultValue={item.color}
              value={item.color}
              onChange={e => updateColor(item.__id, e.target.value)}
              style={{ width: '80px' }}
            />,
            <InputNumber
              defaultValue={item.value}
              onChange={value => updateValue(item.__id, value)}
              placeholder="vote value"
            />,
            deletable && (
              <Button icon="delete" shape="circle" onClick={() => handleDelete(item.__id)} />
            )
          ]}>
          <List.Item.Meta title={<p>{item.name}</p>} />
        </List.Item>
      )}
    />
  )
}

export default VoteGroup
