import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import NowTimePage from './components/nowTime/NowTimePage';
import LoginPage from './components/login/LoginPage';
import SettingsPage from './components/settings/SettingsPage';
import SettingsEdit from './components/settings/SettingsEdit';
import StatsPage from './components/stats/StatsPage';

export default (
  <Route path="/" component = {App} >
    <IndexRoute component={Greetings}/>
    <Route path ="sign_up" component={SignupPage}/>
    <Route path ="sign_in" component={LoginPage}/>
    <Route path ="main" component={NowTimePage}/>
    <Route path ="settings" component={SettingsPage}/>
    <Route path ="settingsEdit" component={SettingsEdit}/>
    <Route path ="stats" component={StatsPage}/>
  </Route>
)
