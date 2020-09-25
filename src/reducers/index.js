import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  plaid: accountReducer
});
