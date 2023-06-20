import apiClient from "../../apiClient";
import { LOAD_ALL_SETTINGS_FAIL, LOAD_ALL_SETTINGS_REQUEST, LOAD_ALL_SETTINGS_SUCCESS, TOGGLE_LOUNGE_MEETING_FAIL, TOGGLE_LOUNGE_MEETING_REQUEST, TOGGLE_LOUNGE_MEETING_SUCCESS } from "../constants/settingsConstant";

export const loadAllSettingsFunc =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_ALL_SETTINGS_REQUEST });

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
      "admin/settings/all",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_ALL_SETTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_ALL_SETTINGS_FAIL,
      payload: error.response.data,
    });
  }
};

export const toggleLoungeMeetingSettingFunc = (token) => async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_LOUNGE_MEETING_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.get(`admin/settings/toggle-lounge-meeting-setting`, config);
  
      dispatch({
        type: TOGGLE_LOUNGE_MEETING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOGGLE_LOUNGE_MEETING_FAIL,
        payload: error.response.data,
      });
    }
};