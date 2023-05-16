import api from "../Api/Api";
import {
  EVALUATE_START,
  EVALUATE_SUCCESS,
  EVALUATE_FAIL,
  GET_EVALUATIONS_SUCCESS,
  GET_EVALUATIONS_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from "./Types";
import { alertActions } from "./alertActions";

export const evaluate = (body) => async (dispatch) => {
  try {
    dispatch({
      type: EVALUATE_START,
    });
    const evaluationResponse = await api.post(
      "/calculator/post-evaluation",
      body
    );
    if (evaluationResponse) {
      console.log(evaluationResponse);
      dispatch({
        type: EVALUATE_SUCCESS,
        payload: evaluationResponse.data.result.calculatedResult,
      });
    }
  } catch (err) {
    dispatch({
      type: EVALUATE_FAIL,
      payload: err.response.data.message,
    });
    console.log(err);
    dispatch(alertActions.error(err.response.data.message.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const getEvaluations = (userId) => async (dispatch) => {
  try {
    const getResponse = await api.get(`/calculator/get-evaluations/${userId}`);
    if (getResponse) {
      dispatch({
        type: GET_EVALUATIONS_SUCCESS,
        payload: getResponse.data.calculations,
      });
      // console.log(getResponse);
    }
  } catch (err) {
    dispatch({
      type: GET_EVALUATIONS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteEvaluation = (id) => async (dispatch) => {
  try {
    const deleteResponse = await api.delete(
      "/calculator/delete-evaluation/" + id
    );
    if (deleteResponse) {
      dispatch({
        type: DELETE_SUCCESS,
        payload: deleteResponse.data.message,
      });
      dispatch(alertActions.success(deleteResponse.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: DELETE_FAIL,
      payload: err.response.data.message,
    });
    console.log(err);
    dispatch(alertActions.error(err.response.data.message.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
