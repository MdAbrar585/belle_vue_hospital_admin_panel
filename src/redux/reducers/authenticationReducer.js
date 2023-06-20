import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, RESTRICTED_USER } from "../constants/authenticationConstant";

export const loginReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          loginLoading: true,
          isAthenticate: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loginLoading: true,
          isAthenticate: true,
          user: action.payload,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          loginLoading: false,
          isAthenticate: false,
          user: null,
          loginError: action.payload,
        };
        case RESTRICTED_USER:
          return {
            ...state,
            loginLoading: false,
            isAthenticate: false,
            user: null,
            loginError: action.payload,
            restrictionError: "UnAuthorized User",
          };
      case CLEAR_ERRORS:
        return {
          ...state,
          loginError: null,
        };
      default:
        return state;
    }
  };