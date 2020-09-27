import React from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";

import { Box, Typography } from "@material-ui/core";

import { addAccount, getTransactions } from "../../actions/accountActions";


class PremiumApp extends React.Component {

  componentDidMount() {
    const { accounts } = this.props.plaid;
      if(accounts.length > 0) {
        this.props.getTransactions(accounts);
      }
  }

  // Add account
  handleOnSuccess = (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata: metadata
    };
    this.props.addAccount(plaidData);
  };

  render() {
    let imageWidth;
    let imageHeight;
    let variant;

    const { link } = this.props.plaid;
  
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

    if (this.props.type === "page") {
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

          {this.props.link && (
            <Box mb={this.props.button && 2}>
              <hr/>
              <Box>
                <PlaidLinkButton
                  buttonProps={{
                    className:
                      "btn btn-large main-btn link-button"
                  }}
                  plaidLinkProps={{
                    token: link.link_token,
                    clientName: process.env.REACT_APP_CLIENT,
                    key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                    env: process.env.REACT_APP_ENVIRONMENT,
                    product: ["transactions"],
                    onSuccess: this.handleOnSuccess
                  }}
                  onScriptLoad={() => this.setState({ loaded: true })}
                >
                  Link Account
                </PlaidLinkButton>
              </Box>
            </Box>
          )}
          {this.props.button && this.props.button}
        </Box>
      );
    }
  
    if (this.props.type === "card") {
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

          {this.props.plaid && (
            <Box mb={this.props.button && 2}>
              <hr/>
              <Box>
                  <PlaidLinkButton
                    buttonProps={{
                      className:
                        "btn btn-large main-btn link-button"
                    }}
                    plaidLinkProps={{
                      token: link.link_token,
                      clientName: process.env.REACT_APP_CLIENT,
                      key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
                      env: process.env.REACT_APP_ENVIRONMENT,
                      product: ["transactions"],
                      onSuccess: this.handleOnSuccess
                    }}
                    onScriptLoad={() => this.setState({ loaded: true })}
                  >
                    Link Account
                  </PlaidLinkButton>
              </Box>  
            </Box>            
          )}

          {this.props.button && this.props.button}
        </Box>
      );
    }
  
    return null;
  }

}

PremiumApp.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2
};

PremiumApp.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,

  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { addAccount, getTransactions}
)(PremiumApp);
