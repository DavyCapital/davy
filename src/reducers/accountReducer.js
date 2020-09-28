import {
    FETCH_LINK_TOKEN,
    LINK_LOADING,
    ADD_ACCOUNT,
    DELETE_ACCOUNT,
    GET_ACCOUNTS,
    ACCOUNTS_LOADING
  } from "../actions/types";

  const initialState = {
    link: {},
    accounts: [],
    linkLoading: false,
    accountsLoading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_LINK_TOKEN:
        return {
          ...state,
          link: action.payload,
          linkLoading: false
        };
      case LINK_LOADING:
        return {
          ...state,
          linkLoading: true
        };
      case ACCOUNTS_LOADING:
        return {
          ...state,
          accountsLoading: true
        };
      case ADD_ACCOUNT:
        return {
          ...state,
          accounts: [action.payload, ...state.accounts],
          accountsLoading: false
        };
      case DELETE_ACCOUNT:
        return {
          ...state,
          accounts: state.accounts.filter(
            account => account._id !== action.payload
          )
        };
      case GET_ACCOUNTS:
        return {
          ...state,
          accounts: action.payload,
          accountsLoading: false
        };
      default:
        return state;
    }
}