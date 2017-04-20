import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import todoReducer from './todo_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  todo: todoReducer
});

export default rootReducer;
