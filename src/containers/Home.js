import React from "react";
import PropTypes from "prop-types";
// //REACT ROUTER
import { Link } from "react-router-dom";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@material-ui/core";
//COMPONENTS
import Header from "../components/Header";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
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

        <Typography
          style={{ marginTop: "50px" }}
          variant="title"
          gutterBottom
          align="center"
        >
          Não precisa de login, use a URL ou digite o usuário
        </Typography>

        <Paper
          style={{ marginTop: "50px" }}
          className={classes.root}
          elevation={3}
          align="center"
        >
          <InputBase
            value={user}
            onChange={this.handleChange("user")}
            className={classes.input}
            placeholder="Digite o usuário"
          />
          <Link to={`/${user}`}>
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Link>
        </Paper>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
