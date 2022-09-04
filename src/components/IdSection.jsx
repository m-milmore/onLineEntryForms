import React from "react";
import BaseText from "./BaseText";
import BaseSelect from "./BaseSelect";
import BaseRadio from "./BaseRadio";
import PropTypes from "prop-types";

const IdSection = ({ ids, setIds, countriesDivisions }) => {
  const handleChange = ({ target: { name, value } }) => {
    setIds({ ...ids, [name]: value });
  };

  const rowClass =
    "row border-bottom border-dark m-0 p-0 d-flex align-items-start";

  return (
    <div className="container text-start fs-6 p-0">
      <div className={rowClass}>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="studio"
            inputValue={ids.studio}
            handleChange={handleChange}
            label="Studio :"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="city"
            inputValue={ids.city}
            handleChange={handleChange}
            label="Ville :"
          />
        </div>
        <div className="col-12 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseSelect
            label="Province/État"
            title={ids.state}
            name="state"
            options={countriesDivisions}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-11 col-sm-6 col-lg-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="teacherFirstName"
            inputValue={ids.teacherFirstName}
            handleChange={handleChange}
            label="Prénom du Professeur :"
          />
        </div>
        <div className="col-11 col-sm-6 col-lg-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="teacherLastName"
            inputValue={ids.teacherLastName}
            handleChange={handleChange}
            label="Nom du Professeur :"
          />
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="tel"
            inputValue={ids.tel}
            handleChange={handleChange}
            label="Téléphone :"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="email"
            commonInfo="email"
            inputValue={ids.email}
            handleChange={handleChange}
            label="Courriel :"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center justify-content-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="member"
            inputValue={ids.member}
            handleChange={handleChange}
            label="Membre #"
          />
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-9 col-xl-8 ps-0 pe-1">
          <p>
            *Le professeur doit être membre en règle avec son association
            professionnelle pour 2022.
          </p>
        </div>
        <div className="col-3 col-xl-4 ps-0 pe-1 fw-bold">
          <p className="text-center text-xl-start">UNE FEUILLE PAR ÉLÈVE</p>
        </div>
      </div>
      <div className={rowClass}>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="studentFirstName"
            inputValue={ids.studentFirstName}
            handleChange={handleChange}
            label="Prénom de l'élève :"
          />
        </div>
        <div className="col-6 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <BaseText
            inputType="text"
            commonInfo="studentLastName"
            inputValue={ids.studentLastName}
            handleChange={handleChange}
            label="Nom de l'élève :"
          />
        </div>
        <div className="col-12 col-sm-4 d-flex align-items-center ps-0 pe-1">
          <div className="form-check pe-2">
            <BaseRadio
              commonInfo="male"
              name="studentGender"
              handleChange={handleChange}
              label="Homme"
            />
          </div>
          <div className="form-check">
            <BaseRadio
              commonInfo="female"
              name="studentGender"
              handleChange={handleChange}
              label="Femme"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

BaseText.propTypes = {
  ids: PropTypes.object,
  setIds: PropTypes.func,
  countriesDivision: PropTypes.arrayOf(PropTypes.string),
};

BaseText.defaultProps = {
  ids: {},
  setIds: () => {},
  countriesDivision: [],
};

export default IdSection;
