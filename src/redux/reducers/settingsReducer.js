import { CLEAR_ERRORS, LOAD_ALL_SETTINGS_FAIL, LOAD_ALL_SETTINGS_REQUEST, LOAD_ALL_SETTINGS_SUCCESS, TOGGLE_LOUNGE_MEETING_FAIL, TOGGLE_LOUNGE_MEETING_REQUEST, TOGGLE_LOUNGE_MEETING_RESET, TOGGLE_LOUNGE_MEETING_SUCCESS } from "../constants/settingsConstant";

export const loadAllSettingsReducer = (
    state = { allSettingsData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_ALL_SETTINGS_REQUEST:
        return {
          allSettingsLoading: true,
        };
      case LOAD_ALL_SETTINGS_SUCCESS:
        return {
          ...state,
          allSettingsLoading: false,
          allSettingsData: action.payload,
        };
      case LOAD_ALL_SETTINGS_FAIL:
        return {
          ...state,
          allSettingsLoading: false,
          allSettingsData: null,
          allSettingsError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          allSettingsError: null,
        };
      default:
        return state;
    }
};

export const toggleLoungeMeetingReducer = (state = { toggleLoungeMeetingData: {} }, action) => {
    switch (action.type) {
      case TOGGLE_LOUNGE_MEETING_REQUEST:
        return {
          ...state,
          toggleLoungeMeetingLoading: true,
        };
      case TOGGLE_LOUNGE_MEETING_SUCCESS:
        return {
          toggleLoungeMeetingLoading: false,
          toggleLoungeMeetingSuccess: true,
          toggleLoungeMeetingData: action.payload,
        };
      case TOGGLE_LOUNGE_MEETING_FAIL:
        return {
          ...state,
          toggleLoungeMeetingLoading: false,
          toggleLoungeMeetingError: action.payload,
        };
      case TOGGLE_LOUNGE_MEETING_RESET:
        return {
          ...state,
          toggleLoungeMeetingSuccess: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          toggleLoungeMeetingError: null,
        };
      default:
        return state;
    }
};