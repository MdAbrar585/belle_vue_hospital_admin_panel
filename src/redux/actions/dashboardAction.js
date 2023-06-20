import apiClient from "../../apiClient";
import { LOAD_DASHBOARD_FAIL, LOAD_DASHBOARD_REQUEST, LOAD_DASHBOARD_SUCCESS } from "../constants/dashboardConstant";

export const loadDashboardFunc =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_DASHBOARD_REQUEST });

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
      "admin/dashboard/index",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_DASHBOARD_FAIL,
      payload: error.response.data,
    });
  }
};
