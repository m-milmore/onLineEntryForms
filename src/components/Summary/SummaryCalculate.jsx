import React, { useState, useEffect, useContext, useMemo } from "react";
import { FormsContext } from "../../App";
import { early } from "../../constants";
import Formatter from "../Utils/Formatter";

const SummaryCalculate = ({ data }) => {
  const { forms, setForms } = useContext(FormsContext);
  const dataObj = useMemo(
    () => ({
      mainLine: data.split("|")[0],
      earlyPriceStr: data.split("|")[1],
      regPriceStr: data.split("|")[2],
      ageType: data.split("|")[3],
      category: data.split("|")[4],
    }),
    [data]
  );
  const [noEntries, setNoEntries] = useState(0);
  const earlyPrice = parseInt(dataObj.earlyPriceStr.split(" ")[2]);
  const regPrice = parseInt(dataObj.regPriceStr.split(" ")[2]);

  useEffect(() => {
    const noEntriesCalc = () => {
      const { ageType, category } = dataObj;
      const entryForms = forms.filter((form) => form.formName !== "Sommaire");
      let entryCount = 0;

      if (entryForms) {
        entryForms.forEach((form) => {
          form.entries.forEach((entry) => {
            const sameAgeType = entry.ageType === ageType;
            const sameCategory = entry.category === category;
            if (sameAgeType && sameCategory) {
              const noSolo =
                category === "solo" &&
                (!entry.level ||
                  !entry.dance ||
                  !entry.danceStyle ||
                  entry.level === "--" ||
                  entry.danceStyle === "--");
              entryCount +=
                category === "single"
                  ? entry.categories.length
                  : noSolo
                  ? 0
                  : 1;
            }
          });
          setNoEntries(entryCount);
        });
      }
    };
    noEntriesCalc();
  }, [dataObj, forms]);

  useEffect(() => {
    const { ageType, category } = dataObj;
    const currCategory = category + ageType;
    setForms((prev) =>
      prev.map((form) =>
        form.formName === "Sommaire"
          ? {
              ...form,
              items: form.items.map((item) =>
                item.name === currCategory
                  ? { ...item, quantity: noEntries }
                  : item
              ),
            }
          : form
      )
    );
  }, [dataObj, noEntries, setForms]);

  const { mainLine, earlyPriceStr, regPriceStr } = dataObj;

  return (
    <tr>
      <td
        className="text-start"
        style={{ borderRight: "1px solid black", width: "55%" }}
      >
        {mainLine}
      </td>
      <td style={{ background: "rgba(0, 0, 0, .1", width: "5%" }}>
        {early() ? noEntries : null}
      </td>
      <td style={{ background: "rgba(0, 0, 0, .1", width: "8%" }}>
        {earlyPriceStr}
      </td>
      <td
        style={{
          background: "rgba(0, 0, 0, .1",
          borderRight: "1px solid black",
          width: "7%",
        }}
      >
        {early() ? Formatter.format(noEntries * earlyPrice) : null}
      </td>
      <td style={{ width: "5%" }}>{!early() ? noEntries : null}</td>
      <td style={{ width: "8%" }}>{regPriceStr}</td>
      <td style={{ width: "7%" }}>
        {!early() ? Formatter.format(noEntries * regPrice) : null}
      </td>
    </tr>
  );
};

export default SummaryCalculate;
