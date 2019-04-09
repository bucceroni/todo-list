import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
// REACT ROUTER
import { withRouter } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import { Typography, TextField, Grid, Fab, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
// COMPONENTS
import Header from "../components/Header";
import Cards from "../components/Cards";
import ModalTask from "../components/ModalTask";
import TextFieldDate from "../components/TextFieldDate";

const styles = {
  paper: {
    display: "flex",
    alignItems: "center"
  },
  textField: {
    marginTop: 10
  },
  spacing: {
    margin: "15px 0"
  },
  divider: {
    margin: "45px 0px 15px 0px"
  }
};

class UserTasks extends React.Component {
  state = {
    newTask: "",
    newCategory: "",
    newDate: new Date(),
    openModalTask: false,
    editTask: null
  };

  componentDidMount() {
    const { actions, match } = this.props;
    actions.getTasksUser(match.params.user);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChangeDate = date => {
    this.setState({ newDate: date });
  };

  handleCreateTask = () => {
    const { actions, match } = this.props;
    const { newTask, newCategory, newDate } = this.state;
    const todo = {
      user: match.params.user,
      category: newCategory,
      description: newTask,
      createdAt: newDate
    };
    actions.createTask(todo);
    this.setState({
      newTask: "",
      newCategory: "",
      newDate: new Date()
    });
  };

  handleShowModalTask = task => {
    this.setState({
      openModalTask: true,
      editTask: task
    });
  };

  handleCloseModalTask = () => {
    this.setState({ openModalTask: false, editTask: null });
  };

  render() {
    const { classes, actions, tasks } = this.props;
    const {
      newTask,
      newCategory,
      newDate,
      openModalTask,
      editTask
    } = this.state;

    return (
      <div>
        <Header />
        <Grid container direction="column" alignItems="center">
          <Grid className={classes.spacing} item>
            <Typography variant="title" align="center">
              {tasks.length === 0
                ? "No tasks have been created"
                : `Total: ${tasks.length} tasks`}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
        >
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="New task"
              multiline
              rowsMax="5"
              value={newTask}
              onChange={this.handleChange("newTask")}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Category"
              multiline
              rowsMax="5"
              value={newCategory}
              onChange={this.handleChange("newCategory")}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid className={classes.textField} item>
            <TextFieldDate date={newDate} onChange={this.handleChangeDate} />
          </Grid>
          <Grid className={classes.textField} item>
            <Fab
              color="primary"
              aria-label="Add"
              disabled={newTask === "" || newCategory === ""}
              onClick={this.handleCreateTask}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        <Grid container spacing={24}>
          {tasks &&
            tasks.map((task, index) => {
              return (
                <Grid item xs key={index}>
                  <Cards
                    task={task}
                    index={index}
                    actions={actions}
                    showModalTask={this.handleShowModalTask}
                  />
                </Grid>
              );
            })}
        </Grid>
        {openModalTask && (
          <ModalTask
            open={openModalTask}
            close={this.handleCloseModalTask}
            task={editTask}
          />
        )}
      </div>
    );
  }
}

UserTasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    tasks: state.todoReducer.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...actions
      },
      dispatch
    )
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(UserTasks));
