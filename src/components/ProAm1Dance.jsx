import React, { useState, useEffect } from "react";
import FormHeader from "./FormHeader";
import IdSection from "./IdSection";
import AgeSection from "./AgeSection";
import SingleDances from "./SingleDances";
import FormFooter from "./FormFooter";
import { provinces, states, provAbbr, statesAbbr } from "../constants";

const INIT_INFO = {
  studio: "",
  teacherFirstName: "",
  teacherLastName: "",
  city: "",
  state: "Province/État",
  tel: "",
  email: "",
  member: "",
  studentFirstName: "",
  studentLastName: "",
  studentGender: "",
  stateAbbrev: "",
};

const countriesDivisions = provinces.concat(states);
const countriesDivisionsAbbr = provAbbr.concat(statesAbbr);

const ProAm1Dance = () => {
  const [info, setInfo] = useState(INIT_INFO);

  useEffect(() => {
    if (info.state !== "Province/État") {
      setInfo((prev) => ({
        ...prev,
        stateAbbrev:
          countriesDivisionsAbbr[countriesDivisions.indexOf(info.state)],
      }));
    }
  }, [info.state]);

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
        <IdSection
          info={info}
          setInfo={setInfo}
          countriesDivisions={countriesDivisions}
        />
        <AgeSection />
        <SingleDances syllabus="FERMÉ"/>
        {/*<SingleDances />
        <FormFooter /> */}
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
