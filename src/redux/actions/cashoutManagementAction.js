import apiClient from "../../apiClient";
import { APPROVE_CASHOUT_REQ_FAIL, APPROVE_CASHOUT_REQ_REQUEST, APPROVE_CASHOUT_REQ_SUCCESS, CREATE_CASHOUT_OPTION_FAIL, CREATE_CASHOUT_OPTION_REQUEST, CREATE_CASHOUT_OPTION_SUCCESS, DECLINE_CASHOUT_REQ_FAIL, DECLINE_CASHOUT_REQ_REQUEST, DECLINE_CASHOUT_REQ_SUCCESS, DELETE_CASHOUT_OPTION_FAIL, DELETE_CASHOUT_OPTION_REQUEST, DELETE_CASHOUT_OPTION_SUCCESS, DISBURSE_CASHOUT_REQ_FAIL, DISBURSE_CASHOUT_REQ_REQUEST, DISBURSE_CASHOUT_REQ_SUCCESS, LOAD_CASHOUT_APPROVAL_LIST_FAIL, LOAD_CASHOUT_APPROVAL_LIST_REQUEST, LOAD_CASHOUT_APPROVAL_LIST_SUCCESS, LOAD_CASHOUT_DECLINE_LIST_FAIL, LOAD_CASHOUT_DECLINE_LIST_REQUEST, LOAD_CASHOUT_DECLINE_LIST_SUCCESS, LOAD_CASHOUT_DISBURSE_LIST_FAIL, LOAD_CASHOUT_DISBURSE_LIST_REQUEST, LOAD_CASHOUT_DISBURSE_LIST_SUCCESS, LOAD_CASHOUT_OPTION_LIST_FAIL, LOAD_CASHOUT_OPTION_LIST_REQUEST, LOAD_CASHOUT_OPTION_LIST_SUCCESS, LOAD_CASHOUT_REQ_LIST_FAIL, LOAD_CASHOUT_REQ_LIST_REQUEST, LOAD_CASHOUT_REQ_LIST_SUCCESS } from "../constants/cashoutManagementConstant";

export const loadCashoutReqListFunc =
  (token,datas = {}) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CASHOUT_REQ_LIST_REQUEST });

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
      "admin/cahsout/request-list",
      datas,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CASHOUT_REQ_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CASHOUT_REQ_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCashoutApprovalListFunc =
  (token,datas = {}) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CASHOUT_APPROVAL_LIST_REQUEST });

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
      "admin/cahsout/approved-list",
      datas,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CASHOUT_APPROVAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CASHOUT_APPROVAL_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCashoutDisburseListFunc =
  (token,datas = {}) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CASHOUT_DISBURSE_LIST_REQUEST });

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
      "admin/cahsout/disbursed-list",
      datas,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CASHOUT_DISBURSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CASHOUT_DISBURSE_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCashoutDeclineListFunc =
  (token,datas = {}) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CASHOUT_DECLINE_LIST_REQUEST });

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
      "admin/cahsout/declined-list",
      datas,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CASHOUT_DECLINE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CASHOUT_DECLINE_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const approveCashoutReqFunc = (token,cashoutReqId) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_CASHOUT_REQ_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(`admin/cahsout/approve-request/`+cashoutReqId, config);

    dispatch({
      type: APPROVE_CASHOUT_REQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_CASHOUT_REQ_FAIL,
      payload: error.response.data,
    });
  }
};

export const declineCashoutReqFunc = (token,cashoutReqId) => async (dispatch) => {
  try {
    dispatch({ type: DECLINE_CASHOUT_REQ_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(`admin/cahsout/decline-request/`+cashoutReqId, config);

    dispatch({
      type: DECLINE_CASHOUT_REQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DECLINE_CASHOUT_REQ_FAIL,
      payload: error.response.data,
    });
  }
};

export const disburseCashoutReqFunc = (token,cashoutReqId,disburseCashoutReqData) => async (dispatch) => {
  try {
    dispatch({ type: DISBURSE_CASHOUT_REQ_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/cahsout/disburse-request/`+cashoutReqId, disburseCashoutReqData, config);

    dispatch({
      type: DISBURSE_CASHOUT_REQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISBURSE_CASHOUT_REQ_FAIL,
      payload: error.response.data,
    });
  }
};

export const createCashoutOptionFunc = (token,userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CASHOUT_OPTION_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/cahsout/options/add`, userData, config);

    dispatch({
      type: CREATE_CASHOUT_OPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CASHOUT_OPTION_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCashoutOptionListFunc =
  (token = {}) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CASHOUT_OPTION_LIST_REQUEST });

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
      "admin/cahsout/options/all",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CASHOUT_OPTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CASHOUT_OPTION_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteCashoutOptionFunc = (token,cashoutOptionId,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CASHOUT_OPTION_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/cahsout/options/delete/`+cashoutOptionId,datas, config);

    dispatch({
      type: DELETE_CASHOUT_OPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CASHOUT_OPTION_FAIL,
      payload: error.response.data,
    });
  }
};