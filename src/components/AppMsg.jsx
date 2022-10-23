import React from "react"
import {INIT_MSG} from "../constants"

const AppMsg = ({msg}) => {
	return (
    <div
      className="d-print-none"
      style={{
        fontSize: "1rem",
        color: msg === INIT_MSG ? "white" : "black",
      }}
    >
      {msg}
    </div>
  );
}

export default AppMsg