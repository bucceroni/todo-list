import React from "react";
import PropTypes from "prop-types";
//REACT ROUTER
import { withRouter } from "react-router-dom";
//MOMENT
import moment from "moment";
//MATERIAL UI
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
        className={props.item.completed ? props.classes.completed : null}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {props.item.description}
        </Typography>
        <Typography component="p">Category: {props.item.category}</Typography>
        <Typography component="p">
          Date: {moment(props.item.createdAt).format("LL")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => props.actions.updateTodo(props.item)}
          color="primary"
        >
          Editar
        </Button>
        <Button onClick={() => props.actions.completeTask(props.item)}>
          {props.item.completed ? "Desfazer" : "Concluir"}
        </Button>
        <Button
          onClick={() => props.actions.deleteTodo(props.item._id)}
          color="secondary"
        >
          Deletar
        </Button>
      </CardActions>
    </Card>
  );
};

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object
};

export default withRouter(withStyles(styles)(Cards));
