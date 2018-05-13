import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import NowTime from './components/NowTime';
import LoginPage from './components/login/LoginPage';

export default (
  <Route path="/" component = {App} >
    <IndexRoute component={Greetings}/>
    <Route path ="sign_up" component={SignupPage}/>
    <Route path ="sign_in" component={LoginPage}/>
  </Route>
)
