import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
// REACT ROUTER
import { withRouter } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
// MOMENT
// import moment from "moment";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";
// COMPONENTS
import Header from "../components/Header";
import Cards from "../components/Cards";
import ModalTask from "../components/ModalTask";

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

class UserTodos extends React.Component {
  state = {
    newTask: "",
    newCategory: "",
    // newDate: new Date(),
    // completed: "",
    openModalTask: false,
    editTask: null
  };

  componentDidMount() {
    const { actions, match } = this.props;
    actions.getUserTodos(match.params.user);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleCreateTodo = () => {
    const { actions, match } = this.props;
    const { newTask, newCategory } = this.state;
    const todo = {
      user: match.params.user,
      category: newCategory,
      description: newTask
    };
    actions.createTodo(todo);
    this.setState({
      newTask: "",
      newCategory: ""
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
    const { classes, actions, todos } = this.props;
    const { newTask, newCategory, openModalTask, editTask } = this.state;

    return (
      <div>
        <Header />

        <Typography
          style={{ marginTop: "50px" }}
          variant="title"
          gutterBottom
          align="center"
        >
          {todos.length === 0
            ? "Não existe tarefas cadastradas no momento"
            : `Total de tarefas: ${todos.length}`}
        </Typography>

        <Paper
          style={{ marginTop: "50px" }}
          className={classes.root}
          elevation={3}
          align="center"
        >
          <InputBase
            value={newCategory}
            onChange={this.handleChange("newCategory")}
            className={classes.input}
            placeholder="Categoria"
          />
          <InputBase
            value={newTask}
            onChange={this.handleChange("newTask")}
            className={classes.input}
            placeholder="Nova tarefa"
          />

          <IconButton
            disabled={newTask === "" || newCategory === ""}
            onClick={this.handleCreateTodo}
            className={classes.iconButton}
            aria-label="Add"
          >
            <AddIcon />
          </IconButton>
        </Paper>

        <Grid container spacing={24}>
          {todos &&
            todos.map((task, index) => {
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

UserTodos.propTypes = {
  classes: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    todos: state.todoReducer.todos
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
)(withRouter(UserTodos));
