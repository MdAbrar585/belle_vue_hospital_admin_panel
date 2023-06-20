import { CLEAR_ERRORS, CREATE_PROJECT_FAIL, CREATE_PROJECT_REQUEST, CREATE_PROJECT_RESET, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_RESET, DELETE_PROJECT_SUCCESS, LOAD_PROJECT_FAIL, LOAD_PROJECT_REQUEST, LOAD_PROJECT_SUCCESS, UPDATE_PROJECT_FAIL, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_RESET, UPDATE_PROJECT_SUCCESS } from "../constants/projectConstant";

export const loadProjecReducer = (
    state = { projectData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_PROJECT_REQUEST:
        return {
          projectLoading: true,
        };
      case LOAD_PROJECT_SUCCESS:
        return {
          ...state,
          projectLoading: false,
          projectData: action.payload,
        };
      case LOAD_PROJECT_FAIL:
        return {
          ...state,
          projectLoading: false,
          projectData: null,
          projectError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          projectError: null,
        };
      default:
        return state;
    }
};
  
export const createProjectReducer = (state = { createdProjectData: {} }, action) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        createdProjectLoading: true,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        createdProjectLoading: false,
        createdProjectSuccess: true,
        createdProjectData: action.payload,
      };
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        createdProjectLoading: false,
        createdProjectError: action.payload,
      };
    case CREATE_PROJECT_RESET:
      return {
        ...state,
        createdProjectSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        createdProjectError: null,
      };
    default:
      return state;
  }
};

export const updateProjectReducer = (state = { updatedProjectData: {} }, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        updatedProjectLoading: true,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        updatedProjectLoading: false,
        updatedProjectSuccess: true,
        updatedProjectData: action.payload,
      };
    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        updatedProjectLoading: false,
        updatedProjectError: action.payload,
      };
    case UPDATE_PROJECT_RESET:
      return {
        ...state,
        updatedProjectSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        updatedProjectError: null,
      };
    default:
      return state;
  }
};
export const deleteProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isProjectDeleted: true,
        deleteProjectMessage: action.payload,
      };

    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        deleteProjectError: action.payload,
      };
    case DELETE_PROJECT_RESET:
      return {
        ...state,
        isProjectDeleted: false,
        deleteProjectError: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        deleteProjectError:null,
        error: null,
      };
    default:
      return state;
  }
};