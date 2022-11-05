import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { EventEmitter } from "fbemitter";
import { nanoid } from "nanoid";
import { AuthService, EntriesService } from "./services";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import MainPage from "./components/MainPage";
import LoginPage from "./components/AuthService/LoginPage";
import ForgotPassword from "./components/AuthService/ForgotPassword";
import ResetPassword from "./components/AuthService/ResetPassword";
import ProAm1Dance from "./components/PA_SD/ProAm1Dance";
import ProAmMulti from "./components/PA_Multi/ProAmMulti";
import Page404 from "./components/Page404";
import AppMsg from "./components/Utils/AppMsg";
import { INIT_MSG } from "./constants";

const authService = new AuthService();
const entriesService = new EntriesService(authService.getBearerHeader);
export const UserContext = createContext();
export const appEmitter = new EventEmitter();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    entriesService,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

const PrivateRoute = ({ children, isLoggedIn, ...props }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const FORMS_INIT = [
  {
    formId: nanoid(),
    formName: "Pro/Am 1 Danse",
    navigate: "/pa1d",
  },
  {
    formId: nanoid(),
    formName: "Pro/Am Multi Danse",
    navigate: "/pamulti",
  },
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState(""); // to pass email of forgotpassword to login page via listener
  const [msg, setMsg] = useState(INIT_MSG);
  const [forms, setForms] = useState(FORMS_INIT);

  // fetches form constants
  useEffect(() => {
    setMsg("loading data...");

    const fetchItems = async () => {
      try {
        await entriesService.fetchFormConstants();
        setMsg(INIT_MSG);
      } catch (error) {
        setMsg(error.message);
      }
    };

    (async () => await fetchItems())();
  }, []);

  // 2 tasks:
  // when logging in, the Login Page will send a true value to set the isLoggedIn var
  // when forgot password, the component will send the value of the email address to the Login Page via prop
  // how come I don't have to specified dependencies(??), because there is a listener?
  useEffect(() => {
    const onUpdateIsLoggedIn = (isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    };

    const onUpdateEmail = (email) => {
      setEmail(email);
    };

    const isLoggedInListener = appEmitter.addListener(
      "isLoggedIn",
      onUpdateIsLoggedIn
    );

    const forgotPasswordEmailListener = appEmitter.addListener(
      "forgotPasswordEmail",
      onUpdateEmail
    );

    return () => {
      isLoggedInListener.remove();
      forgotPasswordEmailListener.remove();
    };
  }, []);

  useEffect(() => {
    const onAddForm = ({formName, navigate}) => {
      const newForm = {
        formId: nanoid(),
        formName,
        navigate,
      };
      setForms([...forms, newForm]);
    };

    const onDeleteForm = (formId) => {
      localStorage.removeItem(formId);
      setForms((prev) => prev.filter((form) => form.formId !== formId));
    };

    const addFormListener = appEmitter.addListener("addForm", onAddForm);

    const deleteFormListener = appEmitter.addListener(
      "deleteForm",
      onDeleteForm
    );

    return () => {
      addFormListener.remove();
      deleteFormListener.remove();
    };
  }, [forms]);

  return (
    <div className="App">
      <AppMsg msg={msg} />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/" element={<MainPage forms={forms} />} />
              <Route path="/pa1d" element={<ProAm1Dance />} />
              <Route path="/pamulti" element={<ProAmMulti />} />
            </Route>
            <Route path="/login" element={<LoginPage initEmail={email} />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
