import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/Assessment';

const styles = {
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
};

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
              <IconButton className={classes.iconButton} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <InputBase className={classes.input} placeholder="Search Keywords" />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} />
              <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                <AssessmentIcon />
              </IconButton>
            </Paper>
            <br/>
          </Box>
        )}

        {props.button && props.button}
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
              <IconButton className={classes.iconButton} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <InputBase className={classes.input} placeholder="Search Digital Investment Offerings" />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} />
              <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                <AssessmentIcon />
              </IconButton>
            </Paper>
            <br/>
          </Box>
        )}

        {props.button && props.button}
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

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  search: PropTypes.bool,
  button: PropTypes.element,
};

export default withStyles(styles)(EmptyState);
