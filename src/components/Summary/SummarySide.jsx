import React from "react";

const SummarySide = ({ data }) => {
  const bigSide = data.split("|")[0] === "bigSide";
  const section = data.split("|")[1];
  const rowsHeight = data.split("|")[2];

  return (
    <tr>
      <td
        className={`text-uppercase text-nowrap ${
          bigSide ? "bg-white text-black" : "bg-dark text-white"
        }`}
        rowSpan={rowsHeight}
        style={{
          width: "3%",
          border: bigSide ? "1px solid white" : null,
          paddingTop: bigSide ? "5rem" : null,
        }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: bigSide ? "3rem" : "1.5rem",
            fontWeight: "900",
            float: "right",
            textDecoration: bigSide ? "underline" : null,
            letterSpacing: bigSide ? "5px" : null,
          }}
        >
          {section}
        </div>
      </td>
      <td
        rowSpan={rowsHeight}
        style={{
          with: "2%",
          fontSize: "1px",
          border: "1px solid white",
          borderRight: bigSide ? "1px solid white" : "1px solid black",
        }}
      >
        &nbsp;
      </td>
    </tr>
  );
};

export default SummarySide;
