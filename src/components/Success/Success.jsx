import React, { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { FormsContext, UserContext } from "../../App";
import AppMsg from "../Utils/AppMsg";
import ConfirmationToast from "../Utils/ConfirmationToast";
import { INIT_MSG } from "../../constants";

const Success = () => {
  const { forms } = useContext(FormsContext);
  const { entriesService } = useContext(UserContext);
  const entryForms = forms.filter((form) => form.formName !== "Sommaire");
  const summForm = forms.filter((form) => form.formName === "Sommaire");
  const [entries, setEntries] = useState([]);
  const [msg, setMsg] = useState(INIT_MSG);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const entriesRef = useRef();
  entriesRef.current = entries;
  const [searchParams] = useSearchParams();
  const [customerDetails, setCustomerDetails] = useState({
    country: "",
    postalCode: "",
    email: "",
    name: "",
  });

  const formatEntries = () => {
    const arr = [];
    entryForms.forEach((form) => {
      const { formName } = form;
      form.entries.forEach((entry) => {
        if (entry.category === "single") {
          const { level, age, ageType, syllabus, category } = entry;
          entry.categories.forEach((cat) => {
            arr.push({
              formName,
              ...form.idSection,
              level,
              age,
              ageType,
              syllabus,
              category,
              ...cat,
            });
          });
        } else {
          const { level, age, ageType, syllabus, category, dance, danceStyle } =
            entry;
          arr.push({
            formName,
            ...form.idSection,
            level,
            age,
            ageType,
            syllabus,
            category,
            dance,
            danceStyle,
          });
        }
      });
    });
    setEntries(arr);
  };

  const sendEntries = async (entries) => {
    if (entries.length) {
      setMsg("processing entries...");
      try {
        await entriesService.createEntries(entries);
        setMsg(INIT_MSG);
        setShowToast(true);
        setToastMsg("Entries successfully send!");
      } catch (error) {
        console.error(error);
        setMsg(error.request.response);
      }
    }
  };

  const getStripeSessionData = async () => {
    const sessionId = searchParams.get("session_id");
    const items = summForm[0].items;
    const areTickets = items.some(
      (item) => item.type === "ticket" && item.quantity > 0
    );
    if (areTickets) {
      try {
        const response = await entriesService.getStripeData(sessionId);
        await setCustomerDetails({
          country: response.address.country,
          postalCode: response.address.postal_code,
          email: response.email,
          name: response.name,
        });
      } catch (error) {
        console.error(error);
        setMsg(error.request.response);
      }
    }
  };

  useEffect(() => {
    const processEntries = async () => {
      await getStripeSessionData();
      await formatEntries();
      await sendEntries(entriesRef.current);
    };

    processEntries();
  }, []);

  return (
    <>
      <AppMsg msg={msg} />
      <div>SUCCESS</div>

      {entries.map((entry) => (
        <ol key={nanoid()}>
          {Object.entries(entry).map(([key, value]) => (
            <li key={key}>
              {key} : {value}
            </li>
          ))}
        </ol>
      ))}
      <div>
        <div>CUSTOMER DETAILS:</div>
        <div>email: {customerDetails.email}</div>
        <div>name: {customerDetails.name}</div>
        <div>country: {customerDetails.country}</div>
        <div>postal code / zip: {customerDetails.postalCode}</div>
      </div>
      <ConfirmationToast
        show={showToast}
        onClose={() => setShowToast(false)}
        toastMsg={toastMsg}
      />
    </>
  );
};

export default Success;
