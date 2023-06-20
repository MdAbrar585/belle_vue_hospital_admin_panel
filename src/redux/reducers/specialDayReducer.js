import {
  CLEAR_ERRORS,
  CREATE_SPECIAL_DAY_FAIL,
  CREATE_SPECIAL_DAY_REQUEST,
  CREATE_SPECIAL_DAY_RESET,
  CREATE_SPECIAL_DAY_SUCCESS,
  DELETE_SPECIAL_DAY_FAIL,
  DELETE_SPECIAL_DAY_REQUEST,
  DELETE_SPECIAL_DAY_RESET,
  DELETE_SPECIAL_DAY_SUCCESS,
  LOAD_SPECIAL_DAY_FAIL,
  LOAD_SPECIAL_DAY_REQUEST,
  LOAD_SPECIAL_DAY_SUCCESS,
  SEND_SPECIAL_DAY_FAIL,
  SEND_SPECIAL_DAY_REQUEST,
  SEND_SPECIAL_DAY_RESET,
  SEND_SPECIAL_DAY_SUCCESS,
  UPDATE_SPECIAL_DAY_FAIL,
  UPDATE_SPECIAL_DAY_REQUEST,
  UPDATE_SPECIAL_DAY_RESET,
  UPDATE_SPECIAL_DAY_SUCCESS,
} from "../constants/specialDayConstant";

export const createSpecialDayReducer = (
  state = { createdSpecialDayData: {} },
  action
) => {
  switch (action.type) {
    case CREATE_SPECIAL_DAY_REQUEST:
      return {
        ...state,
        createdSpecialDayLoading: true,
      };
    case CREATE_SPECIAL_DAY_SUCCESS:
      return {
        createdSpecialDayLoading: false,
        createdSpecialDaySuccess: true,
        createdSpecialDayData: action.payload,
      };
    case CREATE_SPECIAL_DAY_FAIL:
      return {
        ...state,
        createdSpecialDayLoading: false,
        createdSpecialDayError: action.payload,
      };
    case CREATE_SPECIAL_DAY_RESET:
      return {
        ...state,
        createdSpecialDaySuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdSpecialDayError: null,
      };
    default:
      return state;
  }
};

export const sendSpecialDayReducer = (
  state = { senddSpecialDayData: {} },
  action
) => {
  switch (action.type) {
    case SEND_SPECIAL_DAY_REQUEST:
      return {
        ...state,
        senddSpecialDayLoading: true,
      };
    case SEND_SPECIAL_DAY_SUCCESS:
      return {
        senddSpecialDayLoading: false,
        senddSpecialDaySuccess: true,
        senddSpecialDayData: action.payload,
      };
    case SEND_SPECIAL_DAY_FAIL:
      return {
        ...state,
        senddSpecialDayLoading: false,
        senddSpecialDayError: action.payload,
      };
    case SEND_SPECIAL_DAY_RESET:
      return {
        ...state,
        senddSpecialDaySuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        senddSpecialDayError: null,
      };
    default:
      return state;
  }
};
export const loadSpecialDayReducer = (
  state = { specialDayData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_SPECIAL_DAY_REQUEST:
      return {
        specialDayLoading: true,
      };
    case LOAD_SPECIAL_DAY_SUCCESS:
      return {
        ...state,
        specialDayLoading: false,
        specialDayData: action.payload,
      };
    case LOAD_SPECIAL_DAY_FAIL:
      return {
        ...state,
        specialDayLoading: false,
        specialDayData: null,
        specialDayError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        specialDayError: null,
      };
    default:
      return state;
  }
};

export const deleteSpecialDayReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SPECIAL_DAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SPECIAL_DAY_SUCCESS:
      return {
        ...state,
        loading: false,
        isSpecialDayDeleted: true,
        message: action.payload,
      };

    case DELETE_SPECIAL_DAY_FAIL:
      return {
        ...state,
        loading: false,
        deleteSpecialDayError: action.payload,
      };
    case DELETE_SPECIAL_DAY_RESET:
      return {
        ...state,
        isSpecialDayDeleted: false,
        deleteSpecialDayError: null,
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

export const updateSpecialDayReducer = (state = { updatedSpecialDay: {} }, action) => {
  switch (action.type) {
    case UPDATE_SPECIAL_DAY_REQUEST:
      return {
        ...state,
        updatedSpecialDayLoading: true,
      };
    case UPDATE_SPECIAL_DAY_SUCCESS:
      return {
        updatedSpecialDayLoading: false,
        updatedSpecialDaySuccess: true,
        updatedSpecialDay: action.payload,
      };
    case UPDATE_SPECIAL_DAY_FAIL:
      return {
        ...state,
        updatedSpecialDayLoading: false,
        updatedSpecialDayError: action.payload,
      };
    case UPDATE_SPECIAL_DAY_RESET:
      return {
        ...state,
        updatedSpecialDaySuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedSpecialDayError: null,
      };
    default:
      return state;
  }
};