import apiClient from "../../apiClient";
import { LOAD_UNREAD_NOTIFICATION_FAIL, LOAD_UNREAD_NOTIFICATION_REQUEST, LOAD_UNREAD_NOTIFICATION_SUCCESS, MARK_READ_NOTIFICATION_FAIL, MARK_READ_NOTIFICATION_REQUEST, MARK_READ_NOTIFICATION_SUCCESS } from "../constants/notificationConstant";

export const loadUnreadNotificationFunc =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_UNREAD_NOTIFICATION_REQUEST });

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
    const { data } = await apiClient.get(
      "admin/notifications/unread",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_UNREAD_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_UNREAD_NOTIFICATION_FAIL,
      payload: error.response.data,
    });
  }
};

export const markAsReadFunc = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: MARK_READ_NOTIFICATION_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.get(`admin/notifications/mark-as-read/${id}`, config);

    dispatch({
      type: MARK_READ_NOTIFICATION_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: MARK_READ_NOTIFICATION_FAIL,
      payload: error.response,
    });
  }
};