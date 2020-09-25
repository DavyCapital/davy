import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";
import "./index.css";
import { Provider } from "react-redux";
import { basicReduxStore } from "./reduxStore";
import App from "./components/App";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
});
ReactDOM.render(
  <Provider store={basicReduxStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.register();