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
import moment from "moment";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography, TextField } from "@material-ui/core";

const styles = {};

class ModalTask extends React.Component {
  state = {
    editTask: {
      _id: "",
      description: "",
      category: "",
      completed: "",
      createdAt: ""
    }
  };

  componentDidMount() {
    const { task } = this.props;
    this.setState({
      editTask: {
        _id: task._id,
        description: task.description,
        category: task.category,
        completed: task.completed,
        createdAt: task.createdAt
      }
    });
  }

  handleChange = prop => event => {
    const { editTask } = this.state;
    this.setState({
      editTask: {
        ...editTask,
        [prop]: event.target.value
      }
    });
  };

  handleUpdateTask = () => {
    const { actions, close } = this.props;
    const { editTask } = this.state;
    actions.updateTask(editTask);
    close();
  };

  render() {
    const { open, close } = this.props;
    const { editTask } = this.state;
    console.log(editTask);
    return (
      <div>
        <Dialog
          open={open}
          onClose={close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Editar tarefa</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-description"
              label="description"
              //   className={classes.textField}
              value={editTask.description}
              onChange={this.handleChange("description")}
              margin="normal"
            />
            <TextField
              id="standard-category"
              label="category"
              //   className={classes.textField}
              value={editTask.category}
              onChange={this.handleChange("category")}
              margin="normal"
            />

            <Typography component="p">
              Data: {moment(editTask.createdAt).format("DD/MM/YYYY")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleUpdateTask} color="primary">
              Salvar
            </Button>
            <Button onClick={close} color="secondary" autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ModalTask.propTypes = {
  open: PropTypes.bool,
  clsoe: PropTypes.func,
  task: PropTypes.object,
  classes: PropTypes.object.isRequired,
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
)(withRouter(ModalTask));
