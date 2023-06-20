import apiClient from "../../apiClient";
import { CREATE_NEWS_FAIL, CREATE_NEWS_REQUEST, CREATE_NEWS_SUCCESS, DELETE_NEWS_FAIL, DELETE_NEWS_REQUEST, DELETE_NEWS_SUCCESS, LOAD_NEWS_DETAILS_FAIL, LOAD_NEWS_DETAILS_REQUEST, LOAD_NEWS_DETAILS_SUCCESS, LOAD_NEWS_FAIL, LOAD_NEWS_REQUEST, LOAD_NEWS_SUCCESS, UPDATE_NEWS_FAIL, UPDATE_NEWS_REQUEST, UPDATE_NEWS_SUCCESS } from "../constants/newsConstant";

export const loadNews =
  (token,newsData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_NEWS_REQUEST });

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
      "admin/news/all-news",newsData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_NEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_NEWS_FAIL,
      payload: error.response.data,
    });
  }
};

export const createNews = (token,newsData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NEWS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(`admin/news/add-news`, newsData, config);

    dispatch({
      type: CREATE_NEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEWS_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete News
export const deleteNewsfunc = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NEWS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/news/delete-news/${id}`,datas, config);

    dispatch({
      type: DELETE_NEWS_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NEWS_FAIL,
      payload: error.response,
    });
  }
};

export const loadNewsDetailsFunc =
  (token,id) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_NEWS_DETAILS_REQUEST });

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
      "admin/news/news-by-id/" + id,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_NEWS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_NEWS_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateNewsFunc = (token, partnerData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NEWS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/news/edit-news/` + id,
      partnerData,
      config
    );

    dispatch({
      type: UPDATE_NEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_NEWS_FAIL,
      payload: error.response.data,
    });
  }
};