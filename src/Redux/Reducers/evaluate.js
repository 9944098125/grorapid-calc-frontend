import {
  EVALUATE_START,
  EVALUATE_SUCCESS,
  EVALUATE_FAIL,
} from "../Actions/Types";

const initialState = {
  result: "",
  loading: false,
  failMessage: "",
};

export default function evaluate(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case EVALUATE_START:
      return {
        ...state,
        loading: true,
      };
    case EVALUATE_SUCCESS:
      return {
        ...state,
        loading: false,
        result: payload,
      };
    case EVALUATE_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    default:
      return state;
  }
}
