import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const handleLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        username: username,
        password: password
      })
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          if (result.data === "login") {
            localStorage.setItem("user", JSON.stringify(username));
            alert("login");
            history.push("/");
          } else {
            alert(result.data);
          }
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh"
      }}
    >
      <form style={{ width: "100%" }} noValidate autoComplete="off">
        <div style={{ width: "50%", margin: "0 auto" }}>
          <h1
            style={{
              textAlign: "center",
              letterSpacing: "1.5px",
              color: "#f50057"
            }}
          >
            login
          </h1>
          <hr style={{ borderColor: "#f50057", borderWidth: "2px" }} />
          <TextField
            style={{ margin: "2% 0" }}
            fullWidth
            id="outlined"
            label="Username"
            variant="outlined"
            size="small"
            onChange={e => setUserName(e.target.value)}
            name="username"
            value={username}
          />

          <TextField
            style={{ margin: "2% 0" }}
            fullWidth
            type="password"
            id="outlined"
            label="Password"
            variant="outlined"
            size="small"
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
          />
          <Row style={{ padding: "0", margin: "1.5% 0" }}>
            <Col style={{ width: "100%", padding: "0 1.2% 0 0" }}>
              <Link style={{ textDecoration: "none" }} to="/signup">
                <Button
                  fullWidth
                  style={{ marginLeft: "auto" }}
                  variant="outlined"
                  color="secondary"
                  href="#outlined-buttons"
                >
                  Sign Up
                </Button>
              </Link>
            </Col>
            <Col
              style={{
                width: "100%",
                padding: "0 0 0 1.2%"
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}
