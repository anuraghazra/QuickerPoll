import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';

const PollTitleWrapper = styled.div`
  display: flex;
  margin: 20px 0;
  font-size: 24px;

  .title__div {
    margin-right: auto;
  }
  .title__input {
    border-radius: 10px;
    outline: none;
    font-size: 24px;
    border: 2px solid transparent;
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
  .pen__div {
    margin-right: 0;
    margin-left: 0;
    cursor: pointer;
  }
`;

/**
 * @component PollTitle
 * @usedIn {CreatePoll, EditPoll}
 */
function PollTitle(props) {
  const [willRename, setRename] = useState(false);
  const [name, setName] = useState(props.name);

  const toggleRename = () => { setRename(!willRename) }

  const changeTitle = (e) => {
    setName(e.target.value);
  }

  const handleTitleChange = () => {
    props.changeTitle(name);
    toggleRename();
  }

  return (
    <PollTitleWrapper>
      <div className="title__div">
        {(
          willRename
            ?
            <Input
              size="large"
              autoFocus={true}
              className="title__input"
              onChange={changeTitle}
              onBlurCapture={handleTitleChange}
              value={name}
            />
            : <p className="title__input">{name}</p>
        )}
      </div>
      <div className="pen__div">
        <Button onClick={toggleRename} shape="circle" icon="edit"></Button>
      </div>
    </PollTitleWrapper>
  )
}
export default PollTitle;