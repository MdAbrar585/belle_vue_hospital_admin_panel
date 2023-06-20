import { APPROVE_LIFE_STYLE_FAIL, APPROVE_LIFE_STYLE_REQUEST, APPROVE_LIFE_STYLE_RESET, APPROVE_LIFE_STYLE_SUCCESS, CLEAR_ERRORS, CREATE_LIFE_STYLE_FAIL, CREATE_LIFE_STYLE_REQUEST, CREATE_LIFE_STYLE_RESET, CREATE_LIFE_STYLE_SUCCESS, DECLINE_LIFE_STYLE_FAIL, DECLINE_LIFE_STYLE_REQUEST, DECLINE_LIFE_STYLE_RESET, DECLINE_LIFE_STYLE_SUCCESS, DELETE_LIFE_STYLE_FAIL, DELETE_LIFE_STYLE_REQUEST, DELETE_LIFE_STYLE_RESET, DELETE_LIFE_STYLE_SUCCESS, LOAD_LIFE_STYLE_DETAILS_FAIL, LOAD_LIFE_STYLE_DETAILS_REQUEST, LOAD_LIFE_STYLE_DETAILS_SUCCESS, LOAD_LIFE_STYLE_FAIL, LOAD_LIFE_STYLE_REQUEST, LOAD_LIFE_STYLE_SUCCESS, UPDATE_LIFE_STYLE_FAIL, UPDATE_LIFE_STYLE_REQUEST, UPDATE_LIFE_STYLE_RESET, UPDATE_LIFE_STYLE_SUCCESS } from "../constants/lifeStyleConstant";

export const loadLifeStyleReducer = (
    state = { loadLifeStyleData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_LIFE_STYLE_REQUEST:
        return {
          loadLifeStyleLoading: true,
        };
      case LOAD_LIFE_STYLE_SUCCESS:
        return {
          ...state,
          loadLifeStyleLoading: false,
          loadLifeStyleData: action.payload,
        };
      case LOAD_LIFE_STYLE_FAIL:
        return {
          ...state,
          loadLifeStyleLoading: false,
          loadLifeStyleData: null,
          loadLifeStyleError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadLifeStyleError: null,
        };
      default:
        return state;
    }
};

export const createLifeStyleReducer = (state = { createdLifeStyle: {} }, action) => {
    switch (action.type) {
      case CREATE_LIFE_STYLE_REQUEST:
        return {
          ...state,
          createdLifeStyleLoading: true,
        };
      case CREATE_LIFE_STYLE_SUCCESS:
        return {
          createdLifeStyleLoading: false,
          createdLifeStyleSuccess: true,
          createdLifeStyle: action.payload,
        };
      case CREATE_LIFE_STYLE_FAIL:
        return {
          ...state,
          createdLifeStyleLoading: false,
          createdLifeStyleError: action.payload,
        };
      case CREATE_LIFE_STYLE_RESET:
        return {
          ...state,
          createdLifeStyleSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          createdLifeStyleError: null,
        };
      default:
        return state;
    }
};

export const acticeDeactiveLifeStyleToggleReducer = (state = { acticeDeactiveLifeStyleToggleData: {} }, action) => {
  switch (action.type) {
    case APPROVE_LIFE_STYLE_REQUEST:
      return {
        ...state,
        acticeDeactiveLifeStyleToggleLoading: true,
      };
    case APPROVE_LIFE_STYLE_SUCCESS:
      return {
        acticeDeactiveLifeStyleToggleLoading: false,
        acticeDeactiveLifeStyleToggleSuccess: true,
        acticeDeactiveLifeStyleToggleData: action.payload,
      };
    case APPROVE_LIFE_STYLE_FAIL:
      return {
        ...state,
        acticeDeactiveLifeStyleToggleLoading: false,
        acticeDeactiveLifeStyleToggleError: action.payload,
      };
    case APPROVE_LIFE_STYLE_RESET:
      return {
        ...state,
        acticeDeactiveLifeStyleToggleSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        acticeDeactiveLifeStyleToggleError: null,
      };
    default:
      return state;
  }
};

export const deActiveLifeStyleReducer = (state = {}, action) => {
  switch (action.type) {
    case DECLINE_LIFE_STYLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DECLINE_LIFE_STYLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.payload,
      };

    case DECLINE_LIFE_STYLE_FAIL:
      return {
        ...state,
        loading: false,
        deActiveLifeStyleError: action.payload,
      };
    case DECLINE_LIFE_STYLE_RESET:
      return {
        ...state,
        isDeleted: false,
        deActiveLifeStyleError: null,
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

export const updateLifeStyleReducer = (state = { updatedLifeStyle: {} }, action) => {
  switch (action.type) {
    case UPDATE_LIFE_STYLE_REQUEST:
      return {
        ...state,
        updatedLifeStyleLoading: true,
      };
    case UPDATE_LIFE_STYLE_SUCCESS:
      return {
        updatedLifeStyleLoading: false,
        updatedLifeStyleSuccess: true,
        updatedLifeStyle: action.payload,
      };
    case UPDATE_LIFE_STYLE_FAIL:
      return {
        ...state,
        updatedLifeStyleLoading: false,
        updatedLifeStyleError: action.payload,
      };
    case UPDATE_LIFE_STYLE_RESET:
      return {
        ...state,
        updatedLifeStyleSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedLifeStyleError: null,
      };
    default:
      return state;
  }
};

export const loadLifeStyleDetailsReducer = (
  state = { lifeStyleDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_LIFE_STYLE_DETAILS_REQUEST:
      return {
        lifeStyleDetailsLoading: true,
      };
    case LOAD_LIFE_STYLE_DETAILS_SUCCESS:
      return {
        ...state,
        lifeStyleDetailsLoading: false,
        lifeStyleDetailsData: action.payload,
      };
    case LOAD_LIFE_STYLE_DETAILS_FAIL:
      return {
        ...state,
        lifeStyleDetailsLoading: false,
        lifeStyleDetailsData: null,
        lifeStyleDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        lifeStyleDetailsError: null,
      };
    default:
      return state;
  }
};

export const deleteLifeStyleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LIFE_STYLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LIFE_STYLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isLifeStyleDeleted: true,
        message: action.payload,
      };

    case DELETE_LIFE_STYLE_FAIL:
      return {
        ...state,
        loading: false,
        deleteLifeStyleError: action.payload,
      };
    case DELETE_LIFE_STYLE_RESET:
      return {
        ...state,
        isLifeStyleDeleted: false,
        deleteLifeStyleError: null,
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