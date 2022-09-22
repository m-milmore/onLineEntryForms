import React, { useState, useEffect } from "react";
import FormHeader from "./FormHeader";
import IdSection from "./IdSection";
import AgeSection from "./AgeSection";
import SingleDances from "./SingleDances";
import FormFooter from "./FormFooter";
import { nanoid } from "nanoid";
import { appEmitter } from "../App";

const INIT_INFO = {
  studio: "",
  city: "",
  state: "Choisir",
  tel: "",
  email: "",
  teacherFirstName: "",
  teacherLastName: "",
  member: "",
  studentFirstName: "",
  studentLastName: "",
  studentGender: "",
};

const ProAm1Dance = () => {
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

  useEffect(() => {
    // choose a level or an age category
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

  useEffect(() => {
    // add or remove dances
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!info.tel.match(phoneRegex)) {
      alert("Numéro de téléphone invalide.");
      return;
    }
    console.log("P/A 1-D fr form submitted");
  };

  return (
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
        <input
          className="btn btn-primary mt-3 d-print-none"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default ProAm1Dance;
