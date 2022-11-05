import React from "react";
import NavigationBar from "./NavigationBar";
import FormDisplay from "./FormDisplay";

const MainPage = ({ forms }) => {
  return (
    <div className="container text-center">
      <NavigationBar />
      <FormDisplay forms={forms} />
    </div>
  );
};

export default MainPage;
