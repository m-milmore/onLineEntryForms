import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams, useSearchParams } from "react-router-dom";
import { EYE_ICONS, INIT_MSG } from "../constants";
import AppMsg from "./AppMsg";

const ResetPassword = () => {
  const { authService } = useContext(UserContext);
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confPassword: "",
  });

  const [newPassSettings, setNewPassSettings] = useState({
    passwordType: "password",
    eyeIcon: EYE_ICONS["SHOW"],
  });

  const [confPassSettings, setConfPassSettings] = useState({
    passwordType: "password",
    eyeIcon: EYE_ICONS["SHOW"],
  });

  const [msg, setMsg] = useState(INIT_MSG);

  const handleChange = ({ target: { name, value } }) => {
    setPasswords({ ...passwords, [name]: value });
  };

  const handleEyeIcon = (newOrConfPassSettings, setNewOrConfPassSettings) => {
    newOrConfPassSettings.passwordType === "text"
      ? setNewOrConfPassSettings({
          passwordType: "password",
          eyeIcon: EYE_ICONS["SHOW"],
        })
      : setNewOrConfPassSettings({
          passwordType: "text",
          eyeIcon: EYE_ICONS["HIDE"],
        });
  };

  const onClose = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword } = passwords;
    setMsg("processing reset password...");
    try {
      await authService.resetPassword(newPassword, token);
      alert("Password reset.");
      await onClose();
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        setMsg("Expired or already used token.");
      } else {
        setMsg(error.message);
      }
    }
  };

  const { newPassword, confPassword } = passwords;

  return (
    <div className="container text-center py-3 mt-5 rounded login-form">
      <div className="fs-6 text-end">
        <button
          onClick={onClose}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></button>
      </div>
      <AppMsg msg={msg} />
      <div
        className="badge bg-success text-wrap text-white mt-1 mb-4 py-3 fs-5 fw-bolder rounded-3"
        style={{ width: "100%", margin: "10px auto 50px" }}
      >
        NDCC 2023 Reset Password
      </div>
      <div className="fs-6 text-start">email: {email}</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 fs-5 text-start position-relative">
          <label htmlFor="newPassword" className="form-label text-primary">
            New Password
          </label>
          <input
            type={newPassSettings.passwordType}
            className="form-control fs-5"
            id="newPassword"
            value={passwords.newPassword}
            name="newPassword"
            onChange={handleChange}
            minLength="6"
            maxLength="20"
            onClick={() => setMsg(INIT_MSG)}
          />
          <div
            className="eye-icon-container"
            onClick={() => handleEyeIcon(newPassSettings, setNewPassSettings)}
          >
            <img src={newPassSettings.eyeIcon} alt="eye" />
          </div>
        </div>
        <div className="mb-3 fs-5 text-start position-relative">
          <label htmlFor="confPassword" className="form-label text-primary">
            Confirm New Password
          </label>
          <input
            type={confPassSettings.passwordType}
            className="form-control fs-5"
            id="confPassword"
            value={passwords.confPassword}
            name="confPassword"
            onChange={handleChange}
            minLength="6"
            maxLength="20"
            onClick={() => setMsg(INIT_MSG)}
          />
          <div
            className="eye-icon-container"
            onClick={() => handleEyeIcon(confPassSettings, setConfPassSettings)}
          >
            <img src={confPassSettings.eyeIcon} alt="eye" />
          </div>
        </div>
        <input
          type="submit"
          disabled={!newPassword || newPassword !== confPassword}
          className="btn btn-danger fs-5"
          value="send password"
          style={{ width: "100%" }}
        />
      </form>
      <div className="footer-text">
        <span onClick={onClose}>Cancel</span>
        <div>
          <u style={{ cursor: "pointer" }}>Privacy Policy and Cookies</u>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <u style={{ cursor: "pointer" }}>Terms of Sale and Use</u>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
