import React, { useState, useContext } from 'react';
import { Modal, Button, Radio, message } from 'antd';
import PropTypes from 'prop-types';
import Context from './Context';
import socket from './io';

const RadioGroup = Radio.Group

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
}

function CastVote(props) {
  const context = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  const showModal = () => {
    setVisible(true);
  }

  const reset = () => {
    setLoading(false);
    setValue(null);
  }

  const handleOk = () => {
    setLoading(true);
    context.addVote(props.poll._id, value, () => {
      setVisible(false);
      message.success('Thanks for voting!', 3)
      socket.emit('update:client', true);
      reset();
    });
    // this.props.updatePoll(result.data.votes);
  }


  const handleCancel = e => {
    setVisible(false);
  }

  const onChange = e => {
    setValue(e.target.value);
  }
  return (
    <div>
      <Button icon="pie-chart" onClick={showModal} />
      <Modal
        centered
        title="Cast Vote"
        confirmLoading={isLoading}
        visible={visible}
        onOk={handleOk}
        okButtonProps={{
          disabled: (value === null) ? true : false
        }}
        onCancel={handleCancel}>
        <h2>Vote for "{props.poll.name}"</h2>

        <RadioGroup onChange={onChange} value={value}>
          {props.poll.votes.map(item => {
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

CastVote.propTypes = {
  poll: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        __id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ).isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}
export default CastVote
