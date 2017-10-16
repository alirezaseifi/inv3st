import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import plaidReducer from './plaidReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  plaid: plaidReducer,
  routing: routerReducer
});

export default rootReducer;
