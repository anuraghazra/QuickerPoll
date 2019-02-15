import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './styles/App.css'

import Polls from './components/Polls/Polls'
import NavBar from './components/NavBar/NavBar'
import CreatePoll from './components/CreatePoll/CreatePoll'

import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter className="App">
        <>
          <NavBar />

          <Route exact path="/" component={Polls} />
          <Route path="/create" exact component={CreatePoll} />
        </>
      </BrowserRouter>
    )
  }
}

export default App
