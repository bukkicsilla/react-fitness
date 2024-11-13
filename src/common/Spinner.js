import React from "react";
import "./Spinner.css";

/** Loading message used by components that fetch API data. */

const Spinner = () => {
  return (
    <div id="loading-spinner">
      <h1 className="centered">Loading...</h1>
      <div className="centered">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
