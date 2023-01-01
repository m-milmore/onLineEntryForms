import React, { useState, useEffect, useContext, useRef } from "react";
import { FormsContext, UserContext } from "../../App";
import { nanoid } from "nanoid";
import AppMsg from "../Utils/AppMsg";
import ConfirmationToast from "../Utils/ConfirmationToast";
import { INIT_MSG } from "../../constants";

const Success = () => {
  const { forms } = useContext(FormsContext);
  const { entriesService } = useContext(UserContext);
  const entryForms = forms.filter((form) => form.formName !== "Sommaire");
  const [entries, setEntries] = useState([]);
  const [msg, setMsg] = useState(INIT_MSG);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const entriesRef = useRef();
  entriesRef.current = entries;

  const formatEntries = () => {
    const arr = [];
    entryForms.forEach((form) => {
      const { formName } = form;
      form.entries.forEach((entry) => {
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
      });
    });
    setEntries(arr);
  };

  const sendEntries = async (entries) => {
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
  };

  useEffect(() => {
    const processEntries = async () => {
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
      <ConfirmationToast
        show={showToast}
        onClose={() => setShowToast(false)}
        toastMsg={toastMsg}
      />
    </>
  );
};

export default Success;
