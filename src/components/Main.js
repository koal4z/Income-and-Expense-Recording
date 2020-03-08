import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Daily from "./Daily";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
function Main() {
  return (
    <section style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/">
          <Daily />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </section>
  );
}

export default Main;
