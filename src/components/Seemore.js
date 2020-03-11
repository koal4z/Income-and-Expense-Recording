import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import axios from "axios";
const id = JSON.parse(localStorage.getItem("id"));

let noRepeatDate = [];

export default function Seemore() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `http://localhost:5000/transactions?user=${id}`;
    axios
      .get(url)
      .then(result => setData(result.data))
      .catch(err => console.log(err.message));
  }, []);

  const clearDuplicate = arr => {
    const clearDate = d => {
      return d
        .substring(0, 10)
        .replace(/-/g, "/")
        .split("/")
        .reverse()
        .join("/");
    };
    const allDate = arr.map((item, idx) => clearDate(item.date));

    noRepeatDate = [];
    noRepeatDate.push(allDate[0]);
    for (let i = 1; i < allDate.length; i++) {
      if (noRepeatDate.indexOf(allDate[i]) === -1) {
        noRepeatDate.push(allDate[i]);
      }
    }
    return noRepeatDate.map((item, idx) => {
      return <Detail key={idx} data={data} date={noRepeatDate[idx]} />;
    });
  };

  return (
    <div
      style={{
        margin: "5% 0 0 0",
        width: "100%"
      }}
    >
      <hr style={{ backgroundColor: "#EB588C", height: "2px" }} />
      {data === null ? null : clearDuplicate(data)}
    </div>
  );
}
