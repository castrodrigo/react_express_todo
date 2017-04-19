import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:8081';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_email', response.data.user_email);
        browserHistory.push('/feature');
      })
      .catch((err) => {
        dispatch(authError('Incorrect data'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_email', response.data.user_email);
        browserHistory.push('/feature');
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function getTodosByUser({ user_id }) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/todo/user/${user_id}`)
      .then(response => {
        //TODO
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  }
}

export function postTodo({ title, description, user_id }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/todo`, { title, description, user_id })
      .then(response => {
        //TODO
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  }
}

export function updateTodo({ title, description, status, user_id }) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/todo`, { title, description, status, user_id })
      .then(response => {
        //TODO
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        console.log('action creator',response.data.message);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })
      .catch((err) => {
        dispatch(authError('Incorrect data'));
      });
  }
}
