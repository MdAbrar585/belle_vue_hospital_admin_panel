import apiClient from "../../apiClient";
import {
  CREATE_SPECIAL_DAY_FAIL,
  CREATE_SPECIAL_DAY_REQUEST,
  CREATE_SPECIAL_DAY_SUCCESS,
  DELETE_SPECIAL_DAY_FAIL,
  DELETE_SPECIAL_DAY_REQUEST,
  DELETE_SPECIAL_DAY_SUCCESS,
  LOAD_SPECIAL_DAY_FAIL,
  LOAD_SPECIAL_DAY_REQUEST,
  LOAD_SPECIAL_DAY_SUCCESS,
  SEND_SPECIAL_DAY_FAIL,
  SEND_SPECIAL_DAY_REQUEST,
  SEND_SPECIAL_DAY_SUCCESS,
  UPDATE_SPECIAL_DAY_FAIL,
  UPDATE_SPECIAL_DAY_REQUEST,
  UPDATE_SPECIAL_DAY_SUCCESS,
} from "../constants/specialDayConstant";

export const createSpecialDay = (token, specialDayData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SPECIAL_DAY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/special-days/add-new-special-day`,
      specialDayData,
      config
    );

    dispatch({
      type: CREATE_SPECIAL_DAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SPECIAL_DAY_FAIL,
      payload: error.response.data,
    });
  }
};

export const sendSpecialDayFunc = (token, specialDayData) => async (dispatch) => {
  try {
    dispatch({ type: SEND_SPECIAL_DAY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/special-days/send-special-day-wish`,
      specialDayData,
      config
    );

    dispatch({
      type: SEND_SPECIAL_DAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_SPECIAL_DAY_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadSpecialDay = (token,specialDayData) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_SPECIAL_DAY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    // const datas = {
    //   limit: 8,
    //   page: page,
    // };
    const { data } = await apiClient.post(
      "admin/special-days/all-special-days",specialDayData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_SPECIAL_DAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SPECIAL_DAY_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteSpecialDayfunc = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SPECIAL_DAY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/special-days/delete-special-day/${id}`,datas, config);

    dispatch({
      type: DELETE_SPECIAL_DAY_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SPECIAL_DAY_FAIL,
      payload: error.response,
    });
  }
};

export const updateSpecialDayFunc = (token, partnerData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SPECIAL_DAY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/special-days/edit-special-day/` + id,
      partnerData,
      config
    );

    dispatch({
      type: UPDATE_SPECIAL_DAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SPECIAL_DAY_FAIL,
      payload: error.response.data,
    });
  }
};