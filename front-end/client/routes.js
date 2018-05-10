import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import NowTime from './components/NowTime';

export default (
  <Route path="/" component = {App} >
    <IndexRoute component={Greetings}/>
    <Route path ="nowtime" component={NowTime}/>
    <Route path ="signup" component={SignupPage}/>
  </Route>
)
