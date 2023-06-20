import apiClient from "../../apiClient";
import { APPROVE_CUSTOMER_FAIL, APPROVE_CUSTOMER_REQUEST, APPROVE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_FAIL, CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_TYPE_FAIL, CREATE_CUSTOMER_TYPE_REQUEST, CREATE_CUSTOMER_TYPE_SUCCESS, DECLINE_CUSTOMER_FAIL, DECLINE_CUSTOMER_REQUEST, DECLINE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL, DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, LOAD_CONCERN_TYPE_FAIL, LOAD_CONCERN_TYPE_REQUEST, LOAD_CONCERN_TYPE_SUCCESS, LOAD_CUSTOMER_DETAILS_FAIL, LOAD_CUSTOMER_DETAILS_REQUEST, LOAD_CUSTOMER_DETAILS_SUCCESS, LOAD_CUSTOMER_FAIL, LOAD_CUSTOMER_REQUEST, LOAD_CUSTOMER_SUCCESS, LOAD_CUSTOMER_TYPE_FAIL, LOAD_CUSTOMER_TYPE_REQUEST, LOAD_CUSTOMER_TYPE_SUCCESS, UPDATE_CUSTOMER_FAIL, UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPLOAD_CUSTOMER_DATA_FAIL, UPLOAD_CUSTOMER_DATA_REQUEST, UPLOAD_CUSTOMER_DATA_SUCCESS } from "../constants/customerConstant";

export const loadCustomer =
  (token, customerData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CUSTOMER_REQUEST });

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
      "admin/customers/all-customers",
      customerData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CUSTOMER_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCustomerSearch =
  (token, customerData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CUSTOMER_REQUEST });

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
      "admin/customers/all-customers",
      customerData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CUSTOMER_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadConcernTypeFunc =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CONCERN_TYPE_REQUEST });

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
      "admin/concerns/all-concern-types",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CONCERN_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CONCERN_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCustomerDetailsFunc =
  (token,id) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CUSTOMER_DETAILS_REQUEST });

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
      "admin/customers/get-customer-by-id/" + id,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CUSTOMER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CUSTOMER_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCustomerType =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_CUSTOMER_TYPE_REQUEST });

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
      "admin/customers/all-customer-types",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CUSTOMER_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CUSTOMER_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const createCustomer = (token,userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CUSTOMER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/customers/add-customer`, userData, config);

    dispatch({
      type: CREATE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CUSTOMER_FAIL,
      payload: error.response.data,
    });
  }
};

export const createCustomerType = (token,customerType) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CUSTOMER_TYPE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/customers/add-customer-type`, customerType, config);

    dispatch({
      type: CREATE_CUSTOMER_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CUSTOMER_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const approveCustomer = (token,customerId,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_CUSTOMER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/customers/approve-customer/`+customerId,datas, config);

    dispatch({
      type: APPROVE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_CUSTOMER_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete Customer
export const declineCustomer = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DECLINE_CUSTOMER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/customers/decline-customer/${id}`,datas, config);

    dispatch({
      type: DECLINE_CUSTOMER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DECLINE_CUSTOMER_FAIL,
      payload: error.response,
    });
  }
};

// Delete Customer
export const deleteCustomers = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CUSTOMER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/customers/soft-delete-customer/${id}`,datas, config);

    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER_FAIL,
      payload: error.response,
    });
  }
};

export const uploadCustomerFromCsv = (token,customerCsvFile) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_CUSTOMER_DATA_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        accesscontrolalloworigin: "*",
      },
    };

    const { data } = await apiClient.post(`admin/customers/upload-customer-data`, customerCsvFile, config);

    dispatch({
      type: UPLOAD_CUSTOMER_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_CUSTOMER_DATA_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateCustomer = (token,userData,id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/customers/edit-customer/` + id, userData, config);

    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: error.response.data,
    });
  }
};