import React from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const MainPage = () => {
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
          <ListGroup.Item
            action
            variant="info"
            onClick={() => navigate("/pa1d")}
          >
            Pro/Am 1-Danse
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default MainPage