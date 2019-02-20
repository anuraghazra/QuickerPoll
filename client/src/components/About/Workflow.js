import React from 'react';
import { Timeline } from 'antd';

const Workflow = () => {
  return (
    <Timeline className="timeline" mode="alternate">
      <Timeline.Item>
        <h3>Planning</h3>
        <p>The first thing in fullstack apps is Setting up the backend server</p>
      </Timeline.Item>
      <Timeline.Item color="green">
        <h3>Setting-up nodejs</h3>
        <p>I used nodejs to setup the backend for this app,
          because nodejs is scalable, fast and easy to create realtime apps
              </p>
      </Timeline.Item>
      <Timeline.Item color="red">
        <h3>Express, Mongoose, mLab</h3>
        <p>In third step i setup Express Server, Mongoose Schemas/Models
          and connected our app with mLab database which will act as a DBaaS (Database as a service)
              </p>
      </Timeline.Item>
      <Timeline.Item>
        <h3>Planing API Structure</h3>
        <p>RESTfull API should be consisten and easy to integrate with our Front-end app thats why planning the API models is neccesary
          for example our polls API looks like this /api/polls
              </p>
      </Timeline.Item>
      <Timeline.Item>
        <h3>Creating API Endpoints</h3>
        <p>
          basically we are creating a CRUD (Create, Read, Update, Delete) API which can be done easily with mongoose queries.
              </p>
      </Timeline.Item>
      <Timeline.Item>
        <h3>Front-End</h3>
        <p>
          since we are done with backend we are going to add client side code, we will use create-react-app boilerplate to make our life easy.
          to connect our front-end with back-end we are going to use concurrently NPM package to start both our servers at the same time.
          and to talk with our api endpoint we have to set a proxy to our client side package.json "proxy": "http://localhost:5000"
              </p>
      </Timeline.Item>
      <Timeline.Item>
        <h3>UI</h3>
        <p>
          we have to let users interact with our backend database through an elegant UI.
                so i decided to use <a href="https://ant.design">Ant Design</a> to scaffold the UIs.
      antd provides all the sleek UI components which can be used easily integrated with our app
      for example Menu, List, Input, Card, Popover, Icon
              </p>
      </Timeline.Item>
      <Timeline.Item>
        <h3>Making it real-time</h3>
        <p>
          After setting up our UI for our client-side CRUD operations i used <a href="https://socket.io/">socket.io</a> to make our app real-time
          and i used ReactContextAPI to manage Global state of the app
              </p>
      </Timeline.Item>
      <Timeline.Item>
        <h3>Deployment</h3>
        <p>
          i'm gonna use <a href="https://heroku.com">Heroku</a> to deploy our app online,
          heroku lets us depoly nodejs apps for free it uses something called Dynos to deploy nodejs apps.
          finnaly to depoly our app i'm gonna build our client side React code and make an optimized production build.
              </p>
      </Timeline.Item>
    </Timeline>
  )
}

export default Workflow;