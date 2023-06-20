import { CLEAR_ERRORS, GENERATE_CASHOUT_REPORT_FAIL, GENERATE_CASHOUT_REPORT_REQUEST, GENERATE_CASHOUT_REPORT_RESET, GENERATE_CASHOUT_REPORT_SUCCESS, GENERATE_CUSTOMER_REPORT_FAIL, GENERATE_CUSTOMER_REPORT_REQUEST, GENERATE_CUSTOMER_REPORT_RESET, GENERATE_CUSTOMER_REPORT_SUCCESS, GENERATE_PARTNER_REPORT_FAIL, GENERATE_PARTNER_REPORT_REQUEST, GENERATE_PARTNER_REPORT_RESET, GENERATE_PARTNER_REPORT_SUCCESS, GENERATE_USER_REPORT_FAIL, GENERATE_USER_REPORT_REQUEST, GENERATE_USER_REPORT_RESET, GENERATE_USER_REPORT_SUCCESS, LOAD_REPORT_FAIL, LOAD_REPORT_REQUEST, LOAD_REPORT_SUCCESS } from "../constants/reportConstant";

export const generateUserReportReducer = (state = { generateUserReportData: {} }, action) => {
    switch (action.type) {
      case GENERATE_USER_REPORT_REQUEST:
        return {
          ...state,
          generateUserReportLoading: true,
        };
      case GENERATE_USER_REPORT_SUCCESS:
        return {
          generateUserReportLoading: false,
          generateUserReportSuccess: true,
          generateUserReportData: action.payload,
        };
      case GENERATE_USER_REPORT_FAIL:
        return {
          ...state,
          generateUserReportLoading: false,
          generateUserReportError: action.payload,
        };
      case GENERATE_USER_REPORT_RESET:
        return {
          ...state,
          generateUserReportSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          generateUserReportError: null,
        };
      default:
        return state;
    }
};

export const generatePartnerReportReducer = (state = { generatePartnerReportData: {} }, action) => {
  switch (action.type) {
    case GENERATE_PARTNER_REPORT_REQUEST:
      return {
        ...state,
        generatePartnerReportLoading: true,
      };
    case GENERATE_PARTNER_REPORT_SUCCESS:
      return {
        generatePartnerReportLoading: false,
        generatePartnerReportSuccess: true,
        generatePartnerReportData: action.payload,
      };
    case GENERATE_PARTNER_REPORT_FAIL:
      return {
        ...state,
        generatePartnerReportLoading: false,
        generatePartnerReportError: action.payload,
      };
    case GENERATE_PARTNER_REPORT_RESET:
      return {
        ...state,
        generatePartnerReportSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        generatePartnerReportError: null,
      };
    default:
      return state;
  }
};

export const generateCustomerReportReducer = (state = { generateCustomerReportData: {} }, action) => {
  switch (action.type) {
    case GENERATE_CUSTOMER_REPORT_REQUEST:
      return {
        ...state,
        generateCustomerReportLoading: true,
      };
    case GENERATE_CUSTOMER_REPORT_SUCCESS:
      return {
        generateCustomerReportLoading: false,
        generateCustomerReportSuccess: true,
        generateCustomerReportData: action.payload,
      };
    case GENERATE_CUSTOMER_REPORT_FAIL:
      return {
        ...state,
        generateCustomerReportLoading: false,
        generateCustomerReportError: action.payload,
      };
    case GENERATE_CUSTOMER_REPORT_RESET:
      return {
        ...state,
        generateCustomerReportSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        generateCustomerReportError: null,
      };
    default:
      return state;
  }
};

export const generateCashoutReportReducer = (state = { generateCashoutReportData: {} }, action) => {
  switch (action.type) {
    case GENERATE_CASHOUT_REPORT_REQUEST:
      return {
        ...state,
        generateCashoutReportLoading: true,
      };
    case GENERATE_CASHOUT_REPORT_SUCCESS:
      return {
        generateCashoutReportLoading: false,
        generateCashoutReportSuccess: true,
        generateCashoutReportData: action.payload,
      };
    case GENERATE_CASHOUT_REPORT_FAIL:
      return {
        ...state,
        generateCashoutReportLoading: false,
        generateCashoutReportError: action.payload,
      };
    case GENERATE_CASHOUT_REPORT_RESET:
      return {
        ...state,
        generateCashoutReportSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        generateCashoutReportError: null,
      };
    default:
      return state;
  }
};

export const loadReportReducer = (
  state = { reportData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_REPORT_REQUEST:
      return {
        reportLoading: true,
      };
    case LOAD_REPORT_SUCCESS:
      return {
        ...state,
        reportLoading: false,
        reportData: action.payload,
      };
    case LOAD_REPORT_FAIL:
      return {
        ...state,
        reportLoading: false,
        reportData: null,
        reportError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        reportError: null,
      };
    default:
      return state;
  }
};
