import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import axios from "axios";

let noRepeatDate = [];
export default function Seemore() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url =
      "https://assignment-api.dev.witsawa.com/transactions?user=5c39f8e9d7f40f00a448a97e";
    axios
      .get(url)
      .then(result => setData(result.data))
      .catch(err => console.log(err.message));
  }, []);

  const clearDuplicate = arr => {
    const allDate = arr.map((item, idx) => item.date);
    noRepeatDate = []
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
