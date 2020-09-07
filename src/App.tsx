import React from "react";
import "./App.scss";
import { Landing } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/landing" component={Landing} />
          <Route path="/" component={Landing} /> {/* 404 */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
