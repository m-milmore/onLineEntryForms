import React from "react";
import NavigationBar from "./NavigationBar";
import FormDisplay from "./FormDisplay";

const MainPage = () => {
  return (
    <div className="container text-center">
      <NavigationBar />
      <FormDisplay />
    </div>
  );
};

export default MainPage;
