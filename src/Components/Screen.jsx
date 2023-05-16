import React from "react";
import { useSelector } from "react-redux";

function Screen({ currentValue }) {
  const evaluateResult = useSelector((state) => state.evaluate);

  return (
    <React.Fragment>
      <div className="screen-container">
        <input
          type="text"
          value={evaluateResult.loading ? "..." : currentValue}
          readOnly
          aria-label=""
        />
      </div>
    </React.Fragment>
  );
}

export default Screen;
