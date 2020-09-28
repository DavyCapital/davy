import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter , Link} from "react-router-dom";

import { auth } from "../../firebase";

import EmptyState from "../EmptyState";

import { Fab, Box } from "@material-ui/core";

import authentication from "../../services/authentication";

import { Search as SearchIcon } from "@material-ui/icons";

class HomePage extends Component {
  signInWithEmailLink = () => {
    const { user } = this.props;

    if (user) {
      return;
    }

    const emailLink = window.location.href;

    if (!emailLink) {
      return;
    }

    if (auth.isSignInWithEmailLink(emailLink)) {
      let emailAddress = localStorage.getItem("emailAddress");

      if (!emailAddress) {
        this.props.history.push("/");

        return;
      }

      authentication
        .signInWithEmailLink(emailAddress, emailLink)
        .then((value) => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.props.openSnackbar(
            `Signed in as ${displayName || emailAddress}`
          );
        })
        .catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            case "auth/expired-action-code":
            case "auth/invalid-email":
            case "auth/user-disabled":
              this.props.openSnackbar(message);
              break;

            default:
              this.props.openSnackbar(message);
              return;
          }
        })
        .finally(() => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <EmptyState
          title={`Welcome back, `+ user.firstName}
          description={process.env.REACT_APP_SEARCH_MESSAGE}
          search
          button={
            <Fab variant="extended" color="primary" component={Link} to="/">
              <Box clone mr={1}>
                <SearchIcon />
              </Box>
              Search
            </Fab>
          }
        />
      );
    }

    return (
      <Box>
        <EmptyState
          title={process.env.REACT_APP_DESCRIPTION}
          description={process.env.REACT_APP_MESSAGE}
          search
          button={
            <Fab variant="extended" color="primary" component={Link} to="/getstarted">
              <Box clone mr={1}>
                <SearchIcon />
              </Box>
              Search
            </Fab>
          }
        />
      </Box>
    );
  }

  componentDidMount() {
    this.signInWithEmailLink();
  }
}

HomePage.propTypes = {
  user: PropTypes.object
};

export default withRouter(HomePage);
