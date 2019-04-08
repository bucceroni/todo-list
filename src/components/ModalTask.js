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
import {
  Typography,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

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
    return (
      <div>
        <Dialog
          open={open}
          onClose={close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit task</DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Task"
                  multiline
                  rowsMax="5"
                  value={editTask.description}
                  onChange={this.handleChange("description")}
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
                  value={editTask.category}
                  onChange={this.handleChange("category")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Typography component="p">
              Date: {moment(editTask.createdAt).format("DD/MM/YYYY")}
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
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
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
)(withRouter(ModalTask));
