import React from "react";
import "./App.scss";
import { Landing, AllListings } from "./pages";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/landing" />
          </Route>
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/allListings" component={AllListings} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
