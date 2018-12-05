import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './App.css'

import Artigos from './Artigos/Artigos.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Exames from './Exames/Exames.jsx'
import PassRecovery from './PassRecovery/PassRecovery'
import SignIn from './SignIn/SignIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import SignUp2 from './SignUp/SignUp2.jsx'
import Trabalhos from './Trabalhos/Trabalhos.jsx'
import Upload from './Upload/Upload.jsx'
import Profile from './Profile/Profile'
import Things from './Things/Things'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/artigos" exact component={Artigos} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/exames" exact component={Exames} />
          <Route path="/recover-pass" exact component={PassRecovery} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-up2" exact component={SignUp2} />
          <Route path="/trabalhos" exact component={Trabalhos} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/things" exact component={Things} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}

export default App;
