import React from "react";
import PropTypes from "prop-types";
//REACT ROUTER
import { withRouter } from "react-router-dom";
//MATERIAL UI
import Grid from "@material-ui/core/Grid";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
//COMPONENTS
import Header from "../components/Header";
import Cards from "../components/Cards";

class UserTodos extends React.Component {
  componentDidMount() {
    const { actions, match } = this.props;
    actions.getUserTodos(match.params.user);
  }

  render() {
    const { todos } = this.props;
    return (
      <div>
        <Header />

        <Grid container spacing={24}>
          {todos &&
            todos.map((item, index) => {
              return (
                <Grid item xs key={index}>
                  <Cards item={item} index={index} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    );
  }
}

UserTodos.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserTodos));
