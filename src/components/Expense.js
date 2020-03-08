import React, { useState } from "react";
import TextEdit from "./TextEdit";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Expense(props) {
  const [edit, setEdit] = useState(false);
  const [changeData, setChangeData] = useState(props.data);
  const [keepdata, setKeepdata] = useState([]);
  const handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    setChangeData({ ...changeData, [name]: value });
  };
  console.log(keepdata);

  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const handleDone = () => {
    setEdit(false);
    if (changeData.remark !== "" && changeData.amount !== "") {
      setKeepdata([...keepdata, changeData]);
    }
  };

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
          <Col xs={9} style={{ padding: "0 0 0 3%" }}>
            <div style={{ display: "flex" }}>
              <p style={{ marginBottom: "2%" }}>
                Remark : {!edit ? changeData.remark : null}
              </p>
              {edit ? (
                <TextEdit
                  id={props.idExp}
                  data={changeData}
                  change={handleChange}
                  name="remark"
                />
              ) : null}
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ marginBottom: "2%" }}>
                Amount : {!edit ? changeData.amount : null}
              </p>
              {edit ? (
                <TextEdit
                  id={props.idExp}
                  data={changeData}
                  change={handleChange}
                  name="amount"
                />
              ) : null}
            </div>
          </Col>
          <Col
            style={{
              padding: "0"
            }}
          >
            <div
              style={{
                display: "flex",

                justifyContent: "flex-end",
                alignContent: "flex-end"
              }}
            >
              {!edit ? (
                <IconButton
                  onClick={handleEdit}
                  size="small"
                  aria-label="edit"
                  color="secondary"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleDone}
                  size="small"
                  aria-label="done"
                  color="secondary"
                >
                  <DoneIcon fontSize="small" />
                </IconButton>
              )}
              {props.idExp + 1 === props.addExpense.length && edit ? (
                <IconButton
                  onClick={() => props.delete(props.idExp)}
                  size="small"
                  aria-label="delete"
                  color="secondary"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
