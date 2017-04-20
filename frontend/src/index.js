import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Dashboard from './components/dashboard';
import NewTodo from './components/todo/new_todo';
import RequireAuth from './components/auth/require_auth';
import Home from './components/home';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="signin" component={Signin}></Route>
        <Route path="signout" component={Signout}></Route>
        <Route path="signup" component={Signup}></Route>
        <Route path="dashboard" component={RequireAuth(Dashboard)}></Route>
        <Route path="todo" component={RequireAuth(NewTodo)}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#container'));
