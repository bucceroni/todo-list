import React, { Component } from "react";
//REACT ROUTER
import { BrowserRouter as Router } from "react-router-dom";
//ROUTES
import Routes from "./Routes";
class App extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

export default App;
