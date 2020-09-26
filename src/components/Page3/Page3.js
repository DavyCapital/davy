import React from "react";
import PropTypes from "prop-types";

import { Button, Box, Typography } from "@material-ui/core";

import { Link } from "react-router-dom";

function Page3(props) {
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

          {props.searchfilter && (
            <Box mb={props.button && 2}>
              <Typography variant={variant}>{props.searchfilter}</Typography>
              <Typography variant="body1"><b>{process.env.REACT_APP_PAGE_ITEM_3}</b> {process.env.REACT_APP_PAGE_ITEM_3_DESC}</Typography>
              <Typography variant="body1">{process.env.REACT_APP_SEARCH_MESSAGE}</Typography>
              <hr/>
              <Box>
                  <Button component={Link} to="/search" style={{margin: "3%", height: "90px", width: "44%"}} size="large" variant="contained">
                    {process.env.REACT_APP_PAGE_ITEM_3_SEARCH_TYPE_PRIMARY}<br/>{process.env.REACT_APP_PAGE_ITEM_3_TYPE}
                  </Button>
                  <Button component={Link} to="/search" style={{margin: "3%", height: "90px", width: "44%"}} size="large" variant="contained">
                    {process.env.REACT_APP_PAGE_ITEM_3_SEARCH_TYPE_SECONDARY}<br/>{process.env.REACT_APP_PAGE_ITEM_3_TYPE}
                  </Button>
              </Box>
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
              <Button component={Link} to="/learn" variant="text">
                LEARN MORE
              </Button>
            </Box>
          )}

          {props.searchfilter && (
            <Box mb={props.button && 2}>
              <Typography variant={variant}>{props.searchfilter}</Typography>
              <Typography variant="body1"><b>{process.env.REACT_APP_PAGE_ITEM_3}</b> {process.env.REACT_APP_PAGE_ITEM_3_DESC}</Typography>
              <Typography variant="body1">{process.env.REACT_APP_SEARCH_MESSAGE}</Typography>
              <hr/>
              <Box>
                  <Button component={Link} to="/search" style={{margin: "3%", height: "90px", width: "44%"}} size="large" variant="contained">
                    {process.env.REACT_APP_PAGE_ITEM_3_SEARCH_TYPE_PRIMARY}<br/>{process.env.REACT_APP_PAGE_ITEM_3_TYPE}
                  </Button>
                  <Button component={Link} to="/search" style={{margin: "3%", height: "90px", width: "44%"}} size="large" variant="contained">
                    {process.env.REACT_APP_PAGE_ITEM_3_SEARCH_TYPE_SECONDARY}<br/>{process.env.REACT_APP_PAGE_ITEM_3_TYPE}
                  </Button>
              </Box>
            </Box>
          )}

          {props.button && props.button}
        </Box>
      );
    }

    return null;
}

Page3.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2,
};

Page3.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  searchfilter: PropTypes.string,
  button: PropTypes.element,
};

export default Page3;