import React from "react";
import PropTypes from "prop-types";

import { Modal, Button, Box, Typography } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function Hit(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const imageWidth = 40;
  const imageHeight = 40;

  return (
    <Box className="center">
        {/* {props.hit.image && (
          <Box
            clone
            mb={props.hit.fundManager || props.hit.eventDate ? 2 : 0}
            width={`${imageWidth}%`}
            height={`${imageHeight}%`}
          >
            {props.hit.image}
          </Box>
        )} */}
        {props.hit.name && (
          <Box mb={props.hit.name && 2} onClick={handleOpen}>
            <Typography variant="subtitle1" color="textPrimary">
              <b>{props.hit.name}</b>
            </Typography>
            <hr/>
            <Typography variant="body1" className="text-left" style={{marginLeft:"9%"}} color="textPrimary">
              <b>Type:</b> {props.hit.type}<br/>
              <b>Cost:</b> $ {props.hit.cost}/share<br/>
              <b>IRR:</b> {props.hit.expectedIRR}<br/>                
            </Typography>
            <hr/>
            <Typography variant="body2" color="textPrimary">
              {props.hit.fundManager}<br/>
            </Typography>
          </Box>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="subtitle1" color="textPrimary">
              <b>{props.hit.name}</b>
            </Typography>
            <hr/>
            <Typography variant="body1" className="text-left" style={{marginLeft:"9%"}} color="textPrimary">
              <b>Type:</b> {props.hit.type}<br/>
              <b>Cost:</b> $ {props.hit.cost}/share<br/>
              <b>IRR:</b> {props.hit.expectedIRR}<br/>                
            </Typography>
            <hr/>
            <Typography variant="body2" color="textPrimary">
              {props.hit.fundManager}<br/>
            </Typography>
          </div>
        </Modal>
    </Box> 
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};


function SearchPage(props) {
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
            mb={ props.button ? 2 : 0}
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
            <div className="center-panel">
              <InstantSearch indexName="digital_assets" searchClient={searchClient}>
                <SearchBox  />
                <Hits hitComponent={Hit} />
                <Pagination />
              </InstantSearch>
            </div>
            <Button component={Link} to="/" style={{margin: "3%", width: "66%"}} variant="outlined" size="large" color="primary">Go Back</Button>        
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
            <Typography variant={variant}>
              <InstantSearch indexName="digital_assets" searchClient={searchClient}>
                  <SearchBox  />
                  <Hits hitComponent={Hit} />
                  <Pagination />
              </InstantSearch>
            </Typography>            
          </Box>
        )}
        <Box mb={props.button && 2}>
          <br/>
          <Button component={Link} to="/" style={{margin: "3%", width: "66%"}} variant="outlined" size="large" color="primary">Go Back</Button>
        </Box>
        {props.button && props.button}
      </Box>
    );
  }

  return null;
}

SearchPage.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2,
};

SearchPage.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  search: PropTypes.bool,
  button: PropTypes.element,
};

export default SearchPage;
