import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Polls from './components/Polls/Polls'
import CreatePoll from './components/CreatePoll/CreatePoll'
import About from './components/About/About';
import Provider from './components/Provider';


import './styles/App.css'
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter className="App">
        <Provider>
          <NavBar />
          <Route exact path="/" component={Polls} />
          <Route path="/create" exact component={CreatePoll} />
          <Route path="/about" exact component={About} />
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App;
