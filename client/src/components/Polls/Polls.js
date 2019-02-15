import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Spin } from 'antd';

import SinglePoll from './SinglePoll';

import '../../styles/Polls.css';
import 'antd/dist/antd.css';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    }
  }

  handleDeletePoll = (_id) => {
    axios.delete(`/api/polls/${_id}`, { data: { poll_id: _id } })
      .then(res => {
        this.getPolls();
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
  }

  getPolls = () => {
    axios.get('/api/polls')
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getPolls();
  }

  render() {
    let data = this.state.data;
    let polls = null;
    if (data.count > 0) {
      polls = data.polls.map(poll => {
        return (
          <Col md={12} sm={24} lg={8} key={poll._id}>
            <SinglePoll
              handleDeletePoll={this.handleDeletePoll}
              data={poll} />
          </Col>
        )
      });
    }

    return (
      <section className="polls">
        <Spin spinning={this.state.loading} tip="Fetching Polls...">
          <Row type="flex" justify="center" className="polls" align="middle">
            {polls}
          </Row>
        </Spin>
      </section>
    )
  }
}

export default Polls;