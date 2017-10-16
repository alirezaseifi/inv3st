import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTH_USER,
  LOGIN_FAILURE,
  VERIFY_ACCOUNT_FAILURE,
  UNAUTH_USER,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR,
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: true,
        error: {}
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: false,
        error: {
          signup: action.payload
        }
      };
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: {},
        user: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: {
          login: action.payload
        }
      };
    case VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        signup: true,
        error: {
          verifyAccount: action.payload
        }
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        error: {}
      };
    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          hasAccessToken: true
        },
        error: {}
      };
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          hasAccessToken: false
        },
        error: action.payload
      };
    case STRIPE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          hasCustomerId: true
        },
        error: {}
      };
    case STRIPE_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          hasCustomerId: false
        },
        error: action.payload
      };
    default:
      return state;
  }
}
