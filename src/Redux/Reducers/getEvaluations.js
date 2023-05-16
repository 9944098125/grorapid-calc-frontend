import {
  GET_EVALUATIONS_SUCCESS,
  GET_EVALUATIONS_FAIL,
} from "../Actions/Types";

const initialState = {
  calcCollection: [],
  failMessage: "",
};

export default function getEvaluations(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVALUATIONS_SUCCESS:
      return {
        ...state,
        calcCollection: payload,
      };
    case GET_EVALUATIONS_FAIL:
      return {
        ...state,
        failMessage: payload,
      };
    default:
      return state;
  }
}
