import React from 'react';
import "./assets/scss/themes.scss";
import Route from 'Routes/Index';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <React.Fragment>
      <Route />
      <ToastContainer  />
    </React.Fragment>

  );
}

export default App;