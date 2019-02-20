import React from 'react';
import styled from 'styled-components';

import { Divider, Row, Col, Tag } from 'antd';
import Workflow from './Workflow';
import ToolsUsed from './ToolsUsed';

const AboutWrapper = styled.section`
  color: #252525;
  padding : 20px;
  margin: auto;

  .timeline {
    padding: 30px;
  }

  .tools-used {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 15px;
    flex-wrap: wrap;

    .ant-card {
      flex: 1 200px;
      width: 200px;
      height: 220px;
      margin: 5px;
    }
  }
`


function About() {
  return (
    <AboutWrapper>
      <Row type="flex" justify="center">
        <Col sm={24} md={16}>
          <Divider orientation="left" style={{ fontSize: "24px" }}> About QuickPoll </Divider>

          <p>
            QuickPoll is a crowd-sourced real-time polling app created with React and Nodejs.
            QuickPoll lets you create, edit, update, delete public polls
            and vote on them publicly.
            This project is just an example of using react, nodejs and restfull apis all together
            <br />
            <br />
            please do not create any violating contents here as is this database is publicly visible
            and i'm not responsibe for any violating content
          </p>

          <Divider orientation="left" style={{ fontSize: "24px" }}> Tools used </Divider>
          <Tag><a href="https://chartjs.org">chart.js</a></Tag>
          <Tag><a href="https://casesandberg.github.io/react-color/">react-color</a></Tag>
          <Tag><a href="https://www.styled-components.com">styled-components</a></Tag>
          <Tag><a href="http://socket.io">socket.io</a></Tag>
          <ToolsUsed />
          
          <Divider orientation="left" style={{ fontSize: "24px" }}> Workflow </Divider>
          <Workflow />

        </Col>
      </Row>
    </AboutWrapper>
  )
}

export default About;