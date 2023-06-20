import apiClient from "../../apiClient";
import { GENERATE_CASHOUT_REPORT_FAIL, GENERATE_CASHOUT_REPORT_REQUEST, GENERATE_CASHOUT_REPORT_SUCCESS, GENERATE_CUSTOMER_REPORT_FAIL, GENERATE_CUSTOMER_REPORT_REQUEST, GENERATE_CUSTOMER_REPORT_SUCCESS, GENERATE_PARTNER_REPORT_FAIL, GENERATE_PARTNER_REPORT_REQUEST, GENERATE_PARTNER_REPORT_SUCCESS, GENERATE_USER_REPORT_FAIL, GENERATE_USER_REPORT_REQUEST, GENERATE_USER_REPORT_SUCCESS, LOAD_REPORT_FAIL, LOAD_REPORT_REQUEST, LOAD_REPORT_SUCCESS } from "../constants/reportConstant";

export const generateUserReportFunc = (token,newsData) => async (dispatch) => {
    try {
      dispatch({ type: GENERATE_USER_REPORT_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.get(`internal/export`, config);
  
      dispatch({
        type: GENERATE_USER_REPORT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GENERATE_USER_REPORT_FAIL,
        payload: error.response.data,
      });
    }
};
  
export const generatePartnerReportFunc = (token,newsData) => async (dispatch) => {
  try {
    dispatch({ type: GENERATE_PARTNER_REPORT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(`admin/partners/export`, config);

    dispatch({
      type: GENERATE_PARTNER_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_PARTNER_REPORT_FAIL,
      payload: error.response.data,
    });
  }
};

export const generateCustomerReportFunc = (token) => async (dispatch) => {
  try {
    dispatch({ type: GENERATE_CUSTOMER_REPORT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(`admin/customers/export`, config);

    dispatch({
      type: GENERATE_CUSTOMER_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_CUSTOMER_REPORT_FAIL,
      payload: error.response.data,
    });
  }
};

export const generateCashoutReportFunc = (token, cashoutReportData) => async (dispatch) => {
  try {
    dispatch({ type: GENERATE_CASHOUT_REPORT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/cahsout/export`, cashoutReportData, config);

    dispatch({
      type: GENERATE_CASHOUT_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_CASHOUT_REPORT_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadReportFunc =
  (token, projectData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_REPORT_REQUEST });

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
      "admin/reports/all",
      projectData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_REPORT_FAIL,
      payload: error.response.data,
    });
  }
};