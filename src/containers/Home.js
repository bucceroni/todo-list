import React from "react";
import PropTypes from "prop-types";
// REACT ROUTER
import { Link } from "react-router-dom";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { Grid, Typography } from "@material-ui/core";
//COMPONENTS
import Header from "../components/Header";

const styles = {
  paper: {
    display: "flex",
    alignItems: "center"
  },
  paperTypography: {
    marginLeft: "10px"
  },
  paperInputBase: {
    flex: 1,
    marginLeft: "3px",
    fontSize: "14px",
    lineHeigth: "21px"
  },
  paperIconButton: {
    padding: 10
  },
  spacing: {
    margin: "15px 0"
  }
};
class Home extends React.Component {
  state = {
    user: ""
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    return (
      <div>
        <Header />
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid className={classes.spacing} item>
            <Typography variant="title" align="center">
              Don't login, just use a URL or search the user
            </Typography>
          </Grid>
          <Grid className={classes.spacing} item>
            <Paper className={classes.paper} elevation={1}>
              <Typography className={classes.paperTypography}>
                https://todo-list-leo.herokuapp.com/
              </Typography>

              <InputBase
                className={classes.paperInputBase}
                placeholder="user"
                value={user}
                onChange={this.handleChange("user")}
              />
              <Link to={`/${user}`}>
                <IconButton
                  className={classes.paperIconButton}
                  aria-label="Send"
                >
                  <SendIcon />
                </IconButton>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
