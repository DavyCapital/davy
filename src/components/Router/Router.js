import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import HomePage from "../HomePage";
import AdminPage from "../AdminPage";
import UserPage from "../UserPage";
import Page1 from "../Page1";
import Page2 from "../Page2";
import Page3 from "../Page3";
import PremiumApp from "../PremiumApp";
import SearchPage from "../SearchPage";
import NotFoundPage from "../NotFoundPage";

import { Fab, Box } from "@material-ui/core";

import { Link } from "react-router-dom";

import { Home as HomeIcon } from "@material-ui/icons";

class Router extends Component {
  render() {
    // Properties
    const { user, roles, bar } = this.props;

    // Functions
    const { openSnackbar } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        {bar}

        <Switch>
          <Route path="/" exact>
            <HomePage user={user} openSnackbar={openSnackbar} />
          </Route>

          <Route path="/admin">
            {user && roles.includes("admin") ? (
              <AdminPage />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/user/:userId">
            {user ? <UserPage /> : <Redirect to="/" />}
          </Route>

          <Route path={process.env.REACT_APP_SEARCH_LINK}>
            {<SearchPage search />}
          </Route>

          <Route path={process.env.REACT_APP_PREMIUM_APP_PATH}>
            {user ? <PremiumApp 
                      title={process.env.REACT_APP_PREMIUM_APP_NAME} 
                      description={process.env.REACT_APP_PREMIUM_APP_DESC}
                      button={
                        <Fab variant="extended" color="primary" component={Link} to="/">
                          <Box clone mr={1}>
                            <HomeIcon />
                          </Box>
                          Go Back
                        </Fab>
                      }
                    /> : <Redirect to="/" />
            }
          </Route>

          <Route path={process.env.REACT_APP_LINK_PATH_1}>
            {user ? <Page1 
                      title={process.env.REACT_APP_LINK_PATH_1_NAME} 
                      description={process.env.REACT_APP_LINK_PATH_1_DESC}
                      searchfilter={process.env.REACT_APP_LINK_PATH_1_FILTER}
                      button={
                        <Fab variant="extended" color="primary" component={Link} to="/">
                          <Box clone mr={1}>
                            <HomeIcon />
                          </Box>
                          Go Back
                        </Fab>
                      }
                    /> : <Redirect to="/" />}
          </Route>

          <Route path={process.env.REACT_APP_LINK_PATH_2}>
            {user ? <Page2 
                      title={process.env.REACT_APP_LINK_PATH_2_NAME} 
                      description={process.env.REACT_APP_LINK_PATH_2_DESC}
                      searchfilter={process.env.REACT_APP_LINK_PATH_2_FILTER}
                      button={
                        <Fab variant="extended" color="primary" component={Link} to="/">
                          <Box clone mr={1}>
                            <HomeIcon />
                          </Box>
                          Go Back
                        </Fab>
                      }
                    /> : <Redirect to="/" />}
          </Route>

          <Route path={process.env.REACT_APP_LINK_PATH_3}>
            {user ? <Page3 
                      title={process.env.REACT_APP_LINK_PATH_3_NAME} 
                      description={process.env.REACT_APP_LINK_PATH_3_DESC}
                      searchfilter={process.env.REACT_APP_LINK_PATH_3_FILTER}
                      button={
                        <Fab variant="extended" color="primary" component={Link} to="/">
                          <Box clone mr={1}>
                            <HomeIcon />
                          </Box>
                          Go Back
                        </Fab>
                      }
                      /> : <Redirect to="/" />}
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
  bar: PropTypes.element,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default Router;
