import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FormsContext } from "../../App";
import FormHeader from "../Commons/FormHeader";
import IdSection from "../Commons/IdSection";
import Championships from "./Championships";
import Scholarships from "./Scholarships";
import ProAmSolos from "./ProAmSolos";
import FormFooter from "../Commons/FormFooter";
import FormsControls from "../Commons/FormsControls";

const ProAmMulti = () => {
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
      if (entry.category === "solo") {
        if (
          !entry.level ||
          !entry.danceStyle ||
          entry.level === "--" ||
          entry.danceStyle === "--" ||
          !entry.dance
        )
          missingInEntries = true;
      }
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
  }, [entries, formId, idSection, setForms, submittable]);

  return (
    <div className="container text-center py-3">
      <FormHeader title1={`${i + 1}.PRO_AM`} title2="MULTI DANSES" />
      <IdSection formId={formId} />
      <Championships formId={formId} syllabus="fermé" />
      <Championships formId={formId} syllabus="ouvert" />
      <Scholarships formId={formId} />
      <ProAmSolos formId={formId} />
      <FormFooter />
      <FormsControls submittable={submittable} />
    </div>
  );
};

export default ProAmMulti;
