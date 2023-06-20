import apiClient from "../../apiClient";
import { CREATE_PROJECT_FAIL, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, LOAD_PROJECT_FAIL, LOAD_PROJECT_REQUEST, LOAD_PROJECT_SUCCESS, UPDATE_PROJECT_FAIL, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS } from "../constants/projectConstant";

export const loadProject =
  (token, projectData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_PROJECT_REQUEST });

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
      "admin/concerns/all-concerns",
      projectData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const createProject = (token,projectData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PROJECT_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(`admin/concerns/add-concern`, projectData, config);
  
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PROJECT_FAIL,
        payload: error.response.data,
      });
    }
};

export const updateProject = (token,projectData,id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/concerns/edit-concern/` + id, projectData, config);

    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete Project
export const deleteProject = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/concerns/soft-delete-concern/${id}`,datas, config);

    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.response,
    });
  }
};