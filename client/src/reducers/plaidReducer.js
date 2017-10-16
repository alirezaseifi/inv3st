import { GET_TRANSACTIONS } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions,
        savedChange: action.payload.savedChange,
        isDataLoaded: true
      };
    default:
      return state;
  }
}
