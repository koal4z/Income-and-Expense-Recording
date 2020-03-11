import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Income from "./Income";
import Expense from "./Expense";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import axios from "axios";

const momentDate = moment()
  .format("L")
  .split(/\//);
const date = [momentDate[1], momentDate[0], momentDate[2]].join("/");
export default function ToDay() {
  const [addExpense, setAddExpense] = useState([]);
  const [addIncome, setAddIncome] = useState([]);
  const [data, setData] = useState({ remark: "", amount: "" });

  const user = JSON.parse(localStorage.getItem("user"));
  const [e, setE] = useState([]);
  const [i, setI] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/switchUser/?user=${user}`).then(result => {
      const id = result.data[0]._id;
      localStorage.setItem("id", JSON.stringify(id));
      axios
        .get(`http://localhost:5000/transactions/?user=${id}`)
        .then(result => {
          setE(() => result.data.filter(item => item.type === "expense"));
          setI(() => result.data.filter(item => item.type === "income"));
        })
        .catch(err => console.log(err));
    });
  }, []);
  const id = JSON.parse(localStorage.getItem("id"));

  const handleAddExpense = () => {
    setAddExpense([...addExpense, data]);
    axios
      .post("http://localhost:5000/transactions", {
        user: id,
        amount: "",
        type: "expense",
        remark: ""
      })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };
  const handleAddIncome = () => {
    setAddIncome([...addIncome, data]);
    axios
      .post("http://localhost:5000/transactions", {
        user: id,
        amount: "",
        type: "income",
        remark: ""
      })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };
  const onDeleteExpense = id => {
    setAddExpense(addExpense.filter((item, idx) => id !== idx));
    const idDelete = e[e.length - 1]._id;
    axios
      .delete(`http://localhost:5000/transactions/${idDelete}`)
      .then(r => console.log(r))
      .catch(err => console.log(err));
  };

  const onDeleteIncome = id => {
    setAddIncome(addIncome.filter((item, idx) => id !== idx));
    const idDelete = i[i.length - 1]._id;
    axios
      .delete(`http://localhost:5000/transactions/${idDelete}`)
      .then(r => console.log(r))
      .catch(err => console.log(err));
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
                i={i}
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
                e={e}
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
