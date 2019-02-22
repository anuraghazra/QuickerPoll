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
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);
  const [color, setColor] = useState(randomHex());

  const handleName = e => setName(e.target.value);
  const handleValue = value => setValue(value);
  const handleColor = color => setColor(color);
  const handleSubmit = (e) => {
    props.addPollOption({
      name, value, color
    });
    setName('');
    setValue(0);
    setColor(randomHex());
  }

  const validateInputs = () => {
    return !(name && value !== undefined);
  }

  return (
    <AddPollWrapper>
      <div className="ui__add">
        <Input
          size="large"
          onChange={handleName}
          value={name}
          placeholder="poll option" />
        <InputNumber
          size="large"
          max={100}
          onChange={handleValue}
          value={value}
          defaultValue={value} />
        <ColorPopOver style={{ height: "38px" }} update={handleColor} color={color} />
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