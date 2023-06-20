import {
  ACCEPT_NEW_CARD_ALLOTMENT_FAIL,
  ACCEPT_NEW_CARD_ALLOTMENT_REQUEST,
  ACCEPT_NEW_CARD_ALLOTMENT_RESET,
  ACCEPT_NEW_CARD_ALLOTMENT_SUCCESS,
  ALLOCATE_CARD_FAIL,
  ALLOCATE_CARD_REQUEST,
  ALLOCATE_CARD_RESET,
  ALLOCATE_CARD_SUCCESS,
  CLEAR_ERRORS,
  CREATE_CARD_COUNTER_FAIL,
  CREATE_CARD_COUNTER_REQUEST,
  CREATE_CARD_COUNTER_RESET,
  CREATE_CARD_COUNTER_SUCCESS,
  DISBURSED_CARD_DETAILS_FAIL,
  DISBURSED_CARD_DETAILS_REQUEST,
  DISBURSED_CARD_DETAILS_SUCCESS,
  DISBURSE_CARD_FAIL,
  DISBURSE_CARD_REQUEST,
  DISBURSE_CARD_RESET,
  DISBURSE_CARD_SUCCESS,
  LOAD_ALLOCATED_CARD_FAIL,
  LOAD_ALLOCATED_CARD_REQUEST,
  LOAD_ALLOCATED_CARD_RESET,
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
  LOAD_DISBURSED_RESET,
  LOAD_DISBURSED_SUCCESS,
  LOAD_NEW_ALLOTMENT_CARD_REQLIST_FAIL,
  LOAD_NEW_ALLOTMENT_CARD_REQLIST_REQUEST,
  LOAD_NEW_ALLOTMENT_CARD_REQLIST_SUCCESS,
  LOAD_VOID_CARD_HISTORY_FAIL,
  LOAD_VOID_CARD_HISTORY_REQUEST,
  LOAD_VOID_CARD_HISTORY_SUCCESS,
} from "../constants/cardManagementConstant";

export const loadAllotedCardReducer = (
  state = { allotedCardData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_ALLOCATED_CARD_REQUEST:
      return {
        allotedCardLoading: true,
      };
    case LOAD_ALLOCATED_CARD_SUCCESS:
      return {
        ...state,
        allotedCardLoading: false,
        allotedCardSuccess: true,
        allotedCardData: action.payload,
      };
    case LOAD_ALLOCATED_CARD_FAIL:
      return {
        ...state,
        allotedCardLoading: false,
        allotedCardData: null,
        allotedCardError: action.payload,
      };
    case LOAD_ALLOCATED_CARD_RESET:
      return {
        ...state,
        allotedCardSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        allotedCardError: null,
      };
    default:
      return state;
  }
};

export const allocateCardReducer = (
  state = { allocateCardData: {} },
  action
) => {
  switch (action.type) {
    case ALLOCATE_CARD_REQUEST:
      return {
        ...state,
        allocateCardDataLoading: true,
      };
    case ALLOCATE_CARD_SUCCESS:
      return {
        allocateCardDataLoading: false,
        allocateCardSuccess: true,
        allocateCardData: action.payload,
      };
    case ALLOCATE_CARD_FAIL:
      return {
        ...state,
        allocateCardDataLoading: false,
        allocateCardDataError: action.payload,
      };
    case ALLOCATE_CARD_RESET:
      return {
        ...state,
        allocateCardSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        allocateCardDataError: null,
      };
    default:
      return state;
  }
};

export const loadDisbursedCardReducer = (
    state = { disbursedCardData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_DISBURSED_REQUEST:
        return {
            disbursedCardLoading: true,
        };
      case LOAD_DISBURSED_SUCCESS:
        return {
          ...state,
          disbursedCardLoading: false,
          disbursedCardSuccess: true,
          disbursedCardData: action.payload,
        };
      case LOAD_DISBURSED_FAIL:
        return {
          ...state,
          disbursedCardLoading: false,
          disbursedCardData: null,
          disbursedCardError: action.payload,
        };
      case LOAD_DISBURSED_RESET:
        return {
          ...state,
          disbursedCardSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          disbursedCardError: null,
        };
      default:
        return state;
    }
};
  
export const disbursedCardDetailReducer = (
  state = { disbursedCardDetailData: {} },
  action
) => {
  switch (action.type) {
    case DISBURSED_CARD_DETAILS_REQUEST:
      return {
        disbursedCardDetailLoading: true,
      };
    case DISBURSED_CARD_DETAILS_SUCCESS:
      return {
        ...state,
        disbursedCardDetailLoading: false,
        disbursedCardDetailData: action.payload,
      };
    case DISBURSED_CARD_DETAILS_FAIL:
      return {
        ...state,
        disbursedCardDetailLoading: false,
        disbursedCardDetailData: null,
        disbursedCardDetailError: action.payload,
      };
    
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        disbursedCardDetailError: null,
      };
    default:
      return state;
  }
};

export const disburseCardReducer = (state = { disburseCardData: {} }, action) => {
  switch (action.type) {
    case DISBURSE_CARD_REQUEST:
      return {
        ...state,
        disburseCardLoading: true,
      };
    case DISBURSE_CARD_SUCCESS:
      return {
        disburseCardLoading: false,
        disburseCardSuccess: true,
        disburseCardData: action.payload,
      };
    case DISBURSE_CARD_FAIL:
      return {
        ...state,
        disburseCardLoading: false,
        disburseCardError: action.payload,
      };
    case DISBURSE_CARD_RESET:
      return {
        ...state,
        disburseCardSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        disburseCardError: null,
      };
    default:
      return state;
  }
};

export const loadCardTypeReducer = (
  state = { loadCardTypeData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CARD_TYPE_REQUEST:
      return {
        loadCardTypeLoading: true,
      };
    case LOAD_CARD_TYPE_SUCCESS:
      return {
        ...state,
        loadCardTypeLoading: false,
        loadCardTypeData: action.payload,
      };
    case LOAD_CARD_TYPE_FAIL:
      return {
        ...state,
        loadCardTypeLoading: false,
        loadCardTypeData: null,
        loadCardTypeError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadCardTypeError: null,
      };
    default:
      return state;
  }
};

export const loadNewAllotmentCardReqReducer = (
  state = { loadNewAllotmentCardReqData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_NEW_ALLOTMENT_CARD_REQLIST_REQUEST:
      return {
        loadNewAllotmentCardReqLoading: true,
      };
    case LOAD_NEW_ALLOTMENT_CARD_REQLIST_SUCCESS:
      return {
        ...state,
        loadNewAllotmentCardReqLoading: false,
        loadNewAllotmentCardReqData: action.payload,
      };
    case LOAD_NEW_ALLOTMENT_CARD_REQLIST_FAIL:
      return {
        ...state,
        loadNewAllotmentCardReqLoading: false,
        loadNewAllotmentCardReqData: null,
        loadNewAllotmentCardReqError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadNewAllotmentCardReqError: null,
      };
    default:
      return state;
  }
};

export const acceptNewCardAllotmentReqReducer = (state = { acceptNewCardAllotmentReqData: {} }, action) => {
  switch (action.type) {
    case ACCEPT_NEW_CARD_ALLOTMENT_REQUEST:
      return {
        ...state,
        acceptNewCardAllotmentReqLoading: true,
      };
    case ACCEPT_NEW_CARD_ALLOTMENT_SUCCESS:
      return {
        acceptNewCardAllotmentReqLoading: false,
        acceptNewCardAllotmentReqSuccess: true,
        acceptNewCardAllotmentReqData: action.payload,
      };
    case ACCEPT_NEW_CARD_ALLOTMENT_FAIL:
      return {
        ...state,
        acceptNewCardAllotmentReqLoading: false,
        acceptNewCardAllotmentReqError: action.payload,
      };
    case ACCEPT_NEW_CARD_ALLOTMENT_RESET:
      return {
        ...state,
        acceptNewCardAllotmentReqSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        acceptNewCardAllotmentReqError: null,
      };
    default:
      return state;
  }
};

export const loadVoidCardHistoryReducer = (
  state = { loadVoidCardHistoryData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_VOID_CARD_HISTORY_REQUEST:
      return {
        loadVoidCardHistoryLoading: true,
      };
    case LOAD_VOID_CARD_HISTORY_SUCCESS:
      return {
        ...state,
        loadVoidCardHistoryLoading: false,
        loadVoidCardHistoryData: action.payload,
      };
    case LOAD_VOID_CARD_HISTORY_FAIL:
      return {
        ...state,
        loadVoidCardHistoryLoading: false,
        loadVoidCardHistoryData: null,
        loadVoidCardHistoryError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadVoidCardHistoryError: null,
      };
    default:
      return state;
  }
};

export const loadAllRequestedCardHistoryReducer = (
  state = { loadAllRequestedCardHistoryData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_ALL_CARD_REQ_HISTORY_REQUEST:
      return {
        loadAllRequestedCardHistoryLoading: true,
      };
    case LOAD_ALL_CARD_REQ_HISTORY_SUCCESS:
      return {
        ...state,
        loadAllRequestedCardHistoryLoading: false,
        loadAllRequestedCardHistoryData: action.payload,
      };
    case LOAD_ALL_CARD_REQ_HISTORY_FAIL:
      return {
        ...state,
        loadAllRequestedCardHistoryLoading: false,
        loadAllRequestedCardHistoryData: null,
        loadAllRequestedCardHistoryError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadAllRequestedCardHistoryError: null,
      };
    default:
      return state;
  }
};

export const loadCardCounterReducer = (
  state = { loadCardCounterData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CARD_COUNTER_REQUEST:
      return {
        loadCardCounterLoading: true,
      };
    case LOAD_CARD_COUNTER_SUCCESS:
      return {
        ...state,
        loadCardCounterLoading: false,
        loadCardCounterData: action.payload,
      };
    case LOAD_CARD_COUNTER_FAIL:
      return {
        ...state,
        loadCardCounterLoading: false,
        loadCardCounterData: null,
        loadCardCounterError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadCardCounterError: null,
      };
    default:
      return state;
  }
};

export const createCardCounterReducer = (
  state = { createCardCounterData: {} },
  action
) => {
  switch (action.type) {
    case CREATE_CARD_COUNTER_REQUEST:
      return {
        ...state,
        createCardCounterDataLoading: true,
      };
    case CREATE_CARD_COUNTER_SUCCESS:
      return {
        createCardCounterDataLoading: false,
        createCardCounterSuccess: true,
        createCardCounterData: action.payload,
      };
    case CREATE_CARD_COUNTER_FAIL:
      return {
        ...state,
        createCardCounterDataLoading: false,
        createCardCounterDataError: action.payload,
      };
    case CREATE_CARD_COUNTER_RESET:
      return {
        ...state,
        createCardCounterSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createCardCounterDataError: null,
      };
    default:
      return state;
  }
};