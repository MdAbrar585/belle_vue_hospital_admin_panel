import { APPROVE_CUSTOMER_FAIL, APPROVE_CUSTOMER_REQUEST, APPROVE_CUSTOMER_RESET, APPROVE_CUSTOMER_SUCCESS, CLEAR_ERRORS, CREATE_CUSTOMER_FAIL, CREATE_CUSTOMER_REQUEST, CREATE_CUSTOMER_RESET, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_TYPE_FAIL, CREATE_CUSTOMER_TYPE_REQUEST, CREATE_CUSTOMER_TYPE_RESET, CREATE_CUSTOMER_TYPE_SUCCESS, DECLINE_CUSTOMER_FAIL, DECLINE_CUSTOMER_REQUEST, DECLINE_CUSTOMER_RESET, DECLINE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAIL, DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_RESET, DELETE_CUSTOMER_SUCCESS, LOAD_CONCERN_TYPE_FAIL, LOAD_CONCERN_TYPE_REQUEST, LOAD_CONCERN_TYPE_SUCCESS, LOAD_CUSTOMER_DETAILS_FAIL, LOAD_CUSTOMER_DETAILS_REQUEST, LOAD_CUSTOMER_DETAILS_SUCCESS, LOAD_CUSTOMER_FAIL, LOAD_CUSTOMER_REQUEST, LOAD_CUSTOMER_SUCCESS, LOAD_CUSTOMER_TYPE_FAIL, LOAD_CUSTOMER_TYPE_REQUEST, LOAD_CUSTOMER_TYPE_SUCCESS, UPDATE_CUSTOMER_FAIL, UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_RESET, UPDATE_CUSTOMER_SUCCESS, UPLOAD_CUSTOMER_DATA_FAIL, UPLOAD_CUSTOMER_DATA_REQUEST, UPLOAD_CUSTOMER_DATA_RESET, UPLOAD_CUSTOMER_DATA_SUCCESS } from "../constants/customerConstant";

export const loadCustomerReducer = (
    state = { loadCustomerData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_CUSTOMER_REQUEST:
        return {
          loadCustomerLoading: true,
        };
      case LOAD_CUSTOMER_SUCCESS:
        return {
          ...state,
          loadCustomerLoading: false,
          loadCustomerData: action.payload,
        };
      case LOAD_CUSTOMER_FAIL:
        return {
          ...state,
          loadCustomerLoading: false,
          loadCustomerData: null,
          loadCustomerError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadCustomerError: null,
        };
      default:
        return state;
    }
};

export const loadConcernTypeReducer = (
  state = { concernTypeData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CONCERN_TYPE_REQUEST:
      return {
        concernTypeLoading: true,
      };
    case LOAD_CONCERN_TYPE_SUCCESS:
      return {
        ...state,
        concernTypeLoading: false,
        concernTypeData: action.payload,
      };
    case LOAD_CONCERN_TYPE_FAIL:
      return {
        ...state,
        concernTypeLoading: false,
        concernTypeData: null,
        concernTypeError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        concernTypeError: null,
      };
    default:
      return state;
  }
};

export const loadCustomerDetailsReducer = (
  state = { customerDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CUSTOMER_DETAILS_REQUEST:
      return {
        customerDetailsLoading: true,
      };
    case LOAD_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        customerDetailsLoading: false,
        customerDetailsData: action.payload,
      };
    case LOAD_CUSTOMER_DETAILS_FAIL:
      return {
        ...state,
        customerDetailsLoading: false,
        customerDetailsData: null,
        customerDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        customerDetailsError: null,
      };
    default:
      return state;
  }
};
  
export const loadCustomerTypeReducer = (
  state = { loadCustomerTypeData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_CUSTOMER_TYPE_REQUEST:
      return {
        loadCustomerTypeLoading: true,
      };
    case LOAD_CUSTOMER_TYPE_SUCCESS:
      return {
        ...state,
        loadCustomerTypeLoading: false,
        loadCustomerTypeData: action.payload,
      };
    case LOAD_CUSTOMER_TYPE_FAIL:
      return {
        ...state,
        loadCustomerTypeLoading: false,
        loadCustomerTypeData: null,
        loadCustomerTypeError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadCustomerTypeError: null,
      };
    default:
      return state;
  }
};
  
  export const createCustomerReducer = (state = { createdCustomer: {} }, action) => {
    switch (action.type) {
      case CREATE_CUSTOMER_REQUEST:
        return {
          ...state,
          createdCustomerLoading: true,
        };
      case CREATE_CUSTOMER_SUCCESS:
        return {
          createdCustomerLoading: false,
          createdCustomerSuccess: true,
          createdCustomer: action.payload,
        };
      case CREATE_CUSTOMER_FAIL:
        return {
          ...state,
          createdCustomerLoading: false,
          createdCustomerError: action.payload,
        };
      case CREATE_CUSTOMER_RESET:
        return {
          ...state,
          createdCustomerSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          createdCustomerError: null,
        };
      default:
        return state;
    }
};

export const createCustomerTypeReducer = (state = { createdCustomerTypeData: {} }, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER_TYPE_REQUEST:
      return {
        ...state,
        createdCustomerTypeLoading: true,
      };
    case CREATE_CUSTOMER_TYPE_SUCCESS:
      return {
        createdCustomerTypeLoading: false,
        createdCustomerTypeSuccess: true,
        createdCustomerTypeData: action.payload,
      };
    case CREATE_CUSTOMER_TYPE_FAIL:
      return {
        ...state,
        createdCustomerTypeLoading: false,
        createdCustomerTypeError: action.payload,
      };
    case CREATE_CUSTOMER_TYPE_RESET:
      return {
        ...state,
        createdCustomerTypeSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdCustomerTypeError: null,
      };
    default:
      return state;
  }
};
  
export const approveCustomerReducer = (state = { approveCustomerData: {} }, action) => {
  switch (action.type) {
    case APPROVE_CUSTOMER_REQUEST:
      return {
        ...state,
        approveCustomerLoading: true,
      };
    case APPROVE_CUSTOMER_SUCCESS:
      return {
        approveCustomerLoading: false,
        approveCustomerSuccess: true,
        approveCustomerData: action.payload,
      };
    case APPROVE_CUSTOMER_FAIL:
      return {
        ...state,
        approveCustomerLoading: false,
        approveCustomerError: action.payload,
      };
    case APPROVE_CUSTOMER_RESET:
      return {
        ...state,
        approveCustomerSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        approveCustomerError: null,
      };
    default:
      return state;
  }
};

export const declineCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case DECLINE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DECLINE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.payload,
      };

    case DECLINE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        declineCustomerError: action.payload,
      };
    case DECLINE_CUSTOMER_RESET:
      return {
        ...state,
        isDeleted: false,
        declineCustomerError: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        isCustomerDeleted: true,
        message: action.payload,
      };

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        deleteCustomerError: action.payload,
      };
    case DELETE_CUSTOMER_RESET:
      return {
        ...state,
        isCustomerDeleted: false,
        deleteCustomerError: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const uploadCustomerDataReducer = (state = { uploadCustomerData: {} }, action) => {
  switch (action.type) {
    case UPLOAD_CUSTOMER_DATA_REQUEST:
      return {
        ...state,
        uploadCustomerLoading: true,
      };
    case UPLOAD_CUSTOMER_DATA_SUCCESS:
      return {
        uploadCustomerLoading: false,
        uploadCustomerSuccess: true,
        uploadCustomerData: action.payload,
      };
    case UPLOAD_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        uploadCustomerLoading: false,
        uploadCustomerError: action.payload,
      };
    case UPLOAD_CUSTOMER_DATA_RESET:
      return {
        ...state,
        uploadCustomerSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        uploadCustomerError: null,
      };
    default:
      return state;
  }
};

export const updateCustomerReducer = (state = { updatedCustomer: {} }, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        updatedCustomerLoading: true,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        updatedCustomerLoading: false,
        updatedCustomerSuccess: true,
        updatedCustomer: action.payload,
      };
    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        updatedCustomerLoading: false,
        updatedCustomerError: action.payload,
      };
    case UPDATE_CUSTOMER_RESET:
      return {
        ...state,
        updatedCustomerSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedCustomerError: null,
      };
    default:
      return state;
  }
};