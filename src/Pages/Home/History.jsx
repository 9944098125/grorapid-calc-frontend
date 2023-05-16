import React from "react";
import { MdOutlineReplay, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { deleteEvaluation, getEvaluations } from "../../Redux/Actions/evaluate";

function History({
  equalClicked,
  setCurrentValue,
  setNameOfCalc,
  setRecalculate,
  equalsClick,
}) {
  const dispatch = useDispatch();
  const calcCollection = useSelector(
    (state) => state.getEvaluations.calcCollection
  );
  // console.log(calcCollection);

  const deleteCalc = (id) => {
    dispatch(deleteEvaluation(id));
    calcCollection && calcCollection.filter((el) => el.id !== id);
  };

  const userId = JSON.parse(localStorage.getItem("user_id"));

  React.useEffect(() => {
    dispatch(getEvaluations(userId));
  }, [calcCollection, dispatch, userId]);

  return (
    <React.Fragment>
      <div className="history-container">
        <div className="flex-history-container">
          {calcCollection ? (
            calcCollection.map((each, idx) => (
              <div key={idx} className="each-item">
                <h4 style={{ textDecoration: "underline" }}>
                  Name:{" "}
                  <span style={{ color: "deeppink" }}>{each.nameOfCalc}</span>
                </h4>
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="operation">
                    {each.calculationLine} = {each.calculatedResult}
                  </h4>
                  <MdOutlineReplay
                    onClick={() => {
                      setCurrentValue(each.calculationLine);
                      setNameOfCalc(each.nameOfCalc);
                      setRecalculate(true);
                      equalsClick(each._id);
                    }}
                    fontSize="25px"
                    style={{ cursor: "pointer" }}
                  />
                  <MdDelete
                    onClick={() => deleteCalc(each._id)}
                    fontSize="25px"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default History;
