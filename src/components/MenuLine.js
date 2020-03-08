import React from "react";
import Button from "@material-ui/core/Button";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 

export default function MenuLine() {
  return (
    <>
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <Link style={{ textDecoration: "none" }} to="/login">
          <Button color="secondary">
            <h3>Login</h3>
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/signup">
          <Button color="secondary">
            <h3>Sign Up</h3>
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button color="secondary">
            <h3>Daily Broad</h3>
          </Button>
        </Link>
      </div>
    </>
  );
}
