import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './App.css'

import Dashboard from './Dashboard/Dashboard.jsx'
import PassRecovery from './PassRecovery/PassRecovery'
import SignIn from './SignIn/SignIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import SignUp2 from './SignUp/SignUp2.jsx'
import Upload from './Upload/Upload.jsx'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/recover-pass" exact component={PassRecovery} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-up2" exact component={SignUp2} />
          <Route path="/upload" exact component={Upload} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}

export default App;
