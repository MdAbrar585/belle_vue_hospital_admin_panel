import apiClient from "../../apiClient";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESTRICTED_USER,
} from "../constants/authenticationConstant";

export const login = (loginInformation) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { Accept: "application/json" } };
    const { data } = await apiClient.post("login", loginInformation, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem(
              "loggedInUser",
              JSON.stringify({ ...data})
            );
      console.log("Login Function", data);
    //   if (data.user_category.id !== 1) {
    //     dispatch({
    //       type: RESTRICTED_USER,
    //       payload: "UnAuthorize User",
    //     });
    //   } else {
    //     localStorage.setItem(
    //       "loggedInUser",
    //       JSON.stringify({ ...data})
    //     );
    //     dispatch({
    //       type: LOGIN_SUCCESS,
    //       payload: data,
    //     });
    //   }
  } catch (error) {
    console.log("Login Error", error.response.data.message);
    if (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data,
      });
    }
  }
};
