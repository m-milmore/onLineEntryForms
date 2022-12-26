import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { nanoid } from "nanoid";
import { FormsContext } from "../App";
import { logo, formList } from "../constants";

const NavigationBar = () => {
  const { forms, setForms } = useContext(FormsContext);

  const handleAddForm = (formName, navigate) => {
    const newForm = {
      formId: nanoid(),
      formName,
      navigate,
      formSubmittable: false,
      idSection: {
        studio: "",
        city: "",
        state: "",
        stateAbbrev: "",
        phone: "",
        email: "",
        teacherFirstName: "",
        teacherLastName: "",
        member: "",
        studentFirstName: "",
        studentLastName: "",
        studentGender: "",
      },
      entries: [],
    };
    const arrSumm = forms.filter((form) => form.formName === "Sommaire");
    const arrWoSumm = forms.filter((form) => form.formName !== "Sommaire");
    setForms([...arrWoSumm, newForm, ...arrSumm]);
  };

  return (
    <Navbar bg="success" expand="sm" className="rounded-3 mt-2 mb-5">
      <Container>
        <Navbar.Brand className="text-wrap text-white fw-bolder d-flex align-items-center">
          <div className="me-2">
            <img alt="logo" src={logo} width="30" height="30" />
          </div>
          <span>NDCC 2023</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="fw-bold fs-4">
            <NavDropdown title="Formulaires" id="basic-nav-dropdown">
              {formList.map((form) => {
                return (
                  <NavDropdown.Item
                    key={form.formName}
                    as="button"
                    type="button"
                    value={form.formName}
                    onClick={() => handleAddForm(form.formName, form.navigate)}
                  >
                    {form.formName}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
