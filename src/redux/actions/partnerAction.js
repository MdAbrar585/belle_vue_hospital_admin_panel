import apiClient from "../../apiClient";
import {
  CREATE_PARTNER_FAIL,
  CREATE_PARTNER_REQUEST,
  CREATE_PARTNER_SERVICE_FAIL,
  CREATE_PARTNER_SERVICE_REQUEST,
  CREATE_PARTNER_SERVICE_SUCCESS,
  CREATE_PARTNER_SERVICE_TYPE_FAIL,
  CREATE_PARTNER_SERVICE_TYPE_REQUEST,
  CREATE_PARTNER_SERVICE_TYPE_SUCCESS,
  CREATE_PARTNER_SUCCESS,
  CREATE_PARTNER_TYPE_FAIL,
  CREATE_PARTNER_TYPE_REQUEST,
  CREATE_PARTNER_TYPE_SUCCESS,
  DELETE_PARTNER_FAIL,
  DELETE_PARTNER_REQUEST,
  DELETE_PARTNER_SERVICE_FAIL,
  DELETE_PARTNER_SERVICE_REQUEST,
  DELETE_PARTNER_SERVICE_SUCCESS,
  DELETE_PARTNER_SUCCESS,
  LOAD_PARTNER_DETAILS_FAIL,
  LOAD_PARTNER_DETAILS_REQUEST,
  LOAD_PARTNER_DETAILS_SUCCESS,
  LOAD_PARTNER_FAIL,
  LOAD_PARTNER_REQUEST,
  LOAD_PARTNER_SERVICE_DETAILS_FAIL,
  LOAD_PARTNER_SERVICE_DETAILS_REQUEST,
  LOAD_PARTNER_SERVICE_DETAILS_SUCCESS,
  LOAD_PARTNER_SERVICE_FAIL,
  LOAD_PARTNER_SERVICE_REQUEST,
  LOAD_PARTNER_SERVICE_SUCCESS,
  LOAD_PARTNER_SERVICE_TYPE_FAIL,
  LOAD_PARTNER_SERVICE_TYPE_REQUEST,
  LOAD_PARTNER_SERVICE_TYPE_SUCCESS,
  LOAD_PARTNER_SUCCESS,
  LOAD_PARTNER_TYPE_FAIL,
  LOAD_PARTNER_TYPE_REQUEST,
  LOAD_PARTNER_TYPE_SUCCESS,
  UPDATE_PARTNER_FAIL,
  UPDATE_PARTNER_REQUEST,
  UPDATE_PARTNER_SERVICE_FAIL,
  UPDATE_PARTNER_SERVICE_REQUEST,
  UPDATE_PARTNER_SERVICE_SUCCESS,
  UPDATE_PARTNER_SUCCESS,
  UPLOAD_PARTNER_IMAGE_FAIL,
  UPLOAD_PARTNER_IMAGE_REQUEST,
  UPLOAD_PARTNER_IMAGE_SUCCESS,
} from "../constants/partnerConstant";

export const loadPartnerData = (token, partnerData) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_PARTNER_REQUEST });

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
    const { data } = await apiClient.post(
      "admin/partners/all-partners",
      partnerData,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_PARTNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PARTNER_FAIL,
      payload: error.response.data,
    });
  }
};

export const createPartner = (token, partnerData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PARTNER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/partners/add-partner`,
      partnerData,
      config
    );

    dispatch({
      type: CREATE_PARTNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PARTNER_FAIL,
      payload: error.response.data,
    });
  }
};

export const updatePartner = (token, partnerData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PARTNER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/partners/edit-partner/` + id,
      partnerData,
      config
    );

    dispatch({
      type: UPDATE_PARTNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PARTNER_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadPartnerDetailsFunc = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_PARTNER_DETAILS_REQUEST });

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
      "admin/partners/get-partner-by-id/" + id,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_PARTNER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PARTNER_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadPartnerServiceDetailsFunc =
  (token, id) => async (dispatch) => {
    try {
      dispatch({ type: LOAD_PARTNER_SERVICE_DETAILS_REQUEST });

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
        "admin/partners/services/get-service-by-id/" + id,
        config
      );
      // console.log(data);

      dispatch({
        type: LOAD_PARTNER_SERVICE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_PARTNER_SERVICE_DETAILS_FAIL,
        payload: error.response.data,
      });
    }
  };

export const createPartnerService =
  (token, partnerServiceData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PARTNER_SERVICE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await apiClient.post(
        `admin/partners/services/add-service`,
        partnerServiceData,
        config
      );

      dispatch({
        type: CREATE_PARTNER_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PARTNER_SERVICE_FAIL,
        payload: error.response.data,
      });
    }
  };

  export const updatePartnerServiceFunc = (token, partnerServiceData, id) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PARTNER_SERVICE_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(
        `admin/partners/services/edit-service/` + id,
        partnerServiceData,
        config
      );
  
      dispatch({
        type: UPDATE_PARTNER_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PARTNER_SERVICE_FAIL,
        payload: error.response.data,
      });
    }
  };

  export const deletePartnerServiceFunc =
  (token, id, datas = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_PARTNER_SERVICE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await apiClient.post(
        `admin/partners/services/delete-service/${id}`,
        datas,
        config
      );

      dispatch({
        type: DELETE_PARTNER_SERVICE_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PARTNER_SERVICE_FAIL,
        payload: error.response,
      });
    }
  };

export const loadPartnerService =
  (token, partnerServiceData) => async (dispatch) => {
    try {
      dispatch({ type: LOAD_PARTNER_SERVICE_REQUEST });

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
      const { data } = await apiClient.post(
        "admin/partners/services/all-services",
        partnerServiceData,
        config
      );
      // console.log(data);

      dispatch({
        type: LOAD_PARTNER_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_PARTNER_SERVICE_FAIL,
        payload: error.response.data,
      });
    }
  };

export const createPartnerServiceType =
  (token, partnerServiceTypeData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PARTNER_SERVICE_TYPE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await apiClient.post(
        `admin/partners/services/add-service-type`,
        partnerServiceTypeData,
        config
      );

      dispatch({
        type: CREATE_PARTNER_SERVICE_TYPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PARTNER_SERVICE_TYPE_FAIL,
        payload: error.response.data,
      });
    }
  };

export const createPartnerTypeFunc =
  (token, partnerTypeData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PARTNER_TYPE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await apiClient.post(
        `admin/partners/add-partner-type`,
        partnerTypeData,
        config
      );

      dispatch({
        type: CREATE_PARTNER_TYPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PARTNER_TYPE_FAIL,
        payload: error.response.data,
      });
    }
  };

export const loadPartnerTypeFunc = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_PARTNER_TYPE_REQUEST });

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
      "admin/partners/all-partner-types",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_PARTNER_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PARTNER_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadPartnerServiceType = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_PARTNER_SERVICE_TYPE_REQUEST });

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
      "admin/partners/services/all-service-types",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_PARTNER_SERVICE_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PARTNER_SERVICE_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete Partner
export const deletePartners =
  (token, id, datas = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_PARTNER_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await apiClient.post(
        `admin/partners/soft-delete-partner/${id}`,
        datas,
        config
      );

      dispatch({
        type: DELETE_PARTNER_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PARTNER_FAIL,
        payload: error.response,
      });
    }
  };

export const uploadPartnerImageFunc =
  (token, partnerImg, id) => async (dispatch) => {
    try {
      dispatch({ type: UPLOAD_PARTNER_IMAGE_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          accesscontrolalloworigin: "*",
        },
      };

      const { data } = await apiClient.post(
        `admin/partners/change-partner-picture/` + id,
        partnerImg,
        config
      );

      dispatch({
        type: UPLOAD_PARTNER_IMAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_PARTNER_IMAGE_FAIL,
        payload: error.response.data,
      });
    }
  };
