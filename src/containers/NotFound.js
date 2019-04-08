import React from "react";
import PropTypes from "prop-types";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
//COMPONENTS
import Header from "../components/Header";

const styles = {
  spacing: {
    margin: "15px 0"
  }
};
class NotFound extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid className={classes.spacing} item>
            <Typography variant="title" align="center">
              Oops! Page not found
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
