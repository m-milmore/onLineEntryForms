import React from "react";

const SummarySide = ({ section, rowsHeight }) => {
  return (
    <tr>
      <td
        className="text-uppercase bg-dark text-white text-nowrap"
        rowSpan={rowsHeight}
        style={{ width: "3%" }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "1.5rem",
            fontWeight: "900",
            float: "right",
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
          borderRight: "1px solid black",
        }}
      >
        &nbsp;
      </td>
    </tr>
  );
};

export default SummarySide;