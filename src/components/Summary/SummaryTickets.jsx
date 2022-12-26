import React, { useState, useContext, useEffect } from "react";
import { FormsContext } from "../../App";
import { early } from "../../constants";
import Formatter from "../Utils/Formatter";

const SummaryTickets = ({ data }) => {
  const { forms, setForms } = useContext(FormsContext);
  const summaryForm = forms.filter((form) => form.formName === "Sommaire");

  const mainLine = data.split("|")[1];
  const earlyPriceStr = data.split("|")[2];
  const regPriceStr = data.split("|")[3];
  const earlyPrice = parseInt(earlyPriceStr.split(" ")[2]);
  const regPrice = parseInt(regPriceStr.split(" ")[2]);
  const category = data.split("|")[4];

  const quantity = summaryForm[0].items.filter(
    (item) => item.name === category
  )[0].quantity;

  const [tickets, setTickets] = useState(quantity);

  useEffect(() => {
    setForms((prev) =>
      prev.map((form) =>
        form.formName === "Sommaire"
          ? {
              ...form,
              items: form.items.map((item) =>
                item.name === category ? { ...item, quantity: tickets } : item
              ),
            }
          : form
      )
    );
    setForms((prev) =>
      prev.map((form) =>
        form.formName === "Sommaire"
          ? {
              ...form,
              formSubmittable: form.items.some((item) => item.quantity > 0),
            }
          : form
      )
    );
  }, [setForms, tickets, category]);

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
      setTickets(0);
    } else {
      setTickets(parseInt(trimmedValue));
    }
  };

  const ticketInput = () => {
    return (
      <input
        type="text"
        className="form-control p-0 m-0 text-primary fw-bold border-0 text-center"
        style={{ fontSize: "1rem" }}
        value={tickets}
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
        {early() ? Formatter.format(tickets * earlyPrice) : null}
      </td>
      <td style={{ width: "5%" }}>{!early() ? ticketInput() : null}</td>
      <td style={{ width: "8%" }}>{regPriceStr}</td>
      <td style={{ width: "7%" }}>
        {!early() ? Formatter.format(tickets * regPrice) : null}
      </td>
    </tr>
  );
};

export default SummaryTickets;
