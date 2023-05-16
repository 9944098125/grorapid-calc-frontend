import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

export const register = (data) => async (dispatch) => {
  dispatch({
    type: REGISTRATION_START,
  });
  try {
    const registrationResponse = await api.post("/auth/register", data);
    if (registrationResponse) {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: registrationResponse.data.user,
      });
      dispatch(alertActions.success(registrationResponse.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log("Registration error in frontend: ", err);
    dispatch({
      type: REGISTRATION_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
