import React from "react";
import PropTypes from "prop-types";
// REACT ROUTER
import { withRouter } from "react-router-dom";
// MOMENT
import moment from "moment";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActions } from "@material-ui/core";

const styles = {
  card: {
    minWidth: 300,
    maxHeight: 600,
    margin: 5
  },
  link: {
    textDecoration: "none"
  },
  media: {
    height: 140
  },
  completed: {
    textDecoration: "line-through"
  }
};

const Cards = props => {
  return (
    <Card className={props.classes.card}>
      <CardContent
        className={props.task.completed ? props.classes.completed : null}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {props.task.description}
        </Typography>
        <Typography component="p">Category: {props.task.category}</Typography>
        <Typography component="p">
          Date: {moment(props.task.createdAt).format("DD/MM/YYYY")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={props.task.completed}
          onClick={() => props.showModalTask(props.task)}
          color="primary"
        >
          Edit
        </Button>
        <Button onClick={() => props.actions.completeTask(props.task)}>
          {props.task.completed ? "Undo" : "Done"}
        </Button>
        <Button
          onClick={() => props.actions.deleteTask(props.task._id)}
          color="secondary"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  task: PropTypes.object
};

export default withRouter(withStyles(styles)(Cards));
