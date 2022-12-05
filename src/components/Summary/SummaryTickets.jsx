import React, { useState, useEffect, useContext, useMemo } from "react";
import { appEmitter, FormsContext } from "../../App";
import { early } from "../../constants";
import Formatter from "../Utils/Formatter";

const SummaryTickets = ({ data }) => {
  const { forms } = useContext(FormsContext);
  const dataObj = useMemo(
    () => ({
      mainLine: data.split("|")[1],
      earlyPriceStr: data.split("|")[2],
      regPriceStr: data.split("|")[3],
      ageCategory: data.split("|")[5],
      subForm: data.split("|")[6],
    }),
    [data]
  );
  const [noEntries, setNoEntries] = useState(0);
  const [currValue, setCurrValue] = useState(0);
  const summaryForm = forms.filter((form) => form.formName === "Sommaire");
  const ticketsObj = summaryForm[0].tickets;
  const earlyPrice = parseInt(dataObj.earlyPriceStr.split(" ")[2]);
  const regPrice = parseInt(dataObj.regPriceStr.split(" ")[2]);

  useEffect(() => {
    const { ageCategory, subForm } = dataObj;
    const data = localStorage.getItem(ticketsObj[subForm + ageCategory]);
    if (data) {
      const dataFormatted = parseInt(JSON.parse(data));
      setNoEntries(dataFormatted);
      setCurrValue(dataFormatted);
    }
  }, [dataObj, earlyPrice, regPrice, ticketsObj]);

  useEffect(() => {
    const { ageCategory, subForm } = dataObj;
    localStorage.setItem(
      ticketsObj[subForm + ageCategory],
      JSON.stringify(noEntries)
    );
  }, [noEntries, dataObj, ticketsObj]);

  useEffect(() => {
    const amount = early() ? currValue * earlyPrice : currValue * regPrice;
    appEmitter.emit("entryCount", { amount });
  }, [earlyPrice, regPrice, currValue]);

  const { mainLine, earlyPriceStr, regPriceStr } = dataObj;

  const ticketMainLine = () => {
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

  const handleTicketChange = ({ target: { value } }) => {
    let trimmedValue = value.replace(/\D/g, "");
    trimmedValue = trimmedValue.replace(/^0+/, "");
    trimmedValue = !trimmedValue ? 0 : trimmedValue;
    if (trimmedValue > 20) {
      setCurrValue(0 - noEntries);
      setNoEntries(0);
    } else {
      setCurrValue(trimmedValue - noEntries);
      setNoEntries(trimmedValue);
    }
  };

  const ticketInput = () => {
    return (
      <input
        type="text"
        className="form-control p-0 m-0 text-primary fw-bold border-0 text-center"
        style={{ fontSize: "1rem" }}
        value={noEntries}
        onChange={handleTicketChange}
      />
    );
  };

  return (
    <tr>
      <td
        className="text-start"
        style={{ borderRight: "1px solid black", width: "55%" }}
      >
        {ticketMainLine()}
      </td>
      <td style={{ background: "rgba(0, 0, 0, .1", width: "5%" }}>
        {early() ? ticketInput() : null}
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
      <td style={{ width: "5%" }}>{!early() ? ticketInput() : null}</td>
      <td style={{ width: "8%" }}>{regPriceStr}</td>
      <td style={{ width: "7%" }}>
        {!early() ? Formatter.format(noEntries * regPrice) : null}
      </td>
    </tr>
  );
};

export default SummaryTickets;
