import { CLEAR_ERRORS, CREATE_VENDOR_FAIL, CREATE_VENDOR_REQUEST, CREATE_VENDOR_RESET, CREATE_VENDOR_SUCCESS, CREATE_VENDOR_TYPE_FAIL, CREATE_VENDOR_TYPE_REQUEST, CREATE_VENDOR_TYPE_RESET, CREATE_VENDOR_TYPE_SUCCESS, LOAD_POINT_HISTORY_DETAILS_FAIL, LOAD_POINT_HISTORY_DETAILS_REQUEST, LOAD_POINT_HISTORY_DETAILS_SUCCESS, LOAD_POINT_LIST_FAIL, LOAD_POINT_LIST_REQUEST, LOAD_POINT_LIST_SUCCESS, LOAD_TOTAL_CASHOUT_POINT_FAIL, LOAD_TOTAL_CASHOUT_POINT_REQUEST, LOAD_TOTAL_CASHOUT_POINT_SUCCESS, LOAD_VENDOR_LIST_FAIL, LOAD_VENDOR_LIST_REQUEST, LOAD_VENDOR_LIST_SUCCESS, LOAD_VENDOR_TYPE_FAIL, LOAD_VENDOR_TYPE_REQUEST, LOAD_VENDOR_TYPE_SUCCESS } from "../constants/pointManagerConstant";

export const loadPointListReducer = (
    state = { pointListData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_POINT_LIST_REQUEST:
        return {
          pointListLoading: true,
        };
      case LOAD_POINT_LIST_SUCCESS:
        return {
          ...state,
          pointListLoading: false,
          pointListData: action.payload,
        };
      case LOAD_POINT_LIST_FAIL:
        return {
          ...state,
          pointListLoading: false,
          pointListData: null,
          pointListError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          pointListError: null,
        };
      default:
        return state;
    }
};
  
export const loadPointHistoryDetailsReducer = (
  state = { pointHistoryDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_POINT_HISTORY_DETAILS_REQUEST:
      return {
        pointHistoryDetailsLoading: true,
      };
    case LOAD_POINT_HISTORY_DETAILS_SUCCESS:
      return {
        ...state,
        pointHistoryDetailsLoading: false,
        pointHistoryDetailsData: action.payload,
      };
    case LOAD_POINT_HISTORY_DETAILS_FAIL:
      return {
        ...state,
        pointHistoryDetailsLoading: false,
        pointHistoryDetailsData: null,
        pointHistoryDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        pointHistoryDetailsError: null,
      };
    default:
      return state;
  }
};

export const createVendorReducer = (state = { createdVendor: {} }, action) => {
  switch (action.type) {
    case CREATE_VENDOR_REQUEST:
      return {
        ...state,
        createdVendorLoading: true,
      };
    case CREATE_VENDOR_SUCCESS:
      return {
        createdVendorLoading: false,
        createdVendorSuccess: true,
        createdVendor: action.payload,
      };
    case CREATE_VENDOR_FAIL:
      return {
        ...state,
        createdVendorLoading: false,
        createdVendorError: action.payload,
      };
    case CREATE_VENDOR_RESET:
      return {
        ...state,
        createdVendorSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdVendorError: null,
      };
    default:
      return state;
  }
};

export const loadVendorListReducer = (
  state = { vendorListData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_VENDOR_LIST_REQUEST:
      return {
        vendorListLoading: true,
      };
    case LOAD_VENDOR_LIST_SUCCESS:
      return {
        ...state,
        vendorListLoading: false,
        vendorListData: action.payload,
      };
    case LOAD_VENDOR_LIST_FAIL:
      return {
        ...state,
        vendorListLoading: false,
        vendorListData: null,
        vendorListError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        vendorListError: null,
      };
    default:
      return state;
  }
};

export const createVendorTypeReducer = (state = { createdVendorType: {} }, action) => {
  switch (action.type) {
    case CREATE_VENDOR_TYPE_REQUEST:
      return {
        ...state,
        createdVendorTypeLoading: true,
      };
    case CREATE_VENDOR_TYPE_SUCCESS:
      return {
        createdVendorTypeLoading: false,
        createdVendorTypeSuccess: true,
        createdVendorType: action.payload,
      };
    case CREATE_VENDOR_TYPE_FAIL:
      return {
        ...state,
        createdVendorTypeLoading: false,
        createdVendorTypeError: action.payload,
      };
    case CREATE_VENDOR_TYPE_RESET:
      return {
        ...state,
        createdVendorTypeSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdVendorTypeError: null,
      };
    default:
      return state;
  }
};


export const loadVendorTypeReducer = (
  state = { vendorTypeData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_VENDOR_TYPE_REQUEST:
      return {
        vendorTypeLoading: true,
      };
    case LOAD_VENDOR_TYPE_SUCCESS:
      return {
        ...state,
        vendorTypeLoading: false,
        vendorTypeData: action.payload,
      };
    case LOAD_VENDOR_TYPE_FAIL:
      return {
        ...state,
        vendorTypeLoading: false,
        vendorTypeData: null,
        vendorTypeError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        vendorTypeError: null,
      };
    default:
      return state;
  }
};

export const loadtotalCashoutPointReducer = (
  state = { totalCashoutPointData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_TOTAL_CASHOUT_POINT_REQUEST:
      return {
        totalCashoutPointLoading: true,
      };
    case LOAD_TOTAL_CASHOUT_POINT_SUCCESS:
      return {
        ...state,
        totalCashoutPointLoading: false,
        totalCashoutPointData: action.payload,
      };
    case LOAD_TOTAL_CASHOUT_POINT_FAIL:
      return {
        ...state,
        totalCashoutPointLoading: false,
        totalCashoutPointData: null,
        totalCashoutPointError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        totalCashoutPointError: null,
      };
    default:
      return state;
  }
};