import React from 'react';
import { Row, Col, Spin } from 'antd';

import SinglePoll from './SinglePoll';

import '../../styles/Polls.css';
import Context from '../Context';

const Polls = () => {
  return (
    <Context.Consumer>
      {(context) => {
        let data = context.state.polls;
        let polls = null;
        if (data.count > 0) {
          polls = data.polls.map(poll => {
            return (
              <Col md={12} sm={24} lg={8} key={poll._id}>
                <SinglePoll pollid={poll._id} />
              </Col>
            )
          });
        }

        return (
          <section className="polls">
            <Spin spinning={context.state.isLoading} tip="Fetching Polls...">
              <Row type="flex" justify="center" className="polls" align="middle">
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