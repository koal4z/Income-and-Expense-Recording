import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import MenuHam from "./MenuHam";
import MenuLine from "./MenuLine";

function Top() {
  const matches = useMediaQuery("(min-width:850px)");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 3%",
        height: "100%"
      }}
    >
      <div style={{ display: "flex", color: "#f50057" }}>
        <h1>
          <span style={{ marginRight: "15px" }}>
            <FontAwesomeIcon icon={faBookOpen} />
          </span>
          My Recording
        </h1>
      </div>

      <div>{matches ? <MenuLine /> : <MenuHam />}</div>
    </div>
  );
}

export default Top;
