import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthService, EntriesService } from "./services";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { EventEmitter } from "fbemitter";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ProAm1Dance from "./components/ProAm1Dance";
import Page404 from "./components/Page404";
import AppMsg from "./components/AppMsg";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(""); // to pass email of forgotpassword to login page via listener
  const [msg, setMsg] = useState(INIT_MSG);

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

  // when logging in, the Login Page will send a true value to set the isLoggedIn var
  // when forgot password, the component will send the value of the email address to Login Page via prop
  // how come I don't have to specified dependencies(??)
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

  return (
    <div className="App">
      <AppMsg msg={msg} />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/pa1d" element={<ProAm1Dance />} />
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
