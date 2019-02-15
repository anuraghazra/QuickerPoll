import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import styled from 'styled-components';
import { Button, Row, Col } from 'antd';

import Chart from '../Chart';
import PollTitle from './PollTitle';
import AddVote from './AddVote';
import VoteGroup from './VoteGroup';

import '../../styles/CreatePoll.css';


const CreatePollWrapper = styled.div`
  max-width: 980px;
  margin: auto;
  padding: 20px;
  color: #353535; 
`;

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willRedirect: false,
      isLoading: false,
      isError: false,
      name: 'My Poll',
      votes: [
        { "name": "react", value: 50, color: '#60cbee', __id: 0 },
        { "name": "angular", value: 30, color: '#f11b66', __id: 1 },
        { "name": "vue", value: 15, color: '#69e99c', __id: 2 }
      ]
    }
  }

  submitPoll = () => {
    this.setState({ isLoading: true });
    let data = {
      name: this.state.name,
      votes: this.state.votes,
    }
    axios.post('/api/polls', data)
      .then((res) => {
        this.setState({
          willRedirect: true
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ isError: true })
      });
  }


  addPollOption = (addedPoll) => {
    addedPoll.__id = Math.random() * 1000;
    let newvotes = [...this.state.votes, addedPoll];
    this.setState({
      votes: newvotes
    })
  }

  // Updates the input value of PollVote
  updateVoteGroupValue = (id, value) => {
    let vote_copy = [...this.state.votes];
    this.state.votes.find((a, b) => {
      if (a.__id === id) {
        a.value = value;
        return true;
      };
      return false;
    });
    this.setState({ votes: vote_copy });
  }

  // Updates the color value of PollVote
  updateVoteGroupColor = (id, value) => {
    let vote_copy = [...this.state.votes];
    this.state.votes.find(a => {
      if (a.__id === id) {
        a.color = value;
        return true;
      };
      return false;
    });
    this.setState({ votes: vote_copy });
  }

  handleDelete = (id) => {
    this.setState(state => {
      return { votes: state.votes.filter(item => item.__id !== id) }
    })
  }

  changeTitle = (value) => {
    this.setState({ name: value })
  }

  parseChartdata = () => {
    let labels = [];
    let data = [];
    let colors = [];
    for (let i = 0; i < this.state.votes.length; i++) {
      labels.push(this.state.votes[i].name);
      data.push(this.state.votes[i].value);
      colors.push(this.state.votes[i].color);
    }
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: this.state.name,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
          data: data
        }
      ]
    }
    return chartData;
  }

  render() {
    if (this.state.willRedirect) {
      return <Redirect to="/" />
    }
    const chartData = this.parseChartdata();

    if (this.state.isError) {
      return <Button loading warning>Hmmmm.. Something Went Wrong</Button>
    }

    return (
      <CreatePollWrapper>
        <PollTitle
          name={this.state.name}
          changeTitle={this.changeTitle}
        />
        <Row align="middle" justify="center" type="flex" >
          <Col md={24} lg={12}>
            <AddVote addPollOption={this.addPollOption} />
            <VoteGroup
              deletable={true}
              handleDelete={this.handleDelete}
              updateValue={this.updateVoteGroupValue}
              updateColor={this.updateVoteGroupColor}
              polls={this.state.votes} />
          </Col>
          <Col md={24} lg={12}>
            <Chart name={this.state.name} votes={this.state.votes} />
          </Col>
        </Row>
        <Button loading={this.state.isLoading} onClick={this.submitPoll}>Create Poll</Button>
      </CreatePollWrapper>
    )
  }
}

export default CreatePoll;