import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Seemore from "./Seemore";
import ToDay from "./ToDay";
export default function Daily() {
  const [tab, setTab] = useState({ tab1: true, tab2: false });
  const handleTab = e => {
    const name = e.target.id;
    if (name === "tab1") {
      setTab({ tab1: true, tab2: false });
    } else {
      setTab({ tab1: false, tab2: true });
    }
  };
  return (
    <div style={{ height: "100%", margin: "0 15px 0 15px", padding: "15px 0" }}>
      <Row style={{ margin: "0" }}>
        <Col
          sm={4}
          style={{
            padding: "0",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <h3
            style={{
              padding: "2px 5px",
              borderBottom: tab.tab1 ? "2px solid #f50057" : null,
              color: tab.tab1 ? "#f50057" : "#aaaaaa",
              cursor: "pointer"
            }}
            id="tab1"
            onClick={handleTab}
          >
            Today
          </h3>
          <h3
            style={{
              padding: "2px 5px",
              borderBottom: tab.tab2 ? "2px solid #f50057" : null,
              color: tab.tab2 ? "#f50057" : "#aaaaaa",
              cursor: "pointer"
            }}
            id="tab2"
            onClick={handleTab}
          >
            Seemore
          </h3>
        </Col>
        <Col
          sm={8}
          style={{
            padding: "0 5% 0 0"
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%"
            }}
          >
            username : Kongpob
          </h3>
        </Col>
      </Row>
      {tab.tab1 ? <ToDay /> : <Seemore />}
    </div>
  );
}
