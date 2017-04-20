import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
  SAVE_TODO,
  SAVE_ERROR
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
        browserHistory.push('/dashboard');
      })
      .catch((err) => {
        dispatch(signinError('Incorrect data'));
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
        browserHistory.push('/dashboard');
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        dispatch(signupError(error.response.data.error));
      });
  }
}

export function signinError(error) {
  return {
    type: SIGNIN_ERROR,
    payload: error
  }
}
export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: error
  }
}
export function saveError(error) {
  return {
    type: SAVE_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  browserHistory.push('/');
  return {
    type: UNAUTH_USER
  }
}

export function getTodosByUser() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/todo/user/${localStorage.getItem('user_id')}`)
      .then(response => {
        localStorage.setItem('todos', response.data.todos);
      })
      .catch(error => {
        console.log('error', error.response.data.error);
      });
  }
}

export function postTodo({ title, description}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/todo`, {
      "title": title,
      "description": description,
      "user": localStorage.getItem('user_id')
      })
      .then(response => {
        browserHistory.push('/dashboard');
        dispatch({ type: SAVE_SUCCESS, payload: "Data saved with sucess!"});
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        dispatch(saveError(error.response.data.error));
      });
  }
}

export function updateTodo({ title, description }) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/todo`, {
      "title": title,
      "description": description,
      "user_id": localStorage.getItem('user_id')
      })
      .then(response => {
        //TODO
      })
      .catch(error => {
        console.log('error', error.response.data.error);
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
        dispatch(signinError('Incorrect data'));
      });
  }
}
