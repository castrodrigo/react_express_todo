import {
  AUTH_USER,
  UNAUTH_USER,
  SIGNIN_ERROR,
  SIGNUP_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

export default function(state ={}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, signin_error: '', signup_error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case SIGNIN_ERROR:
      return { ...state, signin_error: action.payload };
    case SIGNUP_ERROR:
      return { ...state, signup_error: action.payload };
    case FETCH_MESSAGE:
      console.log('action', action);
      return { ...state, message: action.payload };

  }
  return state;
}
