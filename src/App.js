import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import Top from "./components/Top";
import Main from "./components/Main";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <Container
      style={{
        padding: "0",
        margin: "20px auto",
        width: matches ? "80%" : "96%"
      }}
    >
      <Router>
        <header
          style={{
            marginBottom: "15px",
            backgroundColor: "#ffb2a7",
            height: "10vh",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "5px 5px 0 0"
          }}
        >
          <Top />
        </header>
        <main
          style={{
            backgroundColor: "#f6eedf",
            height: "auto",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            borderRadius: "0 0 5px 5px"
          }}
        >
          <Main />
        </main>
      </Router>
    </Container>
  );
}

export default App;
