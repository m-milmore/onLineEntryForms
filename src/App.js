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
import Summary from "./components/Summary/Summary";
import Success from "./components/Success/Success";
import Page404 from "./components/Page404";
// import AppMsg from "./components/Utils/AppMsg";
// import { INIT_MSG } from "./constants";

const authService = new AuthService();
const entriesService = new EntriesService(authService.getBearerHeader);
export const UserContext = createContext();
export const FormsContext = createContext();
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

const FORMS_INIT = [
  {
    formId: nanoid(),
    formName: "Pro/Am 1 Danse",
    navigate: "/pa1d",
    formSubmittable: false,
    idSection: {
      studio: "Wow!",
      city: "Québec",
      state: "Québec",
      stateAbbrev: "QC",
      phone: "212-321-6547",
      email: "z@z.com",
      teacherFirstName: "Ed",
      teacherLastName: "Eckell",
      member: "654321",
      studentFirstName: "Faith",
      studentLastName: "Flash",
      studentGender: "F",
    },
    entries: [
      {
        entryId: nanoid(),
        level: "",
        age: "",
        ageType: -1,
        syllabus: "fermé",
        category: "single",
        categories: [],
      },
      {
        entryId: nanoid(),
        level: "",
        age: "",
        ageType: -1,
        syllabus: "ouvert",
        category: "single",
        categories: [],
      },
    ],
  },
  {
    formId: nanoid(),
    formName: "Pro/Am Multi Danse",
    navigate: "/pamulti",
    formSubmittable: false,
    idSection: {
      studio: "One Studio",
      city: "Rochester",
      state: "New York",
      stateAbbrev: "NY",
      phone: "323-987-6541",
      email: "y@y.com",
      teacherFirstName: "Fred",
      teacherLastName: "Frickle",
      member: "222333",
      studentFirstName: "Gail",
      studentLastName: "Wind",
      studentGender: "F",
    },
    entries: [
      {
        entryId: nanoid(),
        level: "",
        age: "All",
        ageType: 1,
        syllabus: "ouvert",
        category: "solo",
        dance: "",
        danceStyle: "",
      },
    ],
  },
  {
    formId: nanoid(),
    formName: "Sommaire",
    navigate: "/summary",
    formSubmittable: false,
    items: [
      { name: "single1", quantity: 0 },
      { name: "champ1", quantity: 0 },
      { name: "schol1", quantity: 0 },
      { name: "single0", quantity: 0 },
      { name: "champ0", quantity: 0 },
      { name: "schol0", quantity: 0 },
      { name: "solo1", quantity: 0 },
      { name: "friday1", quantity: 0 },
      { name: "friday2", quantity: 0 },
      { name: "friday0", quantity: 0 },
      { name: "saturday1", quantity: 0 },
      { name: "saturday2", quantity: 0 },
      { name: "saturday0", quantity: 0 },
      { name: "sunday1", quantity: 0 },
      { name: "sunday0", quantity: 0 },
    ],
  },
];

const FormsProvider = ({ children }) => {
  const [forms, setForms] = useState(() => {
    const data = localStorage.getItem("forms");
    if (data) return JSON.parse(data);
    return FORMS_INIT;
  });

  useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(forms));
  }, [forms]);

  return (
    <FormsContext.Provider value={{ forms, setForms }}>
      {children}
    </FormsContext.Provider>
  );
};

const PrivateRoute = ({ children, isLoggedIn, ...props }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState(""); // to pass email of forgotpassword to login page via listener
  // const [msg, setMsg] = useState(INIT_MSG);

  // fetches form constants
  // useEffect(() => {
  //   setMsg("loading data...");

  //   const fetchItems = async () => {
  //     try {
  //       await entriesService.fetchFormConstants();
  //       setMsg(INIT_MSG);
  //     } catch (error) {
  //       setMsg(error.message);
  //     }
  //   };

  //   (async () => await fetchItems())();
  // }, []);

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

  return (
    <div className="App">
      {/* <AppMsg msg={msg} /> */}
      <AuthProvider>
        <FormsProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<PrivateRoute isLoggedIn={isLoggedIn} />}
              >
                <Route path="/" element={<MainPage />} />
                <Route path="/pa1d" element={<ProAm1Dance />} />
                <Route path="/pamulti" element={<ProAmMulti />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/success" element={<Success />} />
              </Route>
              <Route path="/login" element={<LoginPage initEmail={email} />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/*" element={<Page404 />} />
            </Routes>
          </Router>
        </FormsProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
