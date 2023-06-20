import {
  CLEAR_ERRORS,
  CREATE_DESIGNATION_FAIL,
  CREATE_DESIGNATION_REQUEST,
  CREATE_DESIGNATION_RESET,
  CREATE_DESIGNATION_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_RESET,
  CREATE_USER_SUCCESS,
  CREATE_USER_TYPE_FAIL,
  CREATE_USER_TYPE_REQUEST,
  CREATE_USER_TYPE_RESET,
  CREATE_USER_TYPE_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  LOAD_DESIGNATION_FAIL,
  LOAD_DESIGNATION_REQUEST,
  LOAD_DESIGNATION_SUCCESS,
  LOAD_INTERNAL_USER_BY_ID_FAIL,
  LOAD_INTERNAL_USER_BY_ID_REQUEST,
  LOAD_INTERNAL_USER_BY_ID_SUCCESS,
  LOAD_INTERNAL_USER_FAIL,
  LOAD_INTERNAL_USER_REQUEST,
  LOAD_INTERNAL_USER_SUCCESS,
  LOAD_USER_TYPE_FAIL,
  LOAD_USER_TYPE_REQUEST,
  LOAD_USER_TYPE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
} from "../constants/userConstant";

export const loadInternalUserReducer = (
  state = { internalUserData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_INTERNAL_USER_REQUEST:
      return {
        internalUserLoading: true,
      };
    case LOAD_INTERNAL_USER_SUCCESS:
      return {
        ...state,
        internalUserLoading: false,
        internalUserData: action.payload,
      };
    case LOAD_INTERNAL_USER_FAIL:
      return {
        ...state,
        internalUserLoading: false,
        internalUserData: null,
        internalUserError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        internalUserError: null,
      };
    default:
      return state;
  }
};

export const createUserReducer = (state = { createdUser: {} }, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        createdUserLoading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        createdUserLoading: false,
        createdUserSuccess: true,
        createdUser: action.payload,
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        createdUserLoading: false,
        createdUserError: action.payload,
      };
    case CREATE_USER_RESET:
      return {
        ...state,
        createdUserSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdUserError: null,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (state = { updatedUser: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updatedUserLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        updatedUserLoading: false,
        updatedUserSuccess: true,
        updatedUser: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        updatedUserLoading: false,
        updatedUserError: action.payload,
      };
    case UPDATE_USER_RESET:
      return {
        ...state,
        updatedUserSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedUserError: null,
      };
    default:
      return state;
  }
};


export const loadUserTypeReducer = (
  state = { loadUserTypeData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_USER_TYPE_REQUEST:
      return {
        loadUserTypeLoading: true,
      };
    case LOAD_USER_TYPE_SUCCESS:
      return {
        ...state,
        loadUserTypeLoading: false,
        loadUserTypeData: action.payload,
      };
    case LOAD_USER_TYPE_FAIL:
      return {
        ...state,
        loadUserTypeLoading: false,
        loadUserTypeData: null,
        loadUserTypeError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadUserTypeError: null,
      };
    default:
      return state;
  }
};

export const createDesignationReducer = (state = { createdDesignationData: {} }, action) => {
  switch (action.type) {
    case CREATE_DESIGNATION_REQUEST:
      return {
        ...state,
        createdDesignationLoading: true,
      };
    case CREATE_DESIGNATION_SUCCESS:
      return {
        createdDesignationLoading: false,
        createdDesignationSuccess: true,
        createdDesignationData: action.payload,
      };
    case CREATE_DESIGNATION_FAIL:
      return {
        ...state,
        createdDesignationLoading: false,
        createdDesignationError: action.payload,
      };
    case CREATE_DESIGNATION_RESET:
      return {
        ...state,
        createdDesignationSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdDesignationError: null,
      };
    default:
      return state;
  }
};

export const loadDesignationReducer = (
  state = { loadDesignationData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_DESIGNATION_REQUEST:
      return {
        loadDesignationLoading: true,
      };
    case LOAD_DESIGNATION_SUCCESS:
      return {
        ...state,
        loadDesignationLoading: false,
        loadDesignationData: action.payload,
      };
    case LOAD_DESIGNATION_FAIL:
      return {
        ...state,
        loadDesignationLoading: false,
        loadDesignationData: null,
        loadDesignationError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loadDesignationError: null,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserDeleted: true,
        message: action.payload,
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        deleteUserError: action.payload,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isUserDeleted: false,
        deleteUserError: null,
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

export const createUserTypeReducer = (state = { createdUserTypeData: {} }, action) => {
  switch (action.type) {
    case CREATE_USER_TYPE_REQUEST:
      return {
        ...state,
        createdUserTypeLoading: true,
      };
    case CREATE_USER_TYPE_SUCCESS:
      return {
        createdUserTypeLoading: false,
        createdUserTypeSuccess: true,
        createdUserTypeData: action.payload,
      };
    case CREATE_USER_TYPE_FAIL:
      return {
        ...state,
        createdUserTypeLoading: false,
        createdUserTypeError: action.payload,
      };
    case CREATE_USER_TYPE_RESET:
      return {
        ...state,
        createdUserTypeSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdUserTypeError: null,
      };
    default:
      return state;
  }
};

export const loadUserDetailsReducer = (
  state = { userDetailsData: {} },
  action
) => {
  switch (action.type) {
    case LOAD_INTERNAL_USER_BY_ID_REQUEST:
      return {
        userDetailsLoading: true,
      };
    case LOAD_INTERNAL_USER_BY_ID_SUCCESS:
      return {
        ...state,
        userDetailsLoading: false,
        userDetailsData: action.payload,
      };
    case LOAD_INTERNAL_USER_BY_ID_FAIL:
      return {
        ...state,
        userDetailsLoading: false,
        userDetailsData: null,
        userDetailsError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        userDetailsError: null,
      };
    default:
      return state;
  }
};