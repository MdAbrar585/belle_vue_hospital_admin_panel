import apiClient from "../../apiClient";
import {
  ACCEPT_NEW_CARD_ALLOTMENT_FAIL,
  ACCEPT_NEW_CARD_ALLOTMENT_REQUEST,
  ACCEPT_NEW_CARD_ALLOTMENT_SUCCESS,
  ALLOCATE_CARD_FAIL,
  ALLOCATE_CARD_REQUEST,
  ALLOCATE_CARD_SUCCESS,
  CREATE_CARD_COUNTER_FAIL,
  CREATE_CARD_COUNTER_REQUEST,
  CREATE_CARD_COUNTER_SUCCESS,
  DISBURSED_CARD_DETAILS_FAIL,
  DISBURSED_CARD_DETAILS_REQUEST,
  DISBURSED_CARD_DETAILS_SUCCESS,
  DISBURSE_CARD_FAIL,
  DISBURSE_CARD_REQUEST,
  DISBURSE_CARD_SUCCESS,
  LOAD_ALLOCATED_CARD_FAIL,
  LOAD_ALLOCATED_CARD_REQUEST,
  LOAD_ALLOCATED_CARD_SUCCESS,
  LOAD_ALL_CARD_REQ_HISTORY_FAIL,
  LOAD_ALL_CARD_REQ_HISTORY_REQUEST,
  LOAD_ALL_CARD_REQ_HISTORY_SUCCESS,
  LOAD_CARD_COUNTER_FAIL,
  LOAD_CARD_COUNTER_REQUEST,
  LOAD_CARD_COUNTER_SUCCESS,
  LOAD_CARD_TYPE_FAIL,
  LOAD_CARD_TYPE_REQUEST,
  LOAD_CARD_TYPE_SUCCESS,
  LOAD_DISBURSED_FAIL,
  LOAD_DISBURSED_REQUEST,
  LOAD_DISBURSED_SUCCESS,
  LOAD_NEW_ALLOTMENT_CARD_REQLIST_FAIL,
  LOAD_NEW_ALLOTMENT_CARD_REQLIST_REQUEST,
  LOAD_NEW_ALLOTMENT_CARD_REQLIST_SUCCESS,
  LOAD_VOID_CARD_HISTORY_FAIL,
  LOAD_VOID_CARD_HISTORY_REQUEST,
  LOAD_VOID_CARD_HISTORY_SUCCESS,
} from "../constants/cardManagementConstant";

export const loadAllotedCardListData =
  (token, allotedCardData) => async (dispatch) => {
    try {
      dispatch({ type: LOAD_ALLOCATED_CARD_REQUEST });

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
        "admin/membership/all-allocated-cards",
        allotedCardData,
        config
      );
      // console.log(data);

      dispatch({
        type: LOAD_ALLOCATED_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_ALLOCATED_CARD_FAIL,
        payload: error.response.data,
      });
    }
  };

export const loadDisbursedCardListData =
  (token, datas = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOAD_DISBURSED_REQUEST });

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
        "admin/membership/all-disbursed-cards",
        datas,
        config
      );
      // console.log(data);

      dispatch({
        type: LOAD_DISBURSED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_DISBURSED_FAIL,
        payload: error.response.data,
      });
    }
  };

export const allocateCard = (token, allocateCardData) => async (dispatch) => {
  try {
    dispatch({ type: ALLOCATE_CARD_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/membership/allocate-card-to-customer`,
      allocateCardData,
      config
    );

    dispatch({
      type: ALLOCATE_CARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALLOCATE_CARD_FAIL,
      payload: error.response.data,
    });
  }
};

export const disbursedCard = (token, cardId) => async (dispatch) => {
  try {
    dispatch({ type: DISBURSED_CARD_DETAILS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.get(
      `admin/membership/allocated-card-details/` + cardId,
      config
    );

    dispatch({
      type: DISBURSED_CARD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISBURSED_CARD_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const disburseCard =
  (token, cardId, datas = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: DISBURSE_CARD_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await apiClient.post(
        `admin/membership/disburse-card-to-customer/` + cardId,
        datas,
        config
      );

      dispatch({
        type: DISBURSE_CARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DISBURSE_CARD_FAIL,
        payload: error.response.data,
      });
    }
  };

export const loadCardType = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CARD_TYPE_REQUEST });

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
      "admin/membership/all-card-types",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CARD_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CARD_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadNewAllotmentCardReq =
  (token, datas = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOAD_NEW_ALLOTMENT_CARD_REQLIST_REQUEST });

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
        "admin/membership/all-new-card-requests",
        datas,
        config
      );
      // console.log(data);

      dispatch({
        type: LOAD_NEW_ALLOTMENT_CARD_REQLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_NEW_ALLOTMENT_CARD_REQLIST_FAIL,
        payload: error.response.data,
      });
    }
  };

  export const acceptNewCardAllotmenReq = (token,id,datas = {}) => async (dispatch) => {
    try {
      dispatch({ type: ACCEPT_NEW_CARD_ALLOTMENT_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await apiClient.post(`admin/membership/accept-new-card-request/`+id,datas, config);
  
      dispatch({
        type: ACCEPT_NEW_CARD_ALLOTMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCEPT_NEW_CARD_ALLOTMENT_FAIL,
        payload: error.response.data,
      });
    }
};
  
export const loadVoidCardHistory = (token, datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_VOID_CARD_HISTORY_REQUEST });

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
      "admin/membership/all-void-cards",datas,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_VOID_CARD_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_VOID_CARD_HISTORY_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadAllCardRequestedHistory = (token, datas = {}) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ALL_CARD_REQ_HISTORY_REQUEST });

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
      "admin/membership/all-card-request-histories",datas,
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_ALL_CARD_REQ_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_ALL_CARD_REQ_HISTORY_FAIL,
      payload: error.response.data,
    });
  }
};

export const createCardCounterFunc = (token, cardCounterData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CARD_COUNTER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await apiClient.post(
      `admin/membership/cards/add-new-batch`,
      cardCounterData,
      config
    );

    dispatch({
      type: CREATE_CARD_COUNTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CARD_COUNTER_FAIL,
      payload: error.response.data,
    });
  }
};

export const loadCardCounterFunc = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CARD_COUNTER_REQUEST });

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
      "admin/membership/cards/all-batches",
      config
    );
    // console.log(data);

    dispatch({
      type: LOAD_CARD_COUNTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CARD_COUNTER_FAIL,
      payload: error.response.data,
    });
  }
};