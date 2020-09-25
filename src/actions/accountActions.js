import axios from "axios";
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
} from "./types";

import { auth } from "../firebase";
import setAuthToken from "../utils/setAuthToken";

// Actions will go here

export const fetchLinkToken = () => dispatch => {
  auth
  .currentUser
  .getIdToken()
  .then(function(result) {
    setAuthToken(result);
    axios.post("/api/plaid/link/token/create")
    .then(res => {
      dispatch({
        type: FETCH_LINK_TOKEN,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: FETCH_LINK_TOKEN,
        payload: null
      })
    );
  })
  .catch(err => console.log(err))
}

// Link loading
export const setLinkLoading = () => {
  return {
    type: LINK_LOADING
  };
};

// Add account
export const addAccount = plaidData => dispatch => {
  dispatch(setAccountsLoading());
  const accounts = plaidData.accounts;
  auth
  .currentUser
  .getIdToken()
  .then(function(result) {
    setAuthToken(result);
    axios
    .post("/api/plaid/accounts/add", plaidData)
    .then(res =>
      dispatch({
        type: ADD_ACCOUNT,
        payload: res.data
      })
    )
    .then(data =>
      accounts ? dispatch(getTransactions(accounts.concat(data.payload))) : null
    )
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
};

// Delete account
export const deleteAccount = plaidData => dispatch => {
  if (window.confirm("Are you sure you want to remove this account?")) {
    const id = plaidData.id;
    const newAccounts = plaidData.accounts.filter(
      account => account._id !== id
    );
    auth
    .currentUser
    .getIdToken()
    .then(function(result) {
      setAuthToken(result);
      axios.delete(`/api/plaid/accounts/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_ACCOUNT,
            payload: id
          })
        )
        .then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
        .catch(err => console.log(err));      
      }
    )
  }
};
// Get all accounts for specific user
export const getAccounts = () => dispatch => {
  dispatch(setAccountsLoading());
  auth
  .currentUser
  .getIdToken()
  .then(function(result) {
    setAuthToken(result);
    axios.get("/api/plaid/accounts")
      .then(res =>
        dispatch({
          type: GET_ACCOUNTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ACCOUNTS,
          payload: null
        })
      );  
  })
};

// Accounts loading
export const setAccountsLoading = () => {
  return {
    type: ACCOUNTS_LOADING
  };
};
// Get Balances
export const getBalances = plaidData => dispatch => {
  dispatch(setBalancesLoading());
  auth
  .currentUser
  .getIdToken()
  .then(function(result) {
    setAuthToken(result);
    axios
      .post("/api/plaid/accounts/balance/get", plaidData)
      .then(res =>
        dispatch({
          type: GET_BALANCES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_BALANCES,
          payload: null
        })
      );  
  })
};
// Balances loading
export const setBalancesLoading = () => {
  return {
    type: BALANCES_LOADING
  };
};
// Get Transactions
export const getTransactions = plaidData => dispatch => {
  dispatch(setTransactionsLoading());
  auth
  .currentUser
  .getIdToken()
  .then(function(result) {
    setAuthToken(result);
    axios
      .post("/api/plaid/accounts/transactions", plaidData)
      .then(res =>
        dispatch({
          type: GET_TRANSACTIONS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_TRANSACTIONS,
          payload: null
        })
      );  
  })
};
// Transactions loading
export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING
  };
};