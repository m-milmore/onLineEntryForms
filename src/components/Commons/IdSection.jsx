import React, { useContext } from "react";
import { FormsContext } from "../../App";
import BaseText from "./BaseText";
import BaseSelect from "./BaseSelect";
import BaseRadio from "./BaseRadio";
import {
  countries,
  states,
  provinces,
  statesAbbr,
  provAbbr,
} from "../../constants";
import "./IdSection.css";

const IdSection = ({ formId }) => {
  const { forms, setForms } = useContext(FormsContext);
  const currFormData = forms.filter((form) => form.formId === formId);
  const {
    studio,
    city,
    state,
    phone,
    email,
    teacherFirstName,
    teacherLastName,
    member,
    studentFirstName,
    studentLastName,
    studentGender,
  } = currFormData[0].idSection;
  const territories = provinces.concat(states.concat(countries));
  const dividers = [provinces.length - 1, provinces.length + states.length - 1];
  const countriesDivisions = provinces.concat(states);
  const countriesDivisionsAbbr = provAbbr.concat(statesAbbr);
  const rowClass =
    "row border-bottom border-dark m-0 p-0 d-flex align-items-start";

  const handleChange = ({ target: { name, value } }) => {
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              idSection: {
                ...form.idSection,
                [name]: value,
              },
            }
          : form
      )
    );
  };

  const handleClick = ({ target: { value } }) => {
    const stateAbbrev = countriesDivisions.includes(value)
      ? countriesDivisionsAbbr[countriesDivisions.indexOf(value)]
      : "";
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              idSection: {
                ...form.idSection,
                state: value,
                stateAbbrev,
              },
            }
          : form
      )
    );
  };

  return (
    <div className="text-start fs-6 p-0 section-container">
      <div className={rowClass}>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="studio"
            inputValue={studio}
            handleChange={handleChange}
            label="Studio"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="city"
            inputValue={city}
            handleChange={handleChange}
            label="Ville"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseSelect
            label="Territoire"
            value={state}
            options={territories}
            dividers={dividers}
            handleClick={handleClick}
          />
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-12 col-sm-6 col-lg-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="phone"
            inputValue={phone}
            handleChange={handleChange}
            label="Téléphone"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="email"
            commonInfo="email"
            inputValue={email}
            handleChange={handleChange}
            label="Courriel"
          />
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="teacherFirstName"
            inputValue={teacherFirstName}
            handleChange={handleChange}
            label="Prénom du professeur"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="teacherLastName"
            inputValue={teacherLastName}
            handleChange={handleChange}
            label="Nom du professeur"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center justify-content-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="member"
            inputValue={member}
            handleChange={handleChange}
            label="Membre #"
          />
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-9 col-xl-8 ps-0 pe-1">
          <p className="print-mess">
            *Le professeur doit être membre en règle avec son association
            professionnelle pour 2023.
          </p>
        </div>
        <div className="col-3 col-xl-4 ps-0 pe-1 fw-bold">
          <p className="text-center text-xl-start print-mess">
            UNE FEUILLE PAR ÉLÈVE
          </p>
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="studentFirstName"
            inputValue={studentFirstName}
            handleChange={handleChange}
            label="Prénom de l'élève"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="studentLastName"
            inputValue={studentLastName}
            handleChange={handleChange}
            label="Nom de l'élève"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1 pt-md-1 print-radios">
          <div className="form-check pe-2">
            <BaseRadio
              commonInfo="M"
              name="studentGender"
              handleChange={handleChange}
              label="Homme"
              inputValue={studentGender}
            />
          </div>
          <div className="form-check">
            <BaseRadio
              commonInfo="F"
              name="studentGender"
              handleChange={handleChange}
              label="Femme"
              inputValue={studentGender}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdSection;
