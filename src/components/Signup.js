import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users", {
        username: username,
        password: password
      })
      .then(result => {
        console.log(result);
        if (result.data === "create complete") {
          history.push("/");
        } else {
          alert(result.data);
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
            Sign Up
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
            value={username}
          />

          <TextField
            style={{ margin: "2% 0" }}
            fullWidth
            id="outlined"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />

          <Row style={{ padding: "0", margin: "1.5% 0" }}>
            <Col
              style={{
                width: "100%",
                padding: "0 0 0 1.2%"
              }}
            >
              <div style={{ width: "50%", margin: "0 auto" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleSignup}
                >
                  Create Account
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}
