import React from "react";
//REACT ROUTER
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//CONTAINERS
import Home from "./containers/Home";
import UserTasks from "./containers/UserTasks";
import NotFound from "./containers/NotFound";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:user" component={UserTasks} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
