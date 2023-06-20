import { APPROVE_CASHOUT_REQ_FAIL, APPROVE_CASHOUT_REQ_REQUEST, APPROVE_CASHOUT_REQ_RESET, APPROVE_CASHOUT_REQ_SUCCESS, CLEAR_ERRORS, CREATE_CASHOUT_OPTION_FAIL, CREATE_CASHOUT_OPTION_REQUEST, CREATE_CASHOUT_OPTION_RESET, CREATE_CASHOUT_OPTION_SUCCESS, DECLINE_CASHOUT_REQ_FAIL, DECLINE_CASHOUT_REQ_REQUEST, DECLINE_CASHOUT_REQ_RESET, DECLINE_CASHOUT_REQ_SUCCESS, DELETE_CASHOUT_OPTION_FAIL, DELETE_CASHOUT_OPTION_REQUEST, DELETE_CASHOUT_OPTION_RESET, DELETE_CASHOUT_OPTION_SUCCESS, DISBURSE_CASHOUT_REQ_FAIL, DISBURSE_CASHOUT_REQ_REQUEST, DISBURSE_CASHOUT_REQ_RESET, DISBURSE_CASHOUT_REQ_SUCCESS, LOAD_CASHOUT_APPROVAL_LIST_FAIL, LOAD_CASHOUT_APPROVAL_LIST_REQUEST, LOAD_CASHOUT_APPROVAL_LIST_SUCCESS, LOAD_CASHOUT_DECLINE_LIST_FAIL, LOAD_CASHOUT_DECLINE_LIST_REQUEST, LOAD_CASHOUT_DECLINE_LIST_SUCCESS, LOAD_CASHOUT_DISBURSE_LIST_FAIL, LOAD_CASHOUT_DISBURSE_LIST_REQUEST, LOAD_CASHOUT_DISBURSE_LIST_SUCCESS, LOAD_CASHOUT_OPTION_LIST_FAIL, LOAD_CASHOUT_OPTION_LIST_REQUEST, LOAD_CASHOUT_OPTION_LIST_SUCCESS, LOAD_CASHOUT_REQ_LIST_FAIL, LOAD_CASHOUT_REQ_LIST_REQUEST, LOAD_CASHOUT_REQ_LIST_SUCCESS } from "../constants/cashoutManagementConstant";

export const loadCashoutReqListReducer = (
    state = { loadCashoutReqListData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_CASHOUT_REQ_LIST_REQUEST:
        return {
          loadCashoutReqListLoading: true,
        };
      case LOAD_CASHOUT_REQ_LIST_SUCCESS:
        return {
          ...state,
          loadCashoutReqListLoading: false,
          loadCashoutReqListData: action.payload,
        };
      case LOAD_CASHOUT_REQ_LIST_FAIL:
        return {
          ...state,
          loadCashoutReqListLoading: false,
          loadCashoutReqListData: null,
          loadCashoutReqListError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadCashoutReqListError: null,
        };
      default:
        return state;
    }
};

export const loadCashoutApprovalListReducer = (
    state = { loadCashoutApprovalListData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_CASHOUT_APPROVAL_LIST_REQUEST:
        return {
          loadCashoutApprovalListLoading: true,
        };
      case LOAD_CASHOUT_APPROVAL_LIST_SUCCESS:
        return {
          ...state,
          loadCashoutApprovalListLoading: false,
          loadCashoutApprovalListData: action.payload,
        };
      case LOAD_CASHOUT_APPROVAL_LIST_FAIL:
        return {
          ...state,
          loadCashoutApprovalListLoading: false,
          loadCashoutApprovalListData: null,
          loadCashoutApprovalListError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadCashoutApprovalListError: null,
        };
      default:
        return state;
    }
};

export const loadCashoutDisburseListReducer = (
  state = { loadCashoutDisburseListData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CASHOUT_DISBURSE_LIST_REQUEST:
      return {
        loadCashoutDisburseListLoading: true,
      };
    case LOAD_CASHOUT_DISBURSE_LIST_SUCCESS:
      return {
        ...state,
        loadCashoutDisburseListLoading: false,
        loadCashoutDisburseListData: action.payload,
      };
    case LOAD_CASHOUT_DISBURSE_LIST_FAIL:
      return {
        ...state,
        loadCashoutDisburseListLoading: false,
        loadCashoutDisburseListData: null,
        loadCashoutDisburseListError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadCashoutDisburseListError: null,
      };
    default:
      return state;
  }
};

export const loadCashoutDeclineListReducer = (
  state = { loadCashoutDeclineListData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CASHOUT_DECLINE_LIST_REQUEST:
      return {
        loadCashoutDeclineListLoading: true,
      };
    case LOAD_CASHOUT_DECLINE_LIST_SUCCESS:
      return {
        ...state,
        loadCashoutDeclineListLoading: false,
        loadCashoutDeclineListData: action.payload,
      };
    case LOAD_CASHOUT_DECLINE_LIST_FAIL:
      return {
        ...state,
        loadCashoutDeclineListLoading: false,
        loadCashoutDeclineListData: null,
        loadCashoutDeclineListError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadCashoutDeclineListError: null,
      };
    default:
      return state;
  }
};

export const approveCashoutReqReducer = (state = { approveCashoutReqData: {} }, action) => {
  switch (action.type) {
    case APPROVE_CASHOUT_REQ_REQUEST:
      return {
        ...state,
        approveCashoutReqLoading: true,
      };
    case APPROVE_CASHOUT_REQ_SUCCESS:
      return {
        approveCashoutReqLoading: false,
        approveCashoutReqSuccess: true,
        approveCashoutReqData: action.payload,
      };
    case APPROVE_CASHOUT_REQ_FAIL:
      return {
        ...state,
        approveCashoutReqLoading: false,
        approveCashoutReqError: action.payload,
      };
    case APPROVE_CASHOUT_REQ_RESET:
      return {
        ...state,
        approveCashoutReqSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        approveCashoutReqError: null,
      };
    default:
      return state;
  }
};

export const declineCashoutReqReducer = (state = { declineCashoutReqData: {} }, action) => {
  switch (action.type) {
    case DECLINE_CASHOUT_REQ_REQUEST:
      return {
        ...state,
        declineCashoutReqLoading: true,
      };
    case DECLINE_CASHOUT_REQ_SUCCESS:
      return {
        declineCashoutReqLoading: false,
        declineCashoutReqSuccess: true,
        declineCashoutReqData: action.payload,
      };
    case DECLINE_CASHOUT_REQ_FAIL:
      return {
        ...state,
        declineCashoutReqLoading: false,
        declineCashoutReqError: action.payload,
      };
    case DECLINE_CASHOUT_REQ_RESET:
      return {
        ...state,
        declineCashoutReqSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        declineCashoutReqError: null,
      };
    default:
      return state;
  }
};

export const disburseCashoutReqReducer = (state = { disburseCashoutReqData: {} }, action) => {
  switch (action.type) {
    case DISBURSE_CASHOUT_REQ_REQUEST:
      return {
        ...state,
        disburseCashoutReqLoading: true,
      };
    case DISBURSE_CASHOUT_REQ_SUCCESS:
      return {
        disburseCashoutReqLoading: false,
        disburseCashoutReqSuccess: true,
        disburseCashoutReqData: action.payload,
      };
    case DISBURSE_CASHOUT_REQ_FAIL:
      return {
        ...state,
        disburseCashoutReqLoading: false,
        disburseCashoutReqError: action.payload,
      };
    case DISBURSE_CASHOUT_REQ_RESET:
      return {
        ...state,
        disburseCashoutReqSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        disburseCashoutReqError: null,
      };
    default:
      return state;
  }
};

export const createCashoutOptionReducer = (state = { createdCashoutOptionData: {} }, action) => {
  switch (action.type) {
    case CREATE_CASHOUT_OPTION_REQUEST:
      return {
        ...state,
        createdCashoutOptionLoading: true,
      };
    case CREATE_CASHOUT_OPTION_SUCCESS:
      return {
        createdCashoutOptionLoading: false,
        createdCashoutOptionSuccess: true,
        createdCashoutOptionData: action.payload,
      };
    case CREATE_CASHOUT_OPTION_FAIL:
      return {
        ...state,
        createdCashoutOptionLoading: false,
        createdCashoutOptionError: action.payload,
      };
    case CREATE_CASHOUT_OPTION_RESET:
      return {
        ...state,
        createdCashoutOptionSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdCashoutOptionError: null,
      };
    default:
      return state;
  }
};

export const loadCashoutOptionListReducer = (
  state = { loadCashoutOptionListData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CASHOUT_OPTION_LIST_REQUEST:
      return {
        loadCashoutOptionListLoading: true,
      };
    case LOAD_CASHOUT_OPTION_LIST_SUCCESS:
      return {
        ...state,
        loadCashoutOptionListLoading: false,
        loadCashoutOptionListData: action.payload,
      };
    case LOAD_CASHOUT_OPTION_LIST_FAIL:
      return {
        ...state,
        loadCashoutOptionListLoading: false,
        loadCashoutOptionListData: null,
        loadCashoutOptionListError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadCashoutOptionListError: null,
      };
    default:
      return state;
  }
};

export const deleteCashoutOptionReducer = (state = { deleteCashoutOptionData: {} }, action) => {
  switch (action.type) {
    case DELETE_CASHOUT_OPTION_REQUEST:
      return {
        ...state,
        deleteCashoutOptionLoading: true,
      };
    case DELETE_CASHOUT_OPTION_SUCCESS:
      return {
        deleteCashoutOptionLoading: false,
        deleteCashoutOptionSuccess: true,
        deleteCashoutOptionData: action.payload,
      };
    case DELETE_CASHOUT_OPTION_FAIL:
      return {
        ...state,
        deleteCashoutOptionLoading: false,
        deleteCashoutOptionError: action.payload,
      };
    case DELETE_CASHOUT_OPTION_RESET:
      return {
        ...state,
        deleteCashoutOptionSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        deleteCashoutOptionError: null,
      };
    default:
      return state;
  }
};