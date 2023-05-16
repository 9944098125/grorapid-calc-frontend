import { combineReducers } from "redux";

import { alert } from "./alertReducer";
import register from "./register";
import login from "./login";
import evaluate from "./evaluate";
import getEvaluations from "./getEvaluations";
import recalculate from "./recalculate";

export default combineReducers({
  alert,
  register,
  login,
  evaluate,
  getEvaluations,
  recalculate,
});
