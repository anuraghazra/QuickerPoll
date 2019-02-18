import React from 'react';
import { Row, Col, Spin, Empty } from 'antd';

import SinglePoll from './SinglePoll';

import '../../styles/Polls.css';
import Context from '../Context';


/**
 * @class Poll
 * @useIn {App}
 */
const Polls = () => {
  return (
    <Context.Consumer>
      {(context) => {
        const data = context.state.polls;
        let polls = <Empty />;
        if (data.count > 0) {
          polls = data.polls.map(poll => {
            return (
              <Col md={12} sm={24} lg={8} key={poll._id}>
                <SinglePoll poll={poll} />
              </Col>
            )
          });
        }

        return (
          <section className="polls">
            <Spin spinning={context.state.isLoading} tip="Fetching Polls...">
              <Row type="flex" justify="center" align="middle" className="polls">
                {polls}
              </Row>
            </Spin>
          </section>
        )
      }}
    </Context.Consumer>
  )
}

export default Polls;