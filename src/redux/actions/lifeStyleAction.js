import apiClient from "../../apiClient";
import { APPROVE_LIFE_STYLE_FAIL, APPROVE_LIFE_STYLE_REQUEST, APPROVE_LIFE_STYLE_SUCCESS, CREATE_LIFE_STYLE_FAIL, CREATE_LIFE_STYLE_REQUEST, CREATE_LIFE_STYLE_SUCCESS, DELETE_LIFE_STYLE_FAIL, DELETE_LIFE_STYLE_REQUEST, DELETE_LIFE_STYLE_SUCCESS, LOAD_LIFE_STYLE_DETAILS_FAIL, LOAD_LIFE_STYLE_DETAILS_REQUEST, LOAD_LIFE_STYLE_DETAILS_SUCCESS, LOAD_LIFE_STYLE_FAIL, LOAD_LIFE_STYLE_REQUEST, LOAD_LIFE_STYLE_SUCCESS, UPDATE_LIFE_STYLE_FAIL, UPDATE_LIFE_STYLE_REQUEST, UPDATE_LIFE_STYLE_SUCCESS } from "../constants/lifeStyleConstant";

export const loadLifeStyleFunc =
  (token, offerData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_LIFE_STYLE_REQUEST });

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
      "admin/life-style/all",
      offerData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_LIFE_STYLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_LIFE_STYLE_FAIL,
      payload: error.response.data,
    });
  }
};

export const createLifeStyleFunc = (token,offerData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_LIFE_STYLE_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(`admin/life-style/add`, offerData, config);
  
      dispatch({
        type: CREATE_LIFE_STYLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_LIFE_STYLE_FAIL,
        payload: error.response.data,
      });
    }
};
  
export const activeDeactiveLifeStyleToggleFunc = (token,lifeStyleId) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_LIFE_STYLE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(`admin/life-style/toggle-activation/`+lifeStyleId, config);

    dispatch({
      type: APPROVE_LIFE_STYLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_LIFE_STYLE_FAIL,
      payload: error.response.data,
    });
  }
};

// export const declineStyleFunc = (token, id) => async (dispatch) => {
//   try {
//     dispatch({ type: DECLINE_LIFE_STYLE_REQUEST });

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const { data } = await apiClient.get(`admin/offers/deactivate-offer/${id}`, config);

//     dispatch({
//       type: DECLINE_LIFE_STYLE_SUCCESS,
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: DECLINE_LIFE_STYLE_FAIL,
//       payload: error.response,
//     });
//   }
// };

export const updateLifeStyleFunc = (token, lifeStyleData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LIFE_STYLE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/life-style/edit/` + id,
      lifeStyleData,
      config
    );

    dispatch({
      type: UPDATE_LIFE_STYLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LIFE_STYLE_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadLifeStyleDetailsFunc =
  (token,id) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_LIFE_STYLE_DETAILS_REQUEST });

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
      "admin/life-style/life-style-by-id/" + id,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_LIFE_STYLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_LIFE_STYLE_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteLifeStylefunc = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LIFE_STYLE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/news/delete-news/${id}`,datas, config);

    dispatch({
      type: DELETE_LIFE_STYLE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LIFE_STYLE_FAIL,
      payload: error.response,
    });
  }
};