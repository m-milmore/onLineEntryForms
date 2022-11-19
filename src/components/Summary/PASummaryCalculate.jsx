import React, { useState, useContext, useEffect, useMemo } from "react";
import { FormsContext } from "../../App";
import { early, ageGroups } from "../../constants";
import Formatter from "../Utils/Formatter";

const PASummaryCalculate = ({ data }) => {
  const forms = useContext(FormsContext);
  const dataObj = useMemo(
    () => ({
      mainLine: data.split("|")[0],
      earlyPriceStr: data.split("|")[1],
      regPriceStr: data.split("|")[2],
      formName: data.split("|")[3],
      ageCategory: data.split("|")[4],
      subForm: data.split("|")[5],
      agesGroups: data.split("|")[6],
    }),
    [data]
  );

  const earlyPrice = parseInt(dataObj.earlyPriceStr.split(" ")[2]);
  const regPrice = parseInt(dataObj.regPriceStr.split(" ")[2]);
  const [noEntries, setNoEntries] = useState(0);

  useEffect(() => {
    const { formName, agesGroups, ageCategory, subForm } = dataObj;

    const noEntriesCalc = () => {
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
                    entryCount =
                      subForm === "single" ? entry.categories.length : 1;
                  }
                }
              });
            }
          }
          setNoEntries(entryCount);
        });
      }
    };

    noEntriesCalc();
  }, [dataObj, forms]);

  const { mainLine, earlyPriceStr, regPriceStr } = dataObj;

  return (
    <tr key={data}>
      <td
        className="text-start"
        style={{ borderRight: "1px solid black", width: "55%" }}
      >
        {mainLine}
      </td>
      <td style={{ width: "5%" }}>{early() ? noEntries : null}</td>
      <td style={{ width: "8%" }}>{earlyPriceStr}</td>
      <td style={{ borderRight: "1px solid black", width: "7%" }}>
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

export default PASummaryCalculate;
