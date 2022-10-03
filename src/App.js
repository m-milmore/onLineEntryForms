import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthService } from "./services";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { EventEmitter } from "fbemitter";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import Page404 from "./components/Page404";

const authService = new AuthService();
export const UserContext = createContext();
export const appEmitter = new EventEmitter();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

const PrivateRoute = ({ children, isLoggedIn, ...props }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
              <Route path="/" element={<MainPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
