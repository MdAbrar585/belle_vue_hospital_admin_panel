import apiClient from "../../apiClient";
import { CREATE_VENDOR_FAIL, CREATE_VENDOR_REQUEST, CREATE_VENDOR_SUCCESS, CREATE_VENDOR_TYPE_FAIL, CREATE_VENDOR_TYPE_REQUEST, CREATE_VENDOR_TYPE_SUCCESS, LOAD_POINT_HISTORY_DETAILS_FAIL, LOAD_POINT_HISTORY_DETAILS_REQUEST, LOAD_POINT_HISTORY_DETAILS_SUCCESS, LOAD_POINT_LIST_FAIL, LOAD_POINT_LIST_REQUEST, LOAD_POINT_LIST_SUCCESS, LOAD_TOTAL_CASHOUT_POINT_FAIL, LOAD_TOTAL_CASHOUT_POINT_REQUEST, LOAD_TOTAL_CASHOUT_POINT_SUCCESS, LOAD_VENDOR_LIST_FAIL, LOAD_VENDOR_LIST_REQUEST, LOAD_VENDOR_LIST_SUCCESS, LOAD_VENDOR_TYPE_FAIL, LOAD_VENDOR_TYPE_REQUEST, LOAD_VENDOR_TYPE_SUCCESS } from "../constants/pointManagerConstant";

export const loadPointListDataFunc =
  (token, pointListData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_POINT_LIST_REQUEST });

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
      "admin/point-manager/point-list",
      pointListData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_POINT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_POINT_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadPointHistoryDetailsFunc =
  (token,id) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_POINT_HISTORY_DETAILS_REQUEST });

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
      "admin/point-manager/point-history-by-id/" + id,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_POINT_HISTORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_POINT_HISTORY_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const createVendorFunc = (token,vendorData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_VENDOR_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/vendors/add-vendor`, vendorData, config);

    dispatch({
      type: CREATE_VENDOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_VENDOR_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadVendorListDataFunc =
  (token, vendorListData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_VENDOR_LIST_REQUEST });

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
      "admin/vendors/all-vendors",
      vendorListData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_VENDOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_VENDOR_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const createVendorTypeFunc = (token,vendorData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_VENDOR_TYPE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/vendors/add-vendor-type`, vendorData, config);

    dispatch({
      type: CREATE_VENDOR_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_VENDOR_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadVendorTypeDataFunc =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_VENDOR_TYPE_REQUEST });

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
      "admin/vendors/all-vendor-types",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_VENDOR_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_VENDOR_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadTotalCashoutPointDataFunc =
  (token, datas={}) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_TOTAL_CASHOUT_POINT_REQUEST });

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
      "admin/cahsout/total-cashout-amounts",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_TOTAL_CASHOUT_POINT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_TOTAL_CASHOUT_POINT_FAIL,
      payload: error.response.data,
    });
  }
};