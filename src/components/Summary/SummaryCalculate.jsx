import React, { useState, useContext, useEffect, useMemo } from "react";
import { appEmitter, FormsContext } from "../../App";
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
      ageCategory: data.split("|")[4],
      subForm: data.split("|")[5],
      agesGroups: data.split("|")[6],
      section: data.split("|")[7],
    }),
    [data]
  );

  const earlyPrice = parseInt(dataObj.earlyPriceStr.split(" ")[2]);
  const regPrice = parseInt(dataObj.regPriceStr.split(" ")[2]);
  const isTicketsSection = dataObj.section === "BILLETS";
  const [noEntries, setNoEntries] = useState(0);

  useEffect(() => {
    const noEntriesCalc = () => {
      const { formName, agesGroups, ageCategory, subForm } = dataObj;
      const entryForms = forms.filter((form) => form.formName === formName);

      if (entryForms) {
        let entryCount = 0;
        entryForms.forEach((form) => {
          let formData = localStorage.getItem(form.formId);
          if (formData) {
            formData = JSON.parse(formData);
            if (formData.entries) {
              formData.entries.forEach((entry) => {
                const ageGroup = ageGroups[agesGroups];
                const str = ageGroup.filter(
                  (ageStr) => ageStr.split("|")[0] === entry.age
                );
                if (str.length) {
                  const sameAgeGroup = str[0].split("|")[2] === ageCategory;
                  const sameDanceGroup = entry.category === subForm;
                  if (sameAgeGroup && sameDanceGroup) {
                    entryCount +=
                      subForm === "single" ? entry.categories.length : 1;
                  }
                }
              });
            }
          }
          setNoEntries(entryCount);
<<<<<<< HEAD
          // handleSetTotal(earlyPrice);
=======
>>>>>>> fixing-calculate
        });
      }
    };
    noEntriesCalc();
    const amount = early() ? noEntries * earlyPrice : noEntries * regPrice;
    appEmitter.emit("entryCount", { amount });
  }, [dataObj, forms, noEntries, earlyPrice, regPrice]);

  const { mainLine, earlyPriceStr, regPriceStr } = dataObj;

  const ticketSection = () => {
    return (
      <div className="d-flex">
        <div style={{ width: "33%" }}>{mainLine.split("%")[0]}</div>
        <div style={{ width: "33%", textAlign: "right" }}>
          {mainLine.split("%")[1]}
        </div>
        <div>&nbsp;</div>
      </div>
    );
  };

  return (
    <tr>
      <td
        className="text-start"
        style={{ borderRight: "1px solid black", width: "55%" }}
      >
        {isTicketsSection ? ticketSection() : mainLine}
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
