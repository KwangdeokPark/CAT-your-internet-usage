import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
//import setAuthorizationToken from './utils/setAuthorizationToken';
//import jwt from 'jsonwebtoken';
import { setCurrentUserById } from './actions/userActions';
import { setCurrentUser } from './actions/userActions';

import routes from './routes';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

///if(localStorage.jwtToken){
//  setAuthorizationToken(localStorage.jwtToken);
  if(localStorage.id != '') {
    store.dispatch(setCurrentUserById(localStorage.id));
  }
//}

//setAuthorizationToken(localStorage.jwtToken);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app'));
