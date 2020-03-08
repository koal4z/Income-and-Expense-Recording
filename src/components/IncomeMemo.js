import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Income(props) {
  const data = props.data;

  return (
    <div style={{ marginTop: "2%" }}>
      <div
        style={{
          marginBottom: "2%",
          padding: "2% 1%",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
        }}
      >
        <Row style={{ margin: "0" }}>
          <Col xs={6}>
            <p style={{ margin: "0 0 2% 1.5%" }}>remark</p>
            <hr style={{ margin: "2% 0" }} />
            <ul style={{ listStyleType: "none", marginLeft: "2%" }}>
              {data.map((item, idx) => {
                return (
                  <li key={idx}>
                    {item.remark === "" ? "No Remark" : item.remark}
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col xs={6}>
            <p style={{ margin: "0 0 2% 1.5%" }}>Amount</p>
            <hr style={{ margin: "2% 0" }} />
            <ul style={{ listStyleType: "none", marginLeft: "2%" }}>
              {data.map((item, idx) => {
                return (
                  <li key={idx}>
                    {item.amount === "" ? "No Remark" : item.amount}
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}
