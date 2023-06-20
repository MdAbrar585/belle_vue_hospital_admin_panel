import { CLEAR_ERRORS, CREATE_PARTNER_FAIL, CREATE_PARTNER_REQUEST, CREATE_PARTNER_RESET, CREATE_PARTNER_SERVICE_FAIL, CREATE_PARTNER_SERVICE_REQUEST, CREATE_PARTNER_SERVICE_RESET, CREATE_PARTNER_SERVICE_SUCCESS, CREATE_PARTNER_SERVICE_TYPE_FAIL, CREATE_PARTNER_SERVICE_TYPE_REQUEST, CREATE_PARTNER_SERVICE_TYPE_RESET, CREATE_PARTNER_SERVICE_TYPE_SUCCESS, CREATE_PARTNER_SUCCESS, CREATE_PARTNER_TYPE_FAIL, CREATE_PARTNER_TYPE_REQUEST, CREATE_PARTNER_TYPE_RESET, CREATE_PARTNER_TYPE_SUCCESS, DELETE_PARTNER_FAIL, DELETE_PARTNER_REQUEST, DELETE_PARTNER_RESET, DELETE_PARTNER_SERVICE_FAIL, DELETE_PARTNER_SERVICE_REQUEST, DELETE_PARTNER_SERVICE_RESET, DELETE_PARTNER_SERVICE_SUCCESS, DELETE_PARTNER_SUCCESS, LOAD_PARTNER_DETAILS_FAIL, LOAD_PARTNER_DETAILS_REQUEST, LOAD_PARTNER_DETAILS_SUCCESS, LOAD_PARTNER_FAIL, LOAD_PARTNER_REQUEST, LOAD_PARTNER_SERVICE_DETAILS_FAIL, LOAD_PARTNER_SERVICE_DETAILS_REQUEST, LOAD_PARTNER_SERVICE_DETAILS_SUCCESS, LOAD_PARTNER_SERVICE_FAIL, LOAD_PARTNER_SERVICE_REQUEST, LOAD_PARTNER_SERVICE_SUCCESS, LOAD_PARTNER_SERVICE_TYPE_FAIL, LOAD_PARTNER_SERVICE_TYPE_REQUEST, LOAD_PARTNER_SERVICE_TYPE_SUCCESS, LOAD_PARTNER_SUCCESS, LOAD_PARTNER_TYPE_FAIL, LOAD_PARTNER_TYPE_REQUEST, LOAD_PARTNER_TYPE_SUCCESS, UPDATE_PARTNER_FAIL, UPDATE_PARTNER_REQUEST, UPDATE_PARTNER_RESET, UPDATE_PARTNER_SERVICE_FAIL, UPDATE_PARTNER_SERVICE_REQUEST, UPDATE_PARTNER_SERVICE_RESET, UPDATE_PARTNER_SERVICE_SUCCESS, UPDATE_PARTNER_SUCCESS, UPLOAD_PARTNER_IMAGE_FAIL, UPLOAD_PARTNER_IMAGE_REQUEST, UPLOAD_PARTNER_IMAGE_RESET, UPLOAD_PARTNER_IMAGE_SUCCESS } from "../constants/partnerConstant";

export const loadPartnerReducer = (
    state = { partnerData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_PARTNER_REQUEST:
        return {
          partnerLoading: true,
        };
      case LOAD_PARTNER_SUCCESS:
        return {
          ...state,
          partnerLoading: false,
          partnerData: action.payload,
        };
      case LOAD_PARTNER_FAIL:
        return {
          ...state,
          partnerLoading: false,
          partnerData: null,
          partnerError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          partnerError: null,
        };
      default:
        return state;
    }
  };
  
  export const createPartnerReducer = (state = { createdPartner: {} }, action) => {
    switch (action.type) {
      case CREATE_PARTNER_REQUEST:
        return {
          ...state,
          createdPartnerLoading: true,
        };
      case CREATE_PARTNER_SUCCESS:
        return {
          createdPartnerLoading: false,
          createdPartnerSuccess: true,
          createdPartner: action.payload,
        };
      case CREATE_PARTNER_FAIL:
        return {
          ...state,
          createdPartnerLoading: false,
          createdPartnerError: action.payload,
        };
      case CREATE_PARTNER_RESET:
        return {
          ...state,
          createdPartnerSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          createdPartnerError: null,
        };
      default:
        return state;
    }
};

export const updatePartnerServiceReducer = (state = { updatedPartnerService: {} }, action) => {
  switch (action.type) {
    case UPDATE_PARTNER_SERVICE_REQUEST:
      return {
        ...state,
        updatedPartnerServiceLoading: true,
      };
    case UPDATE_PARTNER_SERVICE_SUCCESS:
      return {
        updatedPartnerServiceLoading: false,
        updatedPartnerServiceSuccess: true,
        updatedPartnerService: action.payload,
      };
    case UPDATE_PARTNER_SERVICE_FAIL:
      return {
        ...state,
        updatedPartnerServiceLoading: false,
        updatedPartnerServiceError: action.payload,
      };
    case UPDATE_PARTNER_SERVICE_RESET:
      return {
        ...state,
        updatedPartnerServiceSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedPartnerServiceError: null,
      };
    default:
      return state;
  }
};

export const deletePartnerServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PARTNER_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PARTNER_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isPartnerServiceDeleted: true,
        message: action.payload,
      };

    case DELETE_PARTNER_SERVICE_FAIL:
      return {
        ...state,
        loading: false,
        deletePartnerServiceError: action.payload,
      };
    case DELETE_PARTNER_SERVICE_RESET:
      return {
        ...state,
        isPartnerServiceDeleted: false,
        deletePartnerServiceError: null,
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

export const updatePartnerReducer = (state = { updatedPartner: {} }, action) => {
  switch (action.type) {
    case UPDATE_PARTNER_REQUEST:
      return {
        ...state,
        updatedPartnerLoading: true,
      };
    case UPDATE_PARTNER_SUCCESS:
      return {
        updatedPartnerLoading: false,
        updatedPartnerSuccess: true,
        updatedPartner: action.payload,
      };
    case UPDATE_PARTNER_FAIL:
      return {
        ...state,
        updatedPartnerLoading: false,
        updatedPartnerError: action.payload,
      };
    case UPDATE_PARTNER_RESET:
      return {
        ...state,
        updatedPartnerSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedPartnerError: null,
      };
    default:
      return state;
  }
};

export const loadPartnerDetailsReducer = (
  state = { partnerDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_PARTNER_DETAILS_REQUEST:
      return {
        partnerDetailsLoading: true,
      };
    case LOAD_PARTNER_DETAILS_SUCCESS:
      return {
        ...state,
        partnerDetailsLoading: false,
        partnerDetailsData: action.payload,
      };
    case LOAD_PARTNER_DETAILS_FAIL:
      return {
        ...state,
        partnerDetailsLoading: false,
        partnerDetailsData: null,
        partnerDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        partnerDetailsError: null,
      };
    default:
      return state;
  }
};
  
export const loadPartnerServiceReducer = (
  state = { partnerServiceData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_PARTNER_SERVICE_REQUEST:
      return {
        partnerServiceLoading: true,
      };
    case LOAD_PARTNER_SERVICE_SUCCESS:
      return {
        ...state,
        partnerServiceLoading: false,
        partnerServiceData: action.payload,
      };
    case LOAD_PARTNER_SERVICE_FAIL:
      return {
        ...state,
        partnerServiceLoading: false,
        partnerServiceData: null,
        partnerServiceError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        partnerServiceError: null,
      };
    default:
      return state;
  }
};

export const loadPartnerServiceDetailsReducer = (
  state = { partnerServiceDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_PARTNER_SERVICE_DETAILS_REQUEST:
      return {
        partnerServiceDetailsLoading: true,
      };
    case LOAD_PARTNER_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        partnerServiceDetailsLoading: false,
        partnerServiceDetailsData: action.payload,
      };
    case LOAD_PARTNER_SERVICE_DETAILS_FAIL:
      return {
        ...state,
        partnerServiceDetailsLoading: false,
        partnerServiceDetailsData: null,
        partnerServiceDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        partnerServiceDetailsError: null,
      };
    default:
      return state;
  }
};

export const deletePartnerReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PARTNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PARTNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isPartnerDeleted: true,
        message: action.payload,
      };

    case DELETE_PARTNER_FAIL:
      return {
        ...state,
        loading: false,
        deletePartnerError: action.payload,
      };
    case DELETE_PARTNER_RESET:
      return {
        ...state,
        isPartnerDeleted: false,
        deletePartnerError: null,
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

export const createPartnerServiceReducer = (state = { createdPartnerServiceData: {} }, action) => {
  switch (action.type) {
    case CREATE_PARTNER_SERVICE_REQUEST:
      return {
        ...state,
        createdPartnerServiceLoading: true,
      };
    case CREATE_PARTNER_SERVICE_SUCCESS:
      return {
        createdPartnerServiceLoading: false,
        createdPartnerServiceSuccess: true,
        createdPartnerServiceData: action.payload,
      };
    case CREATE_PARTNER_SERVICE_FAIL:
      return {
        ...state,
        createdPartnerServiceLoading: false,
        createdPartnerServiceError: action.payload,
      };
    case CREATE_PARTNER_SERVICE_RESET:
      return {
        ...state,
        createdPartnerServiceSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdPartnerServiceError: null,
      };
    default:
      return state;
  }
};

export const createPartnerServiceTypeReducer = (state = { createdPartnerServiceTypeData: {} }, action) => {
  switch (action.type) {
    case CREATE_PARTNER_SERVICE_TYPE_REQUEST:
      return {
        ...state,
        createdPartnerServiceTypeLoading: true,
      };
    case CREATE_PARTNER_SERVICE_TYPE_SUCCESS:
      return {
        createdPartnerServiceTypeLoading: false,
        createdPartnerServiceTypeSuccess: true,
        createdPartnerServiceTypeData: action.payload,
      };
    case CREATE_PARTNER_SERVICE_TYPE_FAIL:
      return {
        ...state,
        createdPartnerServiceTypeLoading: false,
        createdPartnerServiceTypeError: action.payload,
      };
    case CREATE_PARTNER_SERVICE_TYPE_RESET:
      return {
        ...state,
        createdPartnerServiceTypeSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdPartnerServiceTypeError: null,
      };
    default:
      return state;
  }
};

export const loadPartnerServiceTypeReducer = (
  state = { partnerServiceTypeData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_PARTNER_SERVICE_TYPE_REQUEST:
      return {
        partnerServiceTypeLoading: true,
      };
    case LOAD_PARTNER_SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        partnerServiceTypeLoading: false,
        partnerServiceTypeData: action.payload,
      };
    case LOAD_PARTNER_SERVICE_TYPE_FAIL:
      return {
        ...state,
        partnerServiceTypeLoading: false,
        partnerServiceTypeData: null,
        partnerServiceTypeError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        partnerServiceTypeError: null,
      };
    default:
      return state;
  }
};

export const createPartnerTypeReducer = (state = { createdPartnerType: {} }, action) => {
  switch (action.type) {
    case CREATE_PARTNER_TYPE_REQUEST:
      return {
        ...state,
        createdPartnerTypeLoading: true,
      };
    case CREATE_PARTNER_TYPE_SUCCESS:
      return {
        createdPartnerTypeLoading: false,
        createdPartnerTypeSuccess: true,
        createdPartnerType: action.payload,
      };
    case CREATE_PARTNER_TYPE_FAIL:
      return {
        ...state,
        createdPartnerTypeLoading: false,
        createdPartnerTypeError: action.payload,
      };
    case CREATE_PARTNER_TYPE_RESET:
      return {
        ...state,
        createdPartnerTypeSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdPartnerTypeError: null,
      };
    default:
      return state;
  }
};

export const loadPartnerTypeReducer = (
  state = { partnerTypeData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_PARTNER_TYPE_REQUEST:
      return {
        partnerTypeLoading: true,
      };
    case LOAD_PARTNER_TYPE_SUCCESS:
      return {
        ...state,
        partnerTypeLoading: false,
        partnerTypeData: action.payload,
      };
    case LOAD_PARTNER_TYPE_FAIL:
      return {
        ...state,
        partnerTypeLoading: false,
        partnerTypeData: null,
        partnerTypeError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        partnerTypeError: null,
      };
    default:
      return state;
  }
};

export const uploadPartnerImageReducer = (state = { uploadPartnerImage: {} }, action) => {
  switch (action.type) {
    case UPLOAD_PARTNER_IMAGE_REQUEST:
      return {
        ...state,
        uploadPartnerImageLoading: true,
      };
    case UPLOAD_PARTNER_IMAGE_SUCCESS:
      return {
        uploadPartnerImageLoading: false,
        uploadPartnerImageSuccess: true,
        uploadPartnerImageData: action.payload,
      };
    case UPLOAD_PARTNER_IMAGE_FAIL:
      return {
        ...state,
        uploadPartnerImageLoading: false,
        uploadPartnerImageError: action.payload,
      };
    case UPLOAD_PARTNER_IMAGE_RESET:
      return {
        ...state,
        uploadPartnerImageSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        uploadPartnerImageError: null,
      };
    default:
      return state;
  }
};