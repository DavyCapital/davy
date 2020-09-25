import {
    FETCH_LINK_TOKEN,
    LINK_LOADING,
    ADD_ACCOUNT,
    DELETE_ACCOUNT,
    GET_ACCOUNTS,
    ACCOUNTS_LOADING,
    GET_BALANCES,
    BALANCES_LOADING,
    GET_TRANSACTIONS,
    TRANSACTIONS_LOADING
  } from "../actions/types";

  const initialState = {
    link: {},
    accounts: [],
    balances: [],
    transactions: [],
    linkLoading: false,
    accountsLoading: false,
    balancesLoading: false,
    transactionsLoading: false
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
      case BALANCES_LOADING:
        return {
          ...state,
          balancesLoading: true
        };
      case GET_BALANCES:
        return {
          ...state,
          balances: action.payload,
          balancesLoading: false
        };
      case TRANSACTIONS_LOADING:
        return {
          ...state,
          transactionsLoading: true
        };
      case GET_TRANSACTIONS:
        return {
          ...state,
          transactions: action.payload,
          transactionsLoading: false
        };
      default:
        return state;
    }
}