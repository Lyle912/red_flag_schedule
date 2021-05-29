import React from "react";
import "../App.css";
import Schedule from "./Schedule";
import LandingPage from "./LandingPage";
import Footer from "./Footer";
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
      <Route render={({ location }) =>["/"].includes(location.pathname) ? <Footer/> : null}/>
    </Router>
  );
}

export default App;
