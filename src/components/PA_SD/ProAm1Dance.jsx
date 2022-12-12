import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FormsContext } from "../../App";
import FormHeader from "../Commons/FormHeader";
import IdSection from "../Commons/IdSection";
import AgeSection from "./AgeSection";
import SingleDances from "./SingleDances";
import FormFooter from "../Commons/FormFooter";
import FormsControls from "../Commons/FormsControls";

const ProAm1Dance = () => {
  const {
    state: { formId, i },
  } = useLocation();
  const { forms, setForms } = useContext(FormsContext);
  const currForm = forms.filter((form) => form.formId === formId);
  const idSection = currForm[0].idSection;
  const entries = currForm[0].entries;
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    let missingInEntries = false;
    entries.forEach((entry) => {
      if (
        !entry.level ||
        !entry.age ||
        entry.level === "--" ||
        entry.age === "--" ||
        entry.categories.length === 0
      )
        missingInEntries = true;
    });
    setSubmittable(
      idSection.studio &&
        idSection.city &&
        idSection.state &&
        idSection.phone &&
        idSection.email &&
        idSection.teacherFirstName &&
        idSection.teacherLastName &&
        idSection.studentFirstName &&
        idSection.studentLastName &&
        idSection.studentGender &&
        entries.length > 0 &&
        !missingInEntries
    );
    setForms((prev) =>
      prev.map((form) =>
        form.formId === formId
          ? {
              ...form,
              formSubmittable: submittable,
            }
          : form
      )
    );
  }, [formId, setForms, submittable, entries, idSection]);

  return (
    <div className="container text-center py-3">
      <FormHeader title1={`${i + 1}.PRO_AM`} title2="DANSES INDIVIDUELLES" />
      <IdSection formId={formId} />
      <AgeSection />
      <SingleDances syllabus="fermé" formId={formId} />
      <SingleDances syllabus="ouvert" formId={formId} />
      <FormFooter />
      <FormsControls submittable={submittable} />
    </div>
  );
};

export default ProAm1Dance;
