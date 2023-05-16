import React from "react";

function CalculationName({ nameOfCalc, changeCalcName }) {
  return (
    <React.Fragment>
      <div className="calculation-name-container">
        <input
          type="text"
          name="nameOfCalc"
          onChange={changeCalcName}
          value={nameOfCalc}
        />
        <h2>↑</h2>
      </div>
    </React.Fragment>
  );
}

export default CalculationName;
