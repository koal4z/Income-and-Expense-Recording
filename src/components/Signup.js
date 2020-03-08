import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Signup() {
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
          />

          <TextField
            style={{ margin: "2% 0" }}
            fullWidth
            id="outlined"
            label="Password"
            variant="outlined"
            size="small"
          />

          <Row style={{ padding: "0", margin: "1.5% 0" }}>
            <Col
              style={{
                width: "100%",
                padding: "0 0 0 1.2%"
              }}
            >
              <div style={{ width: "50%", margin: "0 auto" }}>
                <Button fullWidth variant="contained" color="secondary">
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
