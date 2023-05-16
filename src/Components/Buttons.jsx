import React from "react";
import Screen from "./Screen";
import CalculationName from "./CalculationName";
import { useSelector } from "react-redux";

function Buttons(props) {
  const {
    currentValue,
    digitClick,
    acClick,
    decimalClick,
    operatorClick,
    equalsClick,
    nameOfCalc,
    changeCalcName,
  } = props;
  return (
    <React.Fragment>
      <div className="whole-buttons-container">
        <Screen currentValue={currentValue} />
        <div className="buttons-grid">
          <button className="btn btn-danger" onClick={acClick}>
            AC
          </button>
          <button
            className="btn btn-warning"
            onClick={() => operatorClick("-")}
          >
            +/-
          </button>
          <button
            className="btn btn-warning"
            onClick={() => operatorClick("%")}
          >
            %
          </button>
          <button
            className="btn btn-success"
            onClick={() => operatorClick("/")}
          >
            ÷
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("7")}>
            7
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("8")}>
            8
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("9")}>
            9
          </button>
          <button
            className="btn btn-success"
            onClick={() => operatorClick("*")}
          >
            x
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("4")}>
            4
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("5")}>
            5
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("6")}>
            6
          </button>
          <button
            className="btn btn-success"
            onClick={() => operatorClick("-")}
          >
            -
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("1")}>
            1
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("2")}>
            2
          </button>
          <button className="btn btn-dark" onClick={() => digitClick("3")}>
            3
          </button>
          <button
            className="btn btn-success"
            onClick={() => operatorClick("+")}
          >
            +
          </button>
        </div>
        <div className="last-row">
          <button className="btn btn-dark zero" onClick={() => digitClick("0")}>
            0
          </button>
          <button className="btn btn-dark dot" onClick={decimalClick}>
            .
          </button>
          <button className="btn btn-success equals" onClick={equalsClick}>
            =
          </button>
        </div>
        <CalculationName
          nameOfCalc={nameOfCalc}
          changeCalcName={changeCalcName}
        />
      </div>
    </React.Fragment>
  );
}

export default Buttons;
