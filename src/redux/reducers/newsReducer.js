import {
  CLEAR_ERRORS,
  CREATE_NEWS_FAIL,
  CREATE_NEWS_REQUEST,
  CREATE_NEWS_RESET,
  CREATE_NEWS_SUCCESS,
  DELETE_NEWS_FAIL,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_RESET,
  DELETE_NEWS_SUCCESS,
  LOAD_NEWS_DETAILS_FAIL,
  LOAD_NEWS_DETAILS_REQUEST,
  LOAD_NEWS_DETAILS_SUCCESS,
  LOAD_NEWS_FAIL,
  LOAD_NEWS_REQUEST,
  LOAD_NEWS_SUCCESS,
  UPDATE_NEWS_FAIL,
  UPDATE_NEWS_REQUEST,
  UPDATE_NEWS_RESET,
  UPDATE_NEWS_SUCCESS,
} from "../constants/newsConstant";

export const loadNewsReducer = (state = { loadNewsData: {} }, action) => {
  switch (action.type) {
    case LOAD_NEWS_REQUEST:
      return {
        loadNewsLoading: true,
      };
    case LOAD_NEWS_SUCCESS:
      return {
        ...state,
        loadNewsLoading: false,
        loadNewsData: action.payload,
      };
    case LOAD_NEWS_FAIL:
      return {
        ...state,
        loadNewsLoading: false,
        loadNewsData: null,
        loadNewsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadNewsError: null,
      };
    default:
      return state;
  }
};

export const createNewsReducer = (state = { createdNewsData: {} }, action) => {
  switch (action.type) {
    case CREATE_NEWS_REQUEST:
      return {
        ...state,
        createdNewsLoading: true,
      };
    case CREATE_NEWS_SUCCESS:
      return {
        createdNewsLoading: false,
        createdNewsSuccess: true,
        createdNewsData: action.payload,
      };
    case CREATE_NEWS_FAIL:
      return {
        ...state,
        createdNewsLoading: false,
        createdNewsError: action.payload,
      };
    case CREATE_NEWS_RESET:
      return {
        ...state,
        createdNewsSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdNewsError: null,
      };
    default:
      return state;
  }
};

export const loadNewsDetailsReducer = (
  state = { newsDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_NEWS_DETAILS_REQUEST:
      return {
        newsDetailsLoading: true,
      };
    case LOAD_NEWS_DETAILS_SUCCESS:
      return {
        ...state,
        newsDetailsLoading: false,
        newsDetailsData: action.payload,
      };
    case LOAD_NEWS_DETAILS_FAIL:
      return {
        ...state,
        newsDetailsLoading: false,
        newsDetailsData: null,
        newsDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        newsDetailsError: null,
      };
    default:
      return state;
  }
};

export const deleteNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        isNewsDeleted: true,
        message: action.payload,
      };

    case DELETE_NEWS_FAIL:
      return {
        ...state,
        loading: false,
        deleteNewsError: action.payload,
      };
    case DELETE_NEWS_RESET:
      return {
        ...state,
        isNewsDeleted: false,
        deleteNewsError: null,
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

export const updateNewsReducer = (state = { updatedNews: {} }, action) => {
  switch (action.type) {
    case UPDATE_NEWS_REQUEST:
      return {
        ...state,
        updatedNewsLoading: true,
      };
    case UPDATE_NEWS_SUCCESS:
      return {
        updatedNewsLoading: false,
        updatedNewsSuccess: true,
        updatedNews: action.payload,
      };
    case UPDATE_NEWS_FAIL:
      return {
        ...state,
        updatedNewsLoading: false,
        updatedNewsError: action.payload,
      };
    case UPDATE_NEWS_RESET:
      return {
        ...state,
        updatedNewsSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedNewsError: null,
      };
    default:
      return state;
  }
};