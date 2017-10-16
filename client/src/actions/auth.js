import axios from 'axios';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTH_USER,
  LOGIN_FAILURE,
  ACCESS_TOKEN_SUCCESS,
  VERIFY_ACCOUNT_FAILURE,
  STRIPE_SUCCESS,
  UNAUTH_USER
} from './types';

export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

export function signupUser(props) {
  return function(dispatch) {
    axios.post('/signup', props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch(push(`/signup/verify-account?email=${props.email}`));
      })
      .catch(error => {
        dispatch(authError(SIGNUP_FAILURE, error.response.data.error));
      });
  }
}

export function loginUser(props) {
  const { email, password } = props;

  return function(dispatch) {
    axios.post('/login', { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: AUTH_USER, payload: response.data });
        if (response.data.hasAccessToken && response.data.hasCustomerId) {
          dispatch(push('/dashboard'));
        } else {
          dispatch(push('/setup-account'));
        }
      })
      .catch(() => {
        dispatch(authError(LOGIN_FAILURE, "Email or password is invalid."));
      });
  }
}

export function verifyAccount(props) {
  return function(dispatch) {
    axios.post('/signup/verify-account', props)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: AUTH_USER, payload: response.data });
        dispatch(push('/setup-account'));
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
        dispatch(authError(VERIFY_ACCOUNT_FAILURE, error.response.data.error));
      });
  }
}

export function callback(props) {
    console.log(props);

  return function(dispatch) {
    axios.get('/callback', {params:props})
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: STRIPE_SUCCESS, payload: response.data });
        dispatch(push('/setup-account'));
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
        dispatch(authError(VERIFY_ACCOUNT_FAILURE, error.response.data.error));
      });
  }
}

export function signOut() {
  localStorage.clear();
  browserHistory.push('/');
  return {
    type: UNAUTH_USER,
  }
}
