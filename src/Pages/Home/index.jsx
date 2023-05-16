import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Buttons from "../../Components/Buttons";
import History from "./History";
import "./styles.css";
import { evaluate } from "../../Redux/Actions/evaluate";
import { recalculateAction } from "../../Redux/Actions/recalculate";
import AlertModal from "../../Components/AlertModal";
import { getEvaluations } from "../../Redux/Actions/evaluate";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isActivated = localStorage.getItem("is_activated");
  const user = localStorage.getItem("user");

  const alert = useSelector((state) => state.alert);

  const [currentValue, setCurrentValue] = React.useState("0");
  const [preValue, setPreValue] = React.useState(null);
  const [operator, setOperator] = React.useState(null);
  const [nameOfCalc, setNameOfCalc] = React.useState("");
  const [equalClicked, setEqualClicked] = React.useState(false);
  const [recalculate, setRecalculate] = React.useState(false);

  function digitClick(digit) {
    setCurrentValue((pre) => (pre === "0" ? digit : pre + digit));
    setEqualClicked(false);
  }

  function decimalClick() {
    if (!currentValue.includes(".")) {
      setCurrentValue((pre) => pre + ".");
    }
    setEqualClicked(false);
  }

  function operatorClick(operator) {
    setPreValue(currentValue);
    setOperator(operator);
    setCurrentValue((pre) => pre + operator);
    setEqualClicked(false);
  }

  function acClick() {
    setCurrentValue("0");
    setPreValue(null);
    setOperator(null);
    setEqualClicked(false);
  }

  function changeCalcName(e) {
    setNameOfCalc(e.target.value);
  }

  const evaluateReducer = useSelector((state) => state.evaluate);
  // console.log(reducerResult);
  const recalculateReducer = useSelector((state) => state.recalculate);

  function equalsClick(id) {
    if (!recalculate) {
      setEqualClicked(true);
      const body = {
        userId: JSON.parse(localStorage.getItem("user_id")),
        operation: currentValue,
        nameOfCalc: nameOfCalc,
      };
      dispatch(evaluate(body));
      if ((evaluateReducer.result = eval(currentValue))) {
        setCurrentValue(evaluateReducer.result);
      }
      // console.log(evaluateReducer.result);
      setPreValue(null);
      setOperator(null);
      setNameOfCalc("");
    } else {
      dispatch(recalculateAction(id));
      if ((recalculateReducer.calc.calculatedResult = eval(currentValue))) {
        setCurrentValue(recalculateReducer.calc.calculatedResult);
        setPreValue(null);
        setOperator(null);
        setNameOfCalc("");
        setRecalculate(false);
      }
    }
  }

  const userId = JSON.parse(localStorage.getItem("user_id"));

  React.useEffect(() => {
    dispatch(getEvaluations(userId));
    setTimeout(() => {
      setCurrentValue("0");
    }, 2000);
  }, [userId, dispatch, equalClicked]);

  React.useEffect(() => {
    if (!isActivated || !user) {
      navigate("/login", { replace: true });
    }
  }, [isActivated, navigate, user]);

  return (
    <React.Fragment>
      <div className="home_container">
        {alert.message && <AlertModal show={true} />}
        <Buttons
          currentValue={currentValue}
          digitClick={digitClick}
          decimalClick={decimalClick}
          acClick={acClick}
          operatorClick={operatorClick}
          equalsClick={equalsClick}
          nameOfCalc={nameOfCalc}
          changeCalcName={changeCalcName}
        />
        <History
          setNameOfCalc={setNameOfCalc}
          setCurrentValue={setCurrentValue}
          equalClicked={equalClicked}
          setRecalculate={setRecalculate}
          equalsClick={equalsClick}
        />
      </div>
    </React.Fragment>
  );
}
