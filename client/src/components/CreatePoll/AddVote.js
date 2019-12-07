import React, { useState } from 'react';
import { ColorPopOver } from '../VoteGroup/ColorPicker';
import { Button, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const AddPollWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  flex-shrink: initial;
  
  .ui__add {
    display: flex;
    align-items: center;
    flex-shrink: initial;
    
    > * {
      margin: 5px;
      flex: 1;
    }
  }
`;

function randomHex(e) {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

const AddVote = (props) => {
  const [vote, setVote] = useState({ name: '', value: 0, color: randomHex() })

  const handleName = e => setVote({ ...vote, name: e.target.value });
  const handleValue = value => setVote({ ...vote, value: value });
  const handleColor = color => setVote({ ...vote, color: color });
  const handleSubmit = () => {
    props.addPollOption({
      name: vote.name, value: vote.value, color: vote.color
    });
    setVote({ name: '', value: 0, color: randomHex() });
  }

  const validateInputs = () => {
    return !(vote.name && vote.value !== undefined);
  }

  return (
    <AddPollWrapper>
      <div className="ui__add">
        <Input
          size="large"
          onChange={handleName}
          value={vote.name}
          placeholder="poll option" />
        <InputNumber
          size="large"
          max={100}
          onChange={handleValue}
          value={vote.value}
          defaultValue={vote.value} />
        <ColorPopOver style={{ height: "38px" }} update={handleColor} color={vote.color} />
      </div>

      <Button
        disabled={validateInputs()}
        style={{ minWidth: '40px' }}
        type="primary"
        size="large"
        shape="circle"
        icon="plus"
        onClick={handleSubmit}
      />
    </AddPollWrapper>
  )
}

AddVote.propTypes = {
  addPollOption: PropTypes.func.isRequired
}
export default AddVote;