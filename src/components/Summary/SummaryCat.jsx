import React from "react";
import { nanoid } from "nanoid";
import SummarySide from "./SummarySide";
import SummaryCalculate from "./SummaryCalculate";
import SummaryEmptyLine from "./SummaryEmptyLine";

const SummaryCat = ({ cat, section }) => {
  const rowsHeight = cat.length + 1;

  return (
    <>
      <SummarySide section={section} rowsHeight={rowsHeight} />
      {cat.map((data) => (
        <SummaryCalculate key={nanoid()} data={data} />
      ))}
      <SummaryEmptyLine />
    </>
  );
};

export default SummaryCat;
