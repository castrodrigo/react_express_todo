import {
  SAVE_SUCESS,
  SAVE_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

export default function(state ={}, action) {
  switch(action.type) {
    case SAVE_SUCESS:
      return { ...state, save_error: '', message: action.payload};
    case SAVE_ERROR:
      return { ...state, save_error: action.payload };
    case FETCH_MESSAGE:
      console.log('action', action);
      return { ...state, message: action.payload };

  }
  return state;
}
