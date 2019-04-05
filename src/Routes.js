import React from "react";
//REACT ROUTER
import { Route, Switch } from "react-router-dom";

//CONTAINERS
import Home from "./containers/Home";
import UserTodos from "./containers/UserTodos";
import NotFound from "./containers/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:user" component={UserTodos} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;