import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, appEmitter } from "../../App";
import AppMsg from "../Utils/AppMsg";
import { CLIENT_URL, INIT_MSG } from "../../constants";

const ForgotPassword = () => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("m.milmore2701@gmail.com");
  const [msg, setMsg] = useState(INIT_MSG);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlLink = CLIENT_URL + "/resetpassword/";
    setMsg("sending reset password link to {email}...");
    try {
      await authService.forgotPassword(email, urlLink);
      appEmitter.emit("forgotPasswordEmail", email);
      navigate("/login");
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        setMsg("Sorry, the email you've entered is not in the database.");
      } else {
        setMsg(error.message);
      }
    }
  };

  return (
    <div className="container text-center py-3 mt-5 rounded login-form">
      <AppMsg msg={msg} />
      <div
        className="badge bg-success text-wrap text-white py-3 fs-5 fw-bolder rounded-3"
        style={{ width: "100%", margin: "30px auto 50px" }}
      >
        NDCC 2023 Forgot Password
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 fs-5 text-start">
          <label htmlFor="email" className="form-label text-primary">
            Email address
          </label>
          <input
            type="email"
            className="form-control fs-5"
            id="email"
            value={email}
            name="email"
            placeholder="name@example.com"
            onChange={handleChange}
            minLength="7"
            maxLength="50"
            onClick={() => setMsg(INIT_MSG)}
          />
        </div>
        <input
          type="submit"
          disabled={!email}
          className="btn btn-danger fs-5"
          value="send email"
          style={{ width: "100%" }}
        />
      </form>
      <div className="footer-text">
        <span onClick={() => navigate("/")}>Cancel</span>
        <div>
          <u style={{ cursor: "pointer" }}>Privacy Policy and Cookies</u>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <u style={{ cursor: "pointer" }}>Terms of Sale and Use</u>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
