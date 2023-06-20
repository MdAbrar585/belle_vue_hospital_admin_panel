import { CLEAR_ERRORS, LOAD_UNREAD_NOTIFICATION_FAIL, LOAD_UNREAD_NOTIFICATION_REQUEST, LOAD_UNREAD_NOTIFICATION_SUCCESS, MARK_READ_NOTIFICATION_FAIL, MARK_READ_NOTIFICATION_REQUEST, MARK_READ_NOTIFICATION_RESET, MARK_READ_NOTIFICATION_SUCCESS } from "../constants/notificationConstant";

export const loadUnreadNotificationReducer = (state = { loadUnreadNotificationData: {} }, action) => {
    switch (action.type) {
      case LOAD_UNREAD_NOTIFICATION_REQUEST:
        return {
          loadUnreadNotificationLoading: true,
        };
      case LOAD_UNREAD_NOTIFICATION_SUCCESS:
        return {
          ...state,
          loadUnreadNotificationLoading: false,
          loadUnreadNotificationData: action.payload,
        };
      case LOAD_UNREAD_NOTIFICATION_FAIL:
        return {
          ...state,
          loadUnreadNotificationLoading: false,
          loadUnreadNotificationData: null,
          loadUnreadNotificationError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadUnreadNotificationError: null,
        };
      default:
        return state;
    }
};
  
export const readNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_READ_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MARK_READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isNotificationReaded: true,
        message: action.payload,
      };

    case MARK_READ_NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        readNotificationError: action.payload,
      };
    case MARK_READ_NOTIFICATION_RESET:
      return {
        ...state,
        isNotificationReaded: false,
        readNotificationError: null,
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