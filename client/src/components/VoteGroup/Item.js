import React from 'react';
import { Button, Input } from 'antd';
import { ColorPopOver } from './ColorPicker';
import PropTypes from 'prop-types';

const Item = ({ item, update, deletable, handleDelete }) => {
  return (
    <>
      <p>{item.name}</p>
      <ColorPopOver update={update} color={item.color} id={item.__id} />

      <Input
        type="number"
        defaultValue={item.value}
        value={item.value}
        onChange={e => update(e.target.value, item.__id, 'value')}
        placeholder="vote value"
      />
      {
        deletable && <Button icon="delete" shape="circle" onClick={() => handleDelete(item.__id)} />
      }
    </>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    __id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  update: PropTypes.func.isRequired,
  deletable: PropTypes.bool,
  handleDelete: PropTypes.func
}

export default Item;