import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { EventEmitter } from "fbemitter";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import Page404 from "./components/Page404";

export const appEmitter = new EventEmitter();

const PrivateRoute = ({ children, isLoggedIn, ...props }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onUpdateIsLoggedIn = (isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    };

    const isLoggedInListener = appEmitter.addListener(
      "isLoggedIn",
      onUpdateIsLoggedIn
    );

    return () => {
      isLoggedInListener.remove();
    };
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
