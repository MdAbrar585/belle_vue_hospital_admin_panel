import apiClient from "../../apiClient";
import { ADD_NEW_LOUNGE_FAIL, ADD_NEW_LOUNGE_REQUEST, ADD_NEW_LOUNGE_SUCCESS, DELETE_LOUNGE_TIMING_FAIL, DELETE_LOUNGE_TIMING_REQUEST, DELETE_LOUNGE_TIMING_SUCCESS, DELETE_NEW_LOUNGE_FAIL, DELETE_NEW_LOUNGE_REQUEST, DELETE_NEW_LOUNGE_SUCCESS, EDIT_NEW_LOUNGE_FAIL, EDIT_NEW_LOUNGE_REQUEST, EDIT_NEW_LOUNGE_SUCCESS, LOAD_ALL_LOUNGE_LIST_FAIL, LOAD_ALL_LOUNGE_LIST_REQUEST, LOAD_ALL_LOUNGE_LIST_SUCCESS, LOAD_TIMING_BY_LOUNGE_FAIL, LOAD_TIMING_BY_LOUNGE_REQUEST, LOAD_TIMING_BY_LOUNGE_SUCCESS, SET_LOUNGE_TIMING_FAIL, SET_LOUNGE_TIMING_REQUEST, SET_LOUNGE_TIMING_SUCCESS, TOGGLE_LOUNGE_TIMING_FAIL, TOGGLE_LOUNGE_TIMING_REQUEST, TOGGLE_LOUNGE_TIMING_SUCCESS, TOGGLE_NEW_LOUNGE_ACTIVATION_FAIL, TOGGLE_NEW_LOUNGE_ACTIVATION_REQUEST, TOGGLE_NEW_LOUNGE_ACTIVATION_SUCCESS } from "../constants/loungeManagementConstant";

export const loadAllLoungeFunc =
  (token, loungeData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_ALL_LOUNGE_LIST_REQUEST });

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
      type: LOAD_ALL_LOUNGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_ALL_LOUNGE_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const addNewLoungeFunc = (token,loungeData) => async (dispatch) => {
    try {
      dispatch({ type: ADD_NEW_LOUNGE_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(`admin/lounge/add`, loungeData, config);
  
      dispatch({
        type: ADD_NEW_LOUNGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_NEW_LOUNGE_FAIL,
        payload: error.response.data,
      });
    }
};
  
export const editNewLoungeFunc = (token,editedloungeData,id) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_NEW_LOUNGE_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(`admin/lounge/eid/`+ id, editedloungeData, config);
  
      dispatch({
        type: EDIT_NEW_LOUNGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_NEW_LOUNGE_FAIL,
        payload: error.response.data,
      });
    }
};

export const deleteNewLoungeFunc = (token, id,datas = {}) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_NEW_LOUNGE_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await apiClient.post(`admin/lounge/delete/`+id,datas, config);
  
      dispatch({
        type: DELETE_NEW_LOUNGE_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: DELETE_NEW_LOUNGE_FAIL,
        payload: error.response,
      });
    }
};

export const deleteLoungeTimingFunc = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LOUNGE_TIMING_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/lounge/timing/delete-timings/`+id,datas, config);

    dispatch({
      type: DELETE_LOUNGE_TIMING_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LOUNGE_TIMING_FAIL,
      payload: error.response,
    });
  }
};

export const newLoungeActivationToggleFunc = (token,newLoungeActivationId) => async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_NEW_LOUNGE_ACTIVATION_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.get(`admin/lounge/toggle-activation/`+newLoungeActivationId, config);
  
      dispatch({
        type: TOGGLE_NEW_LOUNGE_ACTIVATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOGGLE_NEW_LOUNGE_ACTIVATION_FAIL,
        payload: error.response.data,
      });
    }
};

export const loungeTimingToggleFunc = (token,loungeTimingId) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_LOUNGE_TIMING_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(`admin/lounge/timing/toggle-timings/`+loungeTimingId, config);

    dispatch({
      type: TOGGLE_LOUNGE_TIMING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_LOUNGE_TIMING_FAIL,
      payload: error.response.data,
    });
  }
};
  
export const loadTimingByLoungeFunc =
  (token,id) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_TIMING_BY_LOUNGE_REQUEST });

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
      "admin/lounge/timing/get-timings-by-lounge/"+ id,
      
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_TIMING_BY_LOUNGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_TIMING_BY_LOUNGE_FAIL,
      payload: error.response.data,
    });
  }
};

export const setLoungeTimingFunc = (token,loungeTimingData) => async (dispatch) => {
    try {
      dispatch({ type: SET_LOUNGE_TIMING_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(`admin/lounge/timing/set-timings`, loungeTimingData, config);
  
      dispatch({
        type: SET_LOUNGE_TIMING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_LOUNGE_TIMING_FAIL,
        payload: error.response.data,
      });
    }
};