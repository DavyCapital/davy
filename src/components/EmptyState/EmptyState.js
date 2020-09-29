import React, { Component } from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'left',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  appIcon: {
    height: 38,
    width: 38,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class EmptyState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        anchorEl: null,
      },
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  
  render() {
  let imageWidth;
  let imageHeight;
  let variant;
  const { classes } = this.props;

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
            <br/>
          </Box>
        )}

        {this.props.search && (
          <Box mb={!this.props.description && this.props.button ? 2 : 0}>
            <Paper className={classes.root} elevation={1}>
              <IconButton className={classes.iconButton} aria-label="Apps">
                <LocalParkingIcon style={{transform: "rotate(-180deg)", backgroundColor: '#1c54b2', color: 'white', border: '1px', borderRadius: '3px', borderColor: 'white'}} />
              </IconButton>
              <Divider className={classes.divider} />
              <InputBase disabled className={classes.input} placeholder="Apps"/>
              <IconButton className={classes.iconButton} aria-label="Wallets">
                <AccountBalanceWalletIcon style={{color: '#b26500', border: '0px', borderRadius: '3px'}} /> 
              </IconButton>
              <Divider className={classes.divider} />
              <IconButton className={classes.iconButton} aria-label="Assessment">
                <AssessmentIcon style={{color: '#ff5722', border: '0px', borderRadius: '3px'}} />
              </IconButton>
            </Paper>
            <br/>
          </Box>
        )}

        {this.props.button && this.props.button}
      </Box>
    );
  }

  if (this.this.props.type === "card") {
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

        {this.props.search && (
          <Box mb={!this.props.description && this.props.button ? 2 : 0}>  
            <Paper className={classes.root} elevation={1}>
              <IconButton className={classes.iconButton} aria-label="Apps">
                <LocalParkingIcon style={{transform: "rotate(-180deg)"}} />
              </IconButton>
              <Divider className={classes.divider} />
              <InputBase disabled className={classes.input} placeholder="Apps"/>
              <IconButton className={classes.iconButton} aria-label="Wallets">
                <AccountBalanceWalletIcon style={{color: '#b26500', border: '0px', borderRadius: '3px'}} />
              </IconButton>
              <Divider className={classes.divider} />
              <IconButton className={classes.iconButton} aria-label="Assessment">
                <AssessmentIcon style={{color: '#ff5722', border: '0px', borderRadius: '3px'}}/>
              </IconButton>
            </Paper>
            <br/>
          </Box>
        )}

        {this.props.button && this.props.button}

      </Box>
    );
  }

  return null;
  }
}

EmptyState.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2,
};

EmptyState.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  user: PropTypes.object,
  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  search: PropTypes.bool,
  button: PropTypes.element,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EmptyState);
