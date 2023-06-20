import { APPROVE_OFFER_FAIL, APPROVE_OFFER_REQUEST, APPROVE_OFFER_RESET, APPROVE_OFFER_SUCCESS, CLEAR_ERRORS, CREATE_OFFER_FAIL, CREATE_OFFER_REQUEST, CREATE_OFFER_RESET, CREATE_OFFER_SUCCESS, DECLINE_OFFER_FAIL, DECLINE_OFFER_REQUEST, DECLINE_OFFER_RESET, DECLINE_OFFER_SUCCESS, DELETE_OFFER_FAIL, DELETE_OFFER_REQUEST, DELETE_OFFER_RESET, DELETE_OFFER_SUCCESS, LOAD_OFFER_DETAILS_FAIL, LOAD_OFFER_DETAILS_REQUEST, LOAD_OFFER_DETAILS_SUCCESS, LOAD_OFFER_FAIL, LOAD_OFFER_REQUEST, LOAD_OFFER_SUCCESS, UPDATE_OFFER_FAIL, UPDATE_OFFER_REQUEST, UPDATE_OFFER_RESET, UPDATE_OFFER_SUCCESS } from "../constants/offerConstant";

export const loadOfferReducer = (
    state = { loadOfferData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_OFFER_REQUEST:
        return {
          loadOfferLoading: true,
        };
      case LOAD_OFFER_SUCCESS:
        return {
          ...state,
          loadOfferLoading: false,
          loadOfferData: action.payload,
        };
      case LOAD_OFFER_FAIL:
        return {
          ...state,
          loadOfferLoading: false,
          loadOfferData: null,
          loadOfferError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadOfferError: null,
        };
      default:
        return state;
    }
};

export const createOfferReducer = (state = { createdOffer: {} }, action) => {
    switch (action.type) {
      case CREATE_OFFER_REQUEST:
        return {
          ...state,
          createdOfferLoading: true,
        };
      case CREATE_OFFER_SUCCESS:
        return {
          createdOfferLoading: false,
          createdOfferSuccess: true,
          createdOffer: action.payload,
        };
      case CREATE_OFFER_FAIL:
        return {
          ...state,
          createdOfferLoading: false,
          createdOfferError: action.payload,
        };
      case CREATE_OFFER_RESET:
        return {
          ...state,
          createdOfferSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          createdOfferError: null,
        };
      default:
        return state;
    }
};

export const approveOfferReducer = (state = { approveOfferData: {} }, action) => {
  switch (action.type) {
    case APPROVE_OFFER_REQUEST:
      return {
        ...state,
        approveOfferLoading: true,
      };
    case APPROVE_OFFER_SUCCESS:
      return {
        approveOfferLoading: false,
        approveOfferSuccess: true,
        approveOfferData: action.payload,
      };
    case APPROVE_OFFER_FAIL:
      return {
        ...state,
        approveOfferLoading: false,
        approveOfferError: action.payload,
      };
    case APPROVE_OFFER_RESET:
      return {
        ...state,
        approveOfferSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        approveOfferError: null,
      };
    default:
      return state;
  }
};

export const deActiveOfferReducer = (state = {}, action) => {
  switch (action.type) {
    case DECLINE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DECLINE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.payload,
      };

    case DECLINE_OFFER_FAIL:
      return {
        ...state,
        loading: false,
        deActiveOfferError: action.payload,
      };
    case DECLINE_OFFER_RESET:
      return {
        ...state,
        isDeleted: false,
        deActiveOfferError: null,
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

export const loadOfferDetailsReducer = (
  state = { offerDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_OFFER_DETAILS_REQUEST:
      return {
        offerDetailsLoading: true,
      };
    case LOAD_OFFER_DETAILS_SUCCESS:
      return {
        ...state,
        offerDetailsLoading: false,
        offerDetailsData: action.payload,
      };
    case LOAD_OFFER_DETAILS_FAIL:
      return {
        ...state,
        offerDetailsLoading: false,
        offerDetailsData: null,
        offerDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        offerDetailsError: null,
      };
    default:
      return state;
  }
};

export const updateOfferReducer = (state = { updatedOffer: {} }, action) => {
  switch (action.type) {
    case UPDATE_OFFER_REQUEST:
      return {
        ...state,
        updatedOfferLoading: true,
      };
    case UPDATE_OFFER_SUCCESS:
      return {
        updatedOfferLoading: false,
        updatedOfferSuccess: true,
        updatedOffer: action.payload,
      };
    case UPDATE_OFFER_FAIL:
      return {
        ...state,
        updatedOfferLoading: false,
        updatedOfferError: action.payload,
      };
    case UPDATE_OFFER_RESET:
      return {
        ...state,
        updatedOfferSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedOfferError: null,
      };
    default:
      return state;
  }
};

export const deleteOfferReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        isOfferDeleted: true,
        message: action.payload,
      };

    case DELETE_OFFER_FAIL:
      return {
        ...state,
        loading: false,
        deleteOfferError: action.payload,
      };
    case DELETE_OFFER_RESET:
      return {
        ...state,
        isOfferDeleted: false,
        deleteOfferError: null,
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
