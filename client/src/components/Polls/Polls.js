import React, { useContext } from 'react';
import { Row, Col, Spin, Empty } from 'antd';

import SinglePoll from './SinglePoll';

import '../../styles/Polls.css';
import Context from '../Context';


/**
 * @class Poll
 * @useIn {App}
 */
const Polls = () => {
  const { polls: data, isLoading } = useContext(Context);

  return (
    <section className="polls">
      <Spin spinning={isLoading} tip="Fetching Polls...">
        <Row type="flex" justify="center" align="middle" className="polls">
          {
            data.polls ? data.polls.map(poll => {
              return (
                <Col md={12} sm={24} lg={8} key={poll._id}>
                  <SinglePoll poll={poll} />
                </Col>
              )
            }) : <Empty />
          }
        </Row>
      </Spin>
    </section>
  )
}

export default Polls;