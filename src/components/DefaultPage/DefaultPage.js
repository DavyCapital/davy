import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Button, Box, Typography } from "@material-ui/core";

import { Link } from "react-router-dom";

import { fetchLinkToken, getAccounts } from "../../actions/accountActions";

import Loader from "../Loader";

class DefaultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: {},
      errors: {}
    };
  }

  componentDidMount() {
    const { roles } = this.props;
    if (roles.premium) {
      this.props.getAccounts();
      this.props.fetchLinkToken();
    }
  }

  render() {
    let imageWidth;
    let imageHeight;
    let variant;
    const { accountsLoading, linkLoading } = this.props.plaid;

    switch (this.props.size) {
      case "small":
        imageWidth = 40;
        imageHeight = 40;
        variant = "h6";
        break;
  
      case "medium":
        imageWidth = 60;
        imageHeight = 60;
        variant = "h5";
        break;
  
      case "large":
        imageWidth = 100;
        imageHeight = 100;
        variant = "h4";
        break;
  
      default:
        imageWidth = 60;
        imageHeight = 60;
        variant = "h5";
        break;
    }

    if( accountsLoading || linkLoading) {
      return <Loader />
    } else if (this.props.type === "page") {
      return (
        <Box
          style={{ transform: "translate(-50%, -50%)" }}
          position="absolute"
          top="50%"
          left="50%"
          textAlign="center"
        >
          {this.props.image && (
            <Box
              clone
              mb={this.props.title || this.props.description ? 2 : 0}
              width={`${imageWidth}%`}
              height={`${imageHeight}%`}
            >
              {this.props.image}
            </Box>
          )}
  
          {this.props.title && (
            <Box mb={!this.props.description && this.props.button ? 2 : 0}>
              <Typography variant={variant}>{this.props.title}</Typography>
            </Box>
          )}
  
          {this.props.description && (
            <Box mb={this.props.button && 2}>
              <Typography variant="body1">{this.props.description}</Typography> 
            </Box>
          )}
  
          <Box mb={this.props.button && 2}>
            <br/>
            <Button component={Link} to={process.env.REACT_APP_LINK_PATH_1} style={{margin: "10px", width: "30%"}} size="large" variant="contained">{process.env.REACT_APP_LINK_PATH_1_NAME}</Button>
            <Button component={Link} to={process.env.REACT_APP_LINK_PATH_2} style={{margin: "10px", width: "30%"}} size="large" variant="contained">{process.env.REACT_APP_LINK_PATH_2_NAME}</Button>
          </Box>
          <Box mb={this.props.button && 2}>
            <br/>
            <Button component={Link} to={process.env.REACT_APP_LINK_PATH_3} style={{margin: "10px", width: "65%"}} variant="outlined" size="large" color="primary">{process.env.REACT_APP_LINK_PATH_3_NAME}</Button>
          </Box>
          {this.props.button && this.props.button}
        </Box>
      );
    } else if (this.props.type === "card") {
      return (
        <Box padding={this.props.padding} textAlign="center">
          {this.props.image && (
            <Box
              clone
              mb={this.props.title || this.props.description ? 2 : 0}
              width={`${imageWidth}%`}
              height={`${imageHeight}%`}
            >
              {this.props.image}
            </Box>
          )}
  
          {this.props.title && (
            <Box mb={!this.props.description && this.props.button ? 2 : 0}>
              <Typography variant={variant}>{this.props.title}</Typography>
            </Box>
          )}
          {this.props.description && (
            <Box mb={this.props.button && 2}>
              <Typography variant="body1">{this.props.description}</Typography>
            </Box>
          )}
          <Box mb={this.props.button && 2}>
            <br/>
            <Button component={Link} to={process.env.REACT_APP_LINK_PATH_1} style={{margin: "10px", width: "30%"}} size="large" variant="contained">{process.env.REACT_APP_LINK_PATH_1_NAME}</Button>
            <Button component={Link} to={process.env.REACT_APP_LINK_PATH_2} style={{margin: "10px", width: "30%"}} size="large" variant="contained">{process.env.REACT_APP_LINK_PATH_2_NAME}</Button>
          </Box>
          <Box mb={this.props.button && 2}>
            <br/>
            <Button component={Link} to={process.env.REACT_APP_LINK_PATH_3} style={{margin: "10px", width: "65%"}} variant="outlined" size="large" color="primary">{process.env.REACT_APP_LINK_PATH_3_NAME}</Button>
          </Box>
          {this.props.button && this.props.button}
        </Box>
      );
    } else {
      return null;
    }
  }
}

DefaultPage.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2,
  roles: {},
  accounts: [],
  transactions: []
};

DefaultPage.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,

  getAccounts: PropTypes.func.isRequired,
  fetchLinkToken: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { fetchLinkToken, getAccounts}
)(DefaultPage);
