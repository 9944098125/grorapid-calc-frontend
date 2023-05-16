import api from "../Api/Api";
import { alertActions } from "./alertActions";
import { RE_CALCULATE_SUCCESS, RE_CALCULATE_FAIL } from "./Types";

export const recalculateAction = (id) => async (dispatch) => {
  try {
    const recalculateResponse = await api.patch(
      `/calculator/re_calculate/${id}`
    );
    if (recalculateResponse) {
      console.log(recalculateResponse);
      dispatch({
        type: RE_CALCULATE_SUCCESS,
        payload: recalculateResponse.data.calculation,
      });
      dispatch(alertActions.success(recalculateResponse.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: RE_CALCULATE_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
