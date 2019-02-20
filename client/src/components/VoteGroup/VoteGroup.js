import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Item from './Item';
import PropTypes from 'prop-types';

const ItemWrapper = styled.ul`
  display: inline-block;
  padding: 10px;
  list-style: none;
  width: 100%;

  li {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 10px 0;
    
    > * {
      margin: auto;
    }

    input {
      width: 15%;
    }
    
    > p {
      display: block;
      width: 120px;
      font-weight: 400;
    }

  }
`


/**
 * @class VoteGroup
 * @usedIn {EditPoll, CreatePoll}
 */

function VoteGroup(props) {
  const [votes, setVotes] = useState(props.votes);
  const { handleDelete, deletable, isUpdating } = props;
  isUpdating && votes.map(e => (e.__id = e._id));

  useEffect(() => {
    setVotes(props.votes)
  });

  const update = (value, id, type) => {
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

  return (
    <ItemWrapper>
      {
        votes.map(item => {
          return (
            <li key={item.__id}>
              <Item
                item={item}
                deletable={deletable}
                handleDelete={handleDelete}
                update={update}
              />
            </li>
          )
        })
      }
    </ItemWrapper>
  )
}


VoteGroup.propTypes = {
  rerender: PropTypes.func,
  votes: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      __id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
}

export default VoteGroup
