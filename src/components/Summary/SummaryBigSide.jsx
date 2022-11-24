import React from "react";

const SummaryBigSide = () => {
  return (
    <tr>
      <td
        className="text-uppercase bg-white text-black text-nowrap"
        rowSpan="0"
        style={{ width: "3%", border: "1px solid white", paddingTop: "5rem" }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "3rem",
            fontWeight: "900",
            float: "right",
            textDecoration: "underline",
            letterSpacing: "5px",
          }}
        >
          FRAIS D'INSCRIPTION
        </div>
      </td>
      <td
        rowSpan="0"
        style={{
          with: "2%",
          fontSize: "1px",
          border: "1px solid white",
          borderRight: "1px solid white",
        }}
      >
        &nbsp;
      </td>
    </tr>
  );
};

export default SummaryBigSide;
