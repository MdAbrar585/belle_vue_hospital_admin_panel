import apiClient from "../../apiClient";
import { BOOK_MEETING_FAIL, BOOK_MEETING_REQUEST, BOOK_MEETING_SUCCESS, DELETE_MEETING_FAIL, DELETE_MEETING_REQUEST, DELETE_MEETING_SUCCESS, GET_ALL_LOUNGE_FAIL, GET_ALL_LOUNGE_REQUEST, GET_ALL_LOUNGE_SUCCESS, GET_DATE_WISE_MEETING_FAIL, GET_DATE_WISE_MEETING_REQUEST, GET_DATE_WISE_MEETING_SUCCESS, GET_FREE_LOUNGE_TIMING_FAIL, GET_FREE_LOUNGE_TIMING_REQUEST, GET_FREE_LOUNGE_TIMING_SUCCESS } from "../constants/meetingManagementConstant";

export const getAllLoungeFunc =
  (token, loungeData) =>
async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LOUNGE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      },
    };
    // const datas = {
    //   limit: 8,
    //   page: page,
    // };
    const { data } = await apiClient.post(
      "admin/lounge/all",
      loungeData,
      config
    );
    // console.log(data);

    dispatch({
      type: GET_ALL_LOUNGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_LOUNGE_FAIL,
      payload: error.response.data,
    });
  }
};

export const getFreeLoungeTimingFunc =
  (token, loungeData, id) =>
async (dispatch) => {
  try {
    dispatch({ type: GET_FREE_LOUNGE_TIMING_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      },
    };
    // const datas = {
    //   limit: 8,
    //   page: page,
    // };
    const { data } = await apiClient.post(
      "common/meetings/get-free-timings-of-lounge/" + id,
      loungeData,
      config
    );
    // console.log(data);

    dispatch({
      type: GET_FREE_LOUNGE_TIMING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FREE_LOUNGE_TIMING_FAIL,
      payload: error.response.data,
    });
  }
};

export const bookMeetingFunc = (token,bookMeetingData) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_MEETING_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/meetings/book-a-meeting`, bookMeetingData, config);

    dispatch({
      type: BOOK_MEETING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_MEETING_FAIL,
      payload: error.response.data,
    });
  }
};

export const cancelMeetingFunc = (token,id,cancelMeetingData) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_MEETING_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/meetings/cancel/`+id, cancelMeetingData, config);

    dispatch({
      type: BOOK_MEETING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_MEETING_FAIL,
      payload: error.response.data,
    });
  }
};

export const getDateWiseMeetingFunc =
  (token, meetingData) =>
async (dispatch) => {
  try {
    dispatch({ type: GET_DATE_WISE_MEETING_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      },
    };
    // const datas = {
    //   limit: 8,
    //   page: page,
    // };
    const { data } = await apiClient.post(
      "admin/meetings/get-date-wise-meetings",
      meetingData,
      config
    );
    // console.log(data);

    dispatch({
      type: GET_DATE_WISE_MEETING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DATE_WISE_MEETING_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteMeetingFunc = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MEETING_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/meetings/cancel/`+id,datas, config);

    dispatch({
      type: DELETE_MEETING_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MEETING_FAIL,
      payload: error.response,
    });
  }
};