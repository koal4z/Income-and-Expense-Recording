import React, { useState } from "react";
import IncomeMemo from "./IncomeMemo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export default function Detail(props) {
  const data = props.data;
  const date = props.date;

  const selectData = data.map(item => {
    if (item.date === date) {
      return item;
    }
  });

  const arrangeDate = date
    .substring(0, 9)
    .replace(/-/g, "/")
    .split("/")
    .reverse()
    .join("/");
  const [showDetail, setShowDetail] = useState(false);
  const handleDetail = () => {
    showDetail ? setShowDetail(false) : setShowDetail(true);
  };

  return (
    <>
      <div
        style={{
          margin: "2% 0 0 0",
          padding: "1% 0",
          backgroundColor: "#EB588C",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          borderRadius: "5px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <h3 style={{ margin: "0 3%", color: "#FFFFFF", lineHeight: "45px" }}>
            day : {arrangeDate}
          </h3>
          <div style={{ marginRight: "2%" }}>
            <IconButton onClick={handleDetail} aria-label="down">
              <ArrowDropDownIcon size="large" />
            </IconButton>
          </div>
        </div>
      </div>
      {showDetail ? (
        <Row style={{ margin: "0" }}>
          <Col sm={12} md={6} style={{ padding: "0" }}>
            <div style={{ margin: "2% 1%" }}>
              <h3
                style={{
                  padding: "1% 0",
                  textAlign: "center",
                  textTransform: "uppercase",
                  borderBottom: "3px solid #f50057",
                  color: "#f50057"
                }}
              >
                income
              </h3>
              <IncomeMemo
                data={selectData.filter(item => item.type === "income")}
              />
            </div>
          </Col>
          <Col sm={12} md={6} style={{ padding: "0" }}>
            <div style={{ margin: "2% 1%" }}>
              <h3
                style={{
                  padding: "1% 0",
                  textAlign: "center",
                  textTransform: "uppercase",
                  borderBottom: "3px solid #f50057",
                  color: "#f50057"
                }}
              >
                expense
              </h3>
              <IncomeMemo
                data={selectData.filter(item => item.type === "expense")}
              />
              
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );
}
