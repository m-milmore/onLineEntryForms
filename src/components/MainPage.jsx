import React from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const MainPage = ({forms}) => {
  const navigate = useNavigate();

  return (
    <div className="container text-center">
      <div
        className="badge bg-success text-wrap text-white py-3 fs-5 fw-bolder rounded-3"
        style={{ width: "100%", margin: "30px auto 50px" }}
      >
        NDCC 2023 FORMULAIRES
      </div>
      <div
        className="fs-4 fw-bolder"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <ListGroup>
          {forms.map((form) => (
            <ListGroup.Item
              key={form.formId}
              action
              variant="info"
              onClick={() =>
                navigate(form.navigate, { state: { formId: form.formId } })
              }
            >
              {form.formName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default MainPage;
