import apiClient from "../../apiClient";
import { APPROVE_OFFER_FAIL, APPROVE_OFFER_REQUEST, APPROVE_OFFER_SUCCESS, CREATE_OFFER_FAIL, CREATE_OFFER_REQUEST, CREATE_OFFER_SUCCESS, DECLINE_OFFER_FAIL, DECLINE_OFFER_REQUEST, DECLINE_OFFER_SUCCESS, DELETE_OFFER_FAIL, DELETE_OFFER_REQUEST, DELETE_OFFER_SUCCESS, LOAD_OFFER_DETAILS_FAIL, LOAD_OFFER_DETAILS_REQUEST, LOAD_OFFER_DETAILS_SUCCESS, LOAD_OFFER_FAIL, LOAD_OFFER_REQUEST, LOAD_OFFER_SUCCESS, UPDATE_OFFER_FAIL, UPDATE_OFFER_REQUEST, UPDATE_OFFER_SUCCESS } from "../constants/offerConstant";

export const loadOfferFunc =
  (token, offerData) =>
async (dispatch) => {
  try {
    dispatch({ type: LOAD_OFFER_REQUEST });

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
      "admin/offers/all-offers",
      offerData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_OFFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_OFFER_FAIL,
      payload: error.response.data,
    });
  }
};

export const createOfferFunc = (token,offerData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_OFFER_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(`admin/offers/add-offer`, offerData, config);
  
      dispatch({
        type: CREATE_OFFER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_OFFER_FAIL,
        payload: error.response.data,
      });
    }
};
  
export const approveOfferFunc = (token,offerId) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_OFFER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(`admin/offers/activate-offer/`+offerId, config);

    dispatch({
      type: APPROVE_OFFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_OFFER_FAIL,
      payload: error.response.data,
    });
  }
};

export const declineOfferFunc = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: DECLINE_OFFER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.get(`admin/offers/deactivate-offer/${id}`, config);

    dispatch({
      type: DECLINE_OFFER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DECLINE_OFFER_FAIL,
      payload: error.response,
    });
  }
};

export const loadOfferDetailsFunc = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_OFFER_DETAILS_REQUEST });

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
      "admin/offers/get-offer-by-id/" + id,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_OFFER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_OFFER_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateOfferFunc = (token, partnerData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_OFFER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/offers/edit-offer/` + id,
      partnerData,
      config
    );

    dispatch({
      type: UPDATE_OFFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_OFFER_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteOfferfunc = (token, id,datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_OFFER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await apiClient.post(`admin/offers/delete-offer/${id}`,datas, config);

    dispatch({
      type: DELETE_OFFER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_OFFER_FAIL,
      payload: error.response,
    });
  }
};