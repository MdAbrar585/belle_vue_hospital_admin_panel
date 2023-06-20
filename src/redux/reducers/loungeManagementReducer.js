import { ADD_NEW_LOUNGE_FAIL, ADD_NEW_LOUNGE_REQUEST, ADD_NEW_LOUNGE_RESET, ADD_NEW_LOUNGE_SUCCESS, CLEAR_ERRORS, DELETE_LOUNGE_TIMING_FAIL, DELETE_LOUNGE_TIMING_REQUEST, DELETE_LOUNGE_TIMING_RESET, DELETE_LOUNGE_TIMING_SUCCESS, DELETE_NEW_LOUNGE_FAIL, DELETE_NEW_LOUNGE_REQUEST, DELETE_NEW_LOUNGE_RESET, DELETE_NEW_LOUNGE_SUCCESS, EDIT_NEW_LOUNGE_FAIL, EDIT_NEW_LOUNGE_REQUEST, EDIT_NEW_LOUNGE_RESET, EDIT_NEW_LOUNGE_SUCCESS, LOAD_ALL_LOUNGE_LIST_FAIL, LOAD_ALL_LOUNGE_LIST_REQUEST, LOAD_ALL_LOUNGE_LIST_SUCCESS, LOAD_TIMING_BY_LOUNGE_FAIL, LOAD_TIMING_BY_LOUNGE_REQUEST, LOAD_TIMING_BY_LOUNGE_SUCCESS, SET_LOUNGE_TIMING_FAIL, SET_LOUNGE_TIMING_REQUEST, SET_LOUNGE_TIMING_RESET, SET_LOUNGE_TIMING_SUCCESS, TOGGLE_LOUNGE_TIMING_FAIL, TOGGLE_LOUNGE_TIMING_REQUEST, TOGGLE_LOUNGE_TIMING_RESET, TOGGLE_LOUNGE_TIMING_SUCCESS, TOGGLE_NEW_LOUNGE_ACTIVATION_FAIL, TOGGLE_NEW_LOUNGE_ACTIVATION_REQUEST, TOGGLE_NEW_LOUNGE_ACTIVATION_RESET, TOGGLE_NEW_LOUNGE_ACTIVATION_SUCCESS } from "../constants/loungeManagementConstant";

export const loadAllLoungeReducer = (
    state = { loadAllLoungeData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_ALL_LOUNGE_LIST_REQUEST:
        return {
          loadAllLoungeLoading: true,
        };
      case LOAD_ALL_LOUNGE_LIST_SUCCESS:
        return {
          ...state,
          loadAllLoungeLoading: false,
          loadAllLoungeData: action.payload,
        };
      case LOAD_ALL_LOUNGE_LIST_FAIL:
        return {
          ...state,
          loadAllLoungeLoading: false,
          loadAllLoungeData: null,
          loadAllLoungeError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadAllLoungeError: null,
        };
      default:
        return state;
    }
};

export const addNewLoungeReducer = (state = { addNewLoungeData: {} }, action) => {
    switch (action.type) {
      case ADD_NEW_LOUNGE_REQUEST:
        return {
          ...state,
          addNewLoungeLoading: true,
        };
      case ADD_NEW_LOUNGE_SUCCESS:
        return {
          addNewLoungeLoading: false,
          addNewLoungeSuccess: true,
          addNewLoungeData: action.payload,
        };
      case ADD_NEW_LOUNGE_FAIL:
        return {
          ...state,
          addNewLoungeLoading: false,
          addNewLoungeError: action.payload,
        };
      case ADD_NEW_LOUNGE_RESET:
        return {
          ...state,
          addNewLoungeSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          addNewLoungeError: null,
        };
      default:
        return state;
    }
};

export const editNewLoungeReducer = (state = { editNewLoungeData: {} }, action) => {
    switch (action.type) {
      case EDIT_NEW_LOUNGE_REQUEST:
        return {
          ...state,
          editNewLoungeLoading: true,
        };
      case EDIT_NEW_LOUNGE_SUCCESS:
        return {
          editNewLoungeLoading: false,
          editNewLoungeSuccess: true,
          editNewLoungeData: action.payload,
        };
      case EDIT_NEW_LOUNGE_FAIL:
        return {
          ...state,
          editNewLoungeLoading: false,
          editNewLoungeError: action.payload,
        };
      case EDIT_NEW_LOUNGE_RESET:
        return {
          ...state,
          editNewLoungeSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          editNewLoungeError: null,
        };
      default:
        return state;
    }
};

export const deleteNewLoungeReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_NEW_LOUNGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_NEW_LOUNGE_SUCCESS:
        return {
          ...state,
          loading: false,
          isNewLoungeDeleted: true,
          message: action.payload,
        };
  
      case DELETE_NEW_LOUNGE_FAIL:
        return {
          ...state,
          loading: false,
          deleteNewLoungeError: action.payload,
        };
      case DELETE_NEW_LOUNGE_RESET:
        return {
          ...state,
          isNewLoungeDeleted: false,
          deleteNewLoungeError: null,
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

export const deleteLoungeTimingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LOUNGE_TIMING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LOUNGE_TIMING_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoungeTimingDeleted: true,
        message: action.payload,
      };

    case DELETE_LOUNGE_TIMING_FAIL:
      return {
        ...state,
        loading: false,
        deleteLoungeTimingError: action.payload,
      };
    case DELETE_LOUNGE_TIMING_RESET:
      return {
        ...state,
        isLoungeTimingDeleted: false,
        deleteLoungeTimingError: null,
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
  
export const newLoungeActivationToggleReducer = (state = { newLoungeActivationToggleData: {} }, action) => {
    switch (action.type) {
      case TOGGLE_NEW_LOUNGE_ACTIVATION_REQUEST:
        return {
          ...state,
          newLoungeActivationToggleLoading: true,
        };
      case TOGGLE_NEW_LOUNGE_ACTIVATION_SUCCESS:
        return {
          newLoungeActivationToggleLoading: false,
          newLoungeActivationToggleSuccess: true,
          newLoungeActivationToggleData: action.payload,
        };
      case TOGGLE_NEW_LOUNGE_ACTIVATION_FAIL:
        return {
          ...state,
          newLoungeActivationToggleLoading: false,
          newLoungeActivationToggleError: action.payload,
        };
      case TOGGLE_NEW_LOUNGE_ACTIVATION_RESET:
        return {
          ...state,
          newLoungeActivationToggleSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          newLoungeActivationToggleError: null,
        };
      default:
        return state;
    }
};

export const loungeTimingToggleReducer = (state = { loungeTimingToggleData: {} }, action) => {
  switch (action.type) {
    case TOGGLE_LOUNGE_TIMING_REQUEST:
      return {
        ...state,
        loungeTimingToggleLoading: true,
      };
    case TOGGLE_LOUNGE_TIMING_SUCCESS:
      return {
        loungeTimingToggleLoading: false,
        loungeTimingToggleSuccess: true,
        loungeTimingToggleData: action.payload,
      };
    case TOGGLE_LOUNGE_TIMING_FAIL:
      return {
        ...state,
        loungeTimingToggleLoading: false,
        loungeTimingToggleError: action.payload,
      };
    case TOGGLE_LOUNGE_TIMING_RESET:
      return {
        ...state,
        loungeTimingToggleSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loungeTimingToggleError: null,
      };
    default:
      return state;
  }
};

export const setLoungeTimingReducer = (state = { setLoungeTimingData: {} }, action) => {
    switch (action.type) {
      case SET_LOUNGE_TIMING_REQUEST:
        return {
          ...state,
          setLoungeTimingLoading: true,
        };
      case SET_LOUNGE_TIMING_SUCCESS:
        return {
          setLoungeTimingLoading: false,
          setLoungeTimingSuccess: true,
          setLoungeTimingData: action.payload,
        };
      case SET_LOUNGE_TIMING_FAIL:
        return {
          ...state,
          setLoungeTimingLoading: false,
          setLoungeTimingError: action.payload,
        };
      case SET_LOUNGE_TIMING_RESET:
        return {
          ...state,
          setLoungeTimingSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          setLoungeTimingError: null,
        };
      default:
        return state;
    }
};
  
export const loadTimingByLoungeReducer = (
    state = { loadTimingByLoungeData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_TIMING_BY_LOUNGE_REQUEST:
        return {
          loadTimingByLoungeLoading: true,
        };
      case LOAD_TIMING_BY_LOUNGE_SUCCESS:
        return {
          ...state,
          loadTimingByLoungeLoading: false,
          loadTimingByLoungeData: action.payload,
        };
      case LOAD_TIMING_BY_LOUNGE_FAIL:
        return {
          ...state,
          loadTimingByLoungeLoading: false,
          loadTimingByLoungeData: null,
          loadTimingByLoungeError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadTimingByLoungeError: null,
        };
      default:
        return state;
    }
};