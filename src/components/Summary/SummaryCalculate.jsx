import React, { useState, useEffect, useContext, useMemo } from "react";
import { FormsContext } from "../../App";
import { early, ageGroups } from "../../constants";
import Formatter from "../Utils/Formatter";

const SummaryCalculate = ({ data }) => {
  const { forms } = useContext(FormsContext);
  const dataObj = useMemo(
    () => ({
      mainLine: data.split("|")[0],
      earlyPriceStr: data.split("|")[1],
      regPriceStr: data.split("|")[2],
      formName: data.split("|")[3],
      ageType: data.split("|")[4],
      category: data.split("|")[5],
      agesGroups: data.split("|")[6],
    }),
    [data]
  );
  const [noEntries, setNoEntries] = useState(0);
  const earlyPrice = parseInt(dataObj.earlyPriceStr.split(" ")[2]);
  const regPrice = parseInt(dataObj.regPriceStr.split(" ")[2]);

  useEffect(() => {
    const noEntriesCalc = () => {
      const { formName, agesGroups, ageType, category } = dataObj;
      const entryForms = forms.filter((form) => form.formName === formName);
      let entryCount = 0;

      if (entryForms) {
        entryForms.forEach((form) => {
          if (form.entries) {
            form.entries.forEach((entry) => {
              const ageGroup = ageGroups[agesGroups];
              const str = ageGroup.filter(
                (ageStr) => ageStr.split("|")[0] === entry.age
              );
              if (str.length) {
                const sameAgeGroup = str[0].split("|")[2] === ageType;
                const sameDanceGroup = entry.category === category;
                if (sameAgeGroup && sameDanceGroup) {
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
              }
            });
          }
          setNoEntries(entryCount);
        });
      }
    };
    noEntriesCalc();
  }, [dataObj, forms]);

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
