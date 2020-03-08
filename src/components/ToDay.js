import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Income from "./Income";
import Expense from "./Expense";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
const date = moment().format("L");

export default function ToDay() {
  const [addExpense, setAddExpense] = useState([]);
  const [addIncome, setAddIncome] = useState([]);
  const [data, setData] = useState({ remark: "", amount: "" });

  const handleAddExpense = () => {
    setAddExpense([...addExpense, data]);
  };
  const handleAddIncome = () => {
    setAddIncome([...addIncome, data]);
  };
  const onDeleteExpense = id => {
    setAddExpense(addExpense.filter((item, idx) => id !== idx));
  };

  const onDeleteIncome = id => {
    setAddIncome(addIncome.filter((item, idx) => id !== idx));
  };

  return (
    <>
      <div
        style={{
          margin: "5% -1% 0 -1%",
          padding: "2% 0",
          backgroundColor: "#EB588C",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          borderRadius: "5px"
        }}
      >
        <h1 style={{ margin: "0 3%", color: "#FFFFFF" }}>day : {date}</h1>
      </div>
      <Row style={{ margin: "0" }}>
        <Col sm={12} md={6} style={{ padding: "0" }}>
          <div style={{ margin: "2% 1%" }}>
            <h3
              style={{
                padding: "3% 0",
                textAlign: "center",
                textTransform: "uppercase",
                borderBottom: "3px solid #f50057",
                color: "#f50057"
              }}
            >
              income
            </h3>

            {addIncome.map((item, idx) => (
              <Income
                key={idx}
                idExp={idx}
                delete={onDeleteIncome}
                data={data}
                setData={setData}
                addExpense={addIncome}
                setAddExpense={setAddIncome}
              />
            ))}
          </div>
          <div
            style={{
              width: "98%",

              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <IconButton
              size="small"
              aria-label="addIncome"
              color="secondary"
              onClick={handleAddIncome}
            >
              <AddIcon />
            </IconButton>
          </div>
        </Col>
        <Col sm={12} md={6} style={{ padding: "0" }}>
          <div style={{ margin: "2% 1%" }}>
            <h3
              style={{
                padding: "3% 0",
                textAlign: "center",
                textTransform: "uppercase",
                borderBottom: "3px solid #f50057",
                color: "#f50057"
              }}
            >
              expense
            </h3>
            {addExpense.map((item, idx) => (
              <Expense
                key={idx}
                idExp={idx}
                delete={onDeleteExpense}
                data={data}
                setData={setData}
                addExpense={addExpense}
                setAddExpense={setAddExpense}
              />
            ))}
            <div
              style={{
                width: "98%",

                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <IconButton
                size="small"
                aria-label="addExpense"
                color="secondary"
                onClick={handleAddExpense}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
