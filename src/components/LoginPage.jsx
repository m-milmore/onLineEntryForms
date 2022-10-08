import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, appEmitter } from "../App";
import "./LoginPage.css";
import ConfirmationToast from "./ConfirmationToast";
import AppMsg from "./AppMsg";
import { EYE_ICONS, INIT_MSG } from "../constants";

const LoginPage = ({ initEmail }) => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    passwordType: "password",
    eyeIcon: EYE_ICONS["SHOW"],
  });

  const [persist, setPersist] = useState(false);
  const [msg, setMsg] = useState(INIT_MSG);

  const [showToast, setShowToast] = useState(false);
  const toggleToast = useCallback(() => {
    setShowToast(!showToast);
  }, [showToast]);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    setUserCredentials({
      email: initEmail || "a@a.com",
      password: "",
    });
    initEmail && setShowToast(true);
    initEmail && setToastMsg(`Email send to ${initEmail}`);
  }, [initEmail]);

  const handleChange = ({ target: { name, value } }) => {
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleEyeIcon = () => {
    passwordInfo.passwordType === "text"
      ? setPasswordInfo({
          passwordType: "password",
          eyeIcon: EYE_ICONS["SHOW"],
        })
      : setPasswordInfo({
          passwordType: "text",
          eyeIcon: EYE_ICONS["HIDE"],
        });
  };

  const togglePersist = () => {
    setPersist(!persist);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userCredentials;
    setMsg("processing login...");
    try {
      await authService.loginUser(email, password);
      appEmitter.emit("isLoggedIn", true);
      navigate("/");
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        setMsg("Sorry, you've entered an incorrect email or password.");
      } else {
        setMsg(error.message);
      }
    }
  };

  const { email, password } = userCredentials;
  const { passwordType, eyeIcon } = passwordInfo;

  return (
    <>
      <div className="container text-center py-3 mt-5 rounded login-form">
        <AppMsg msg={msg} />
        <div
          className="badge bg-success text-wrap text-white py-3 fs-5 fw-bolder rounded-3"
          style={{ width: "100%", margin: "30px auto 50px" }}
        >
          NDCC 2023 CONNEXION
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
          <div className="mb-3 fs-5 text-start position-relative">
            <label htmlFor="password" className="form-label text-primary">
              Password
            </label>
            <input
              type={passwordType}
              className="form-control fs-5"
              id="password"
              value={password}
              name="password"
              placeholder="password"
              onChange={handleChange}
              minLength="6"
              maxLength="20"
              onClick={() => setMsg(INIT_MSG)}
            />
            <div className="eye-icon-container" onClick={handleEyeIcon}>
              <img src={eyeIcon} alt="eye" />
            </div>
          </div>
          <input
            type="submit"
            disabled={!email || !password}
            className="btn btn-danger fs-5"
            value="sign in"
            style={{ width: "100%" }}
          />
          <div className="persistCheck">
            <input
              type="checkbox"
              name="persist"
              onChange={togglePersist}
              checked={persist}
              id="persist"
            />
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </form>
        <div className="footer-text">
          <span onClick={() => navigate("/forgotpassword")}>
            Forgot password?
          </span>
          <div>
            <u style={{ cursor: "pointer" }}>Privacy Policy and Cookies</u>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <u style={{ cursor: "pointer" }}>Terms of Sale and Use</u>
          </div>
        </div>
      </div>
      <ConfirmationToast
        show={showToast}
        onClose={toggleToast}
        toastMsg={toastMsg}
      />
    </>
  );
};

export default LoginPage;
