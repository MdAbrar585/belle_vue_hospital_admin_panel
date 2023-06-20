import apiClient from "../../apiClient";
import { CREATE_DESIGNATION_FAIL, CREATE_DESIGNATION_REQUEST, CREATE_DESIGNATION_SUCCESS, CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_TYPE_FAIL, CREATE_USER_TYPE_REQUEST, CREATE_USER_TYPE_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, LOAD_DESIGNATION_FAIL, LOAD_DESIGNATION_REQUEST, LOAD_DESIGNATION_SUCCESS, LOAD_INTERNAL_USER_BY_ID_FAIL, LOAD_INTERNAL_USER_BY_ID_REQUEST, LOAD_INTERNAL_USER_BY_ID_SUCCESS, LOAD_INTERNAL_USER_FAIL, LOAD_INTERNAL_USER_REQUEST, LOAD_INTERNAL_USER_SUCCESS, LOAD_USER_TYPE_FAIL, LOAD_USER_TYPE_REQUEST, LOAD_USER_TYPE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../constants/userConstant";

export const loadInternalUserData =
  (token, userData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_INTERNAL_USER_REQUEST });

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
      "internal/all-users",
      userData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_INTERNAL_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_INTERNAL_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const createUser = (token,userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`internal/add-user`, userData, config);

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateUsers = (token,userData,id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`internal/edit-user/` + id, userData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadUserType =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_TYPE_REQUEST });

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
      "internal/all-user-types",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_USER_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const createDesignationFunc = (token,designaton) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DESIGNATION_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`internal/add-designation`, designaton, config);

    dispatch({
      type: CREATE_DESIGNATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_DESIGNATION_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadDesignation =
  (token) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_DESIGNATION_REQUEST });

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
      "internal/all-designations",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_DESIGNATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_DESIGNATION_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete User
export const deleteUsers = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`internal/soft-delete-user/${id}`,datas, config);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response,
    });
  }
};

export const createUserTypeFunc = (token,customerType) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_TYPE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`internal/add-user-type`, customerType, config);

    dispatch({
      type: CREATE_USER_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadUserDetailsFunc =
  (token, id) => async (dispatch) => {
    try {
      dispatch({ type: LOAD_INTERNAL_USER_BY_ID_REQUEST });

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
      const { data } = await apiClient.get(
        "internal/get-user-by-id/" + id,
        config
      );
      // console.log(data);

      dispatch({
        type: LOAD_INTERNAL_USER_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_INTERNAL_USER_BY_ID_FAIL,
        payload: error.response.data,
      });
    }
  };