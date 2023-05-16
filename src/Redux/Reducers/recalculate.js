import { RE_CALCULATE_SUCCESS, RE_CALCULATE_FAIL } from "../Actions/Types";

const initialState = {
  calc: {},
  loading: true,
  failMessage: "",
};

export default function recalculate(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RE_CALCULATE_SUCCESS:
      return {
        ...state,
        loading: false,
        calc: payload,
      };
    case RE_CALCULATE_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    default:
      return state;
  }
}
