import React, { useState, useEffect, useContext, useCallback } from "react";
import FormHeader from "./FormHeader";
import IdSection from "./IdSection";
import AgeSection from "./AgeSection";
import SingleDances from "./SingleDances";
import FormFooter from "./FormFooter";
import AppMsg from "./AppMsg";
import ConfirmationToast from "./ConfirmationToast";
import { nanoid } from "nanoid";
import { appEmitter, UserContext } from "../App";
import { INIT_MSG } from "../constants";

const INIT_INFO = {
  form: "paSD",
  studio: "Wow!",
  city: "Heckville",
  state: "Maine",
  phone: "212-321-6547",
  email: "z@z.com",
  teacherFirstName: "Ed",
  teacherLastName: "Eckell",
  member: "654321",
  studentFirstName: "Faith",
  studentLastName: "Flash",
  studentGender: "female",
};

const ProAm1Dance = () => {
  const { entriesService } = useContext(UserContext);
  const [info, setInfo] = useState(INIT_INFO);

  const [rows, setRows] = useState([
    {
      rowId: nanoid(),
      level: "",
      age: "",
      syllabus: "fermé",
      categories: [],
    },
    {
      rowId: nanoid(),
      level: "",
      age: "",
      syllabus: "ouvert",
      categories: [],
    },
  ]);

  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [msg, setMsg] = useState(INIT_MSG);

  const [showToast, setShowToast] = useState(false);
  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);
  const [toastMsg, setToastMsg] = useState("");

  // data sent from BaseSelect component
  useEffect(() => {
    const onUpdateTerritory = ({ territory }) => {
      setInfo({ ...info, state: territory });
    };

    const territoryListener = appEmitter.addListener(
      "territory",
      onUpdateTerritory
    );

    return () => {
      territoryListener.remove();
    };
  }, [info]);

  // data sent from RegSelect component for level and age
  useEffect(() => {
    const onUpdateSelect = ({ rowId, name, value }) => {
      setRows(
        rows.map((row) =>
          row.rowId === rowId ? { ...row, [name]: value } : row
        )
      );
    };

    const selectListener = appEmitter.addListener("select", onUpdateSelect);

    return () => {
      selectListener.remove();
    };
  }, [rows]);

  // data sent from Dance component, add or remove a dance: select is a true/false toggle
  useEffect(() => {
    const onUpdateComps = ({ dance, danceStyle, rowId, newSelect: select }) => {
      const comp = {
        dance,
        danceStyle,
      };

      setRows(
        rows.map((row) => {
          if (row.rowId === rowId) {
            const categories = select
              ? [...row.categories, comp]
              : row.categories.filter(
                  (obj) =>
                    !(
                      obj.dance === comp.dance &&
                      obj.danceStyle === comp.danceStyle
                    )
                );
            return { ...row, categories };
          } else return row;
        })
      );
    };

    const compListener = appEmitter.addListener("comp", onUpdateComps);

    return () => {
      compListener.remove();
    };
  }, [rows]);

  useEffect(() => {
    const onDeleteRow = ({ rowId }) => {
      setRows(rows.filter((row) => row.rowId !== rowId));
    };

    const deleteListener = appEmitter.addListener("deleteRow", onDeleteRow);

    return () => {
      deleteListener.remove();
    };
  }, [rows]);

  // to disable or enable te submit button
  useEffect(() => {
    const {
      studio,
      city,
      state,
      phone,
      email,
      teacherFirstName,
      teacherLastName,
      studentFirstName,
      studentLastName,
      studentGender,
    } = info;
    let missingInRows = false;
    rows.forEach((row) => {
      if (
        !row.level ||
        !row.age ||
        row.level === "--" ||
        row.age === "--" ||
        row.categories.length === 0
      )
        missingInRows = true;
    });
    setDisableSubmitBtn(
      !studio ||
        !city ||
        !state ||
        !phone ||
        !email ||
        !teacherFirstName ||
        !teacherLastName ||
        !studentFirstName ||
        !studentLastName ||
        !studentGender ||
        rows.length === 0 ||
        missingInRows
    );
  }, [info, rows]);

  const handleChange = ({ target: { name, value } }) => {
    setInfo({ ...info, [name]: value });
  };

  const handleAddRow = (syllabus) => {
    const newRow = {
      rowId: nanoid(),
      level: "",
      age: "",
      syllabus: syllabus,
      categories: [],
    };
    setRows((prev) => [...prev, newRow]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!info.phone.match(phoneRegex)) {
      alert("Numéro de téléphone invalide.");
      return;
    }
    const entries = [];
    rows.forEach((row) => {
      row.categories.forEach((category) => {
        const { level, age, syllabus } = row;
        entries.push({ level, age, syllabus, ...category, ...info });
      });
    });
    setMsg("processing entries...");
    try {
      await entriesService.createEntries(entries);
      setMsg(INIT_MSG);
      setShowToast(true);
      setToastMsg("Entries successfully send!");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setMsg(error.response.data.error);
      } else if (error.response.status === 403) {
        setMsg("Unauthorized");
      } else {
        setMsg(error.message);
      }
    }
  };

  return (
    <>
      <div className="container text-center py-3">
        <form onSubmit={handleSubmit}>
          <FormHeader />
          <IdSection info={info} handleChange={handleChange} />
          <AgeSection />
          <SingleDances
            rows={rows}
            syllabus="fermé"
            handleAddRow={handleAddRow}
          />
          <SingleDances
            rows={rows}
            syllabus="ouvert"
            handleAddRow={handleAddRow}
          />
          <FormFooter />
          <div className="d-flex justify-content-center align-items-center mt-3 ">
            <input
              className="btn btn-primary d-print-none me-2"
              type="submit"
              value="Submit"
              disabled={disableSubmitBtn}
            />
            <AppMsg msg={msg} />
          </div>
        </form>
      </div>
      <ConfirmationToast
        show={showToast}
        onClose={toggleToast}
        toastMsg={toastMsg}
      />
    </>
  );
};

export default ProAm1Dance;
