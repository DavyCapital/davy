import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/Assessment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BeenhereIcon from '@material-ui/icons/Beenhere';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
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
    width: '300'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'left'
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
});

function EmptyState(props) {
  const { classes } = props;
  let imageWidth;
  let imageHeight;
  let variant;

  switch (props.size) {
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

  if (props.type === "page") {
    return (
      <Box
        style={{ transform: "translate(-50%, -50%)" }}
        position="absolute"
        top="50%"
        left="50%"
        textAlign="center"
      >
        {props.image && (
          <Box
            clone
            mb={props.title || props.description ? 2 : 0}
            width={`${imageWidth}%`}
            height={`${imageHeight}%`}
          >
            {props.image}
          </Box>
        )}

        {props.title && (
          <Box mb={!props.description && props.button ? 2 : 0}>
            <Typography variant={variant}>{props.title}</Typography>
          </Box>
        )}

        {props.description && (
          <Box mb={props.button && 2}>
            <Typography variant="body1">{props.description}</Typography>
          </Box>
        )}

        {props.search && (
          <Box mb={!props.description && props.button ? 2 : 0}>  
            <Paper className={classes.root} elevation={1}>
              <IconButton className={classes.iconButton} aria-label="Apps">
                <LocalParkingIcon style={{transform: "rotate(-180deg)", backgroundColor: '#1c54b2', color: 'white', border: '1px', borderRadius: '3px', borderColor: 'white'}} />
              </IconButton>
              <InputBase className={classes.input} placeholder="Search Keywords" />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} />
              <IconButton color="primary" className={classes.iconButton} aria-label="Assessment">
                <AssessmentIcon />
              </IconButton>
            </Paper>
            <br/>
          </Box>
        )}

        {props.button && props.button}

        {props.user && (
        <Box mb={!props.description && props.button ? 2 : 0}>  
          <br/>
          <br/>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                  My Apps
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Select to access application 
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="Item_1">
                  <AccountBalanceWalletIcon className={classes.appIcon} />
                </IconButton>
                <IconButton aria-label="Item_2">
                  <AccountBalanceIcon className={classes.appIcon} />
                </IconButton>
                <IconButton aria-label="Item_3">
                  <BeenhereIcon className={classes.appIcon} />
                </IconButton>
              </div>
            </div>
          </Card>     
        </Box>
        )}
      </Box>
    );
  }

  if (props.type === "card") {
    return (
      <Box padding={props.padding} textAlign="center">
        {props.image && (
          <Box
            clone
            mb={props.title || props.description ? 2 : 0}
            width={`${imageWidth}%`}
            height={`${imageHeight}%`}
          >
            {props.image}
          </Box>
        )}

        {props.title && (
          <Box mb={!props.description && props.button ? 2 : 0}>
            <Typography variant={variant}>{props.title}</Typography>
          </Box>
        )}
        {props.description && (
          <Box mb={props.button && 2}>
            <Typography variant="body1">{props.description}</Typography>
          </Box>
        )}

        {props.search && (
          <Box mb={!props.description && props.button ? 2 : 0}>  
            <Paper className={classes.root} elevation={1}>
              <IconButton className={classes.iconButton} aria-label="Apps">
                <LocalParkingIcon style={{transform: "rotate(-180deg)"}} />
              </IconButton>
              <InputBase className={classes.input} placeholder="Search Keywords" />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} />
              <IconButton color="primary" className={classes.iconButton} aria-label="Assessment">
                <AssessmentIcon />
              </IconButton>
            </Paper>
            <br/>
          </Box>
        )}

        {props.button && props.button}

        {props.user && (
        <Box mb={!props.description && props.button ? 2 : 0}>  
          <br/>
          <br/>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                  My Apps
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Select to access application 
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="Item_1">
                  <AccountBalanceWalletIcon className={classes.appIcon} />
                </IconButton>
                <IconButton aria-label="Item_2">
                  <AccountBalanceIcon className={classes.appIcon} />
                </IconButton>
                <IconButton aria-label="Item_3">
                  <BeenhereIcon className={classes.appIcon} />
                </IconButton>
              </div>
            </div>
          </Card>     
        </Box>
        )}

      </Box>
    );
  }

  return null;
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
