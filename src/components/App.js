import React from "react";
import "../App.css";
import Schedule from "./Schedule";
import LandingPage from "./LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/schedule/:shift" component={Schedule} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
