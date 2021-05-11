import './App.css'
import React from 'react'
import CreateAccount from './CreateAccount'
import {Container} from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch,  Route} from 'react-router-dom'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import Welcome from './Welcome'
import Navigation from './Navigation'
import Profile from './Profile'
import LoadData from './LoadData'

function App() {
  return(
    <>
    <Navigation />
      <Container className = "d-flex align-items-center justify-content-center">
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path='/' component={Welcome} />
              <PrivateRoute path='/updateprofile' component={UpdateProfile} />
              <Route path='/createaccount' component={CreateAccount} />
              <Route path='/login' component = {Login} />
              <Route path='/forgotpassword' component = {ForgotPassword} />
              <PrivateRoute path='/profile' component= {Profile} />
              <PrivateRoute path='/dashboard' component={LoadData} />
            </Switch>
          </AuthProvider>
        </Router>
      </Container>
      </>
  )
  
}

export default App;
