import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "../Actions/Types";

const initialState = {
  loading: false,
  user: null,
  failMessage: "",
};

export default function register(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTRATION_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    default:
      return state;
  }
}
