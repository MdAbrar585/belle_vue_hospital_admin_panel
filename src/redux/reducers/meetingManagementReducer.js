import { BOOK_MEETING_FAIL, BOOK_MEETING_REQUEST, BOOK_MEETING_RESET, BOOK_MEETING_SUCCESS, CANCEL_MEETING_FAIL, CANCEL_MEETING_REQUEST, CANCEL_MEETING_RESET, CANCEL_MEETING_SUCCESS, CLEAR_ERRORS, DELETE_MEETING_FAIL, DELETE_MEETING_REQUEST, DELETE_MEETING_RESET, DELETE_MEETING_SUCCESS, GET_ALL_LOUNGE_FAIL, GET_ALL_LOUNGE_REQUEST, GET_ALL_LOUNGE_SUCCESS, GET_DATE_WISE_MEETING_FAIL, GET_DATE_WISE_MEETING_REQUEST, GET_DATE_WISE_MEETING_SUCCESS, GET_FREE_LOUNGE_TIMING_FAIL, GET_FREE_LOUNGE_TIMING_REQUEST, GET_FREE_LOUNGE_TIMING_SUCCESS } from "../constants/meetingManagementConstant";

export const getAllLoungeReducer = (
    state = { getAllLoungeData: {} },
    action
  ) => {
    switch (action.type) {
      case GET_ALL_LOUNGE_REQUEST:
        return {
          getAllLoungeLoading: true,
        };
      case GET_ALL_LOUNGE_SUCCESS:
        return {
          ...state,
          getAllLoungeLoading: false,
          getAllLoungeData: action.payload,
        };
      case GET_ALL_LOUNGE_FAIL:
        return {
          ...state,
          getAllLoungeLoading: false,
          getAllLoungeData: null,
          getAllLoungeError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          getAllLoungeError: null,
        };
      default:
        return state;
    }
};

export const getFreeLoungeTimingReducer = (
    state = { getFreeLoungeTimingData: {} },
    action
  ) => {
    switch (action.type) {
      case GET_FREE_LOUNGE_TIMING_REQUEST:
        return {
          getFreeLoungeTimingLoading: true,
        };
      case GET_FREE_LOUNGE_TIMING_SUCCESS:
        return {
          ...state,
          getFreeLoungeTimingLoading: false,
          getFreeLoungeTimingData: action.payload,
        };
      case GET_FREE_LOUNGE_TIMING_FAIL:
        return {
          ...state,
          getFreeLoungeTimingLoading: false,
          getFreeLoungeTimingData: null,
          getFreeLoungeTimingError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          getFreeLoungeTimingError: null,
        };
      default:
        return state;
    }
};

export const bookMeetingReducer = (state = { bookMeetingData: {} }, action) => {
  switch (action.type) {
    case BOOK_MEETING_REQUEST:
      return {
        ...state,
        bookMeetingLoading: true,
      };
    case BOOK_MEETING_SUCCESS:
      return {
        bookMeetingLoading: false,
        bookMeetingSuccess: true,
        bookMeetingData: action.payload,
      };
    case BOOK_MEETING_FAIL:
      return {
        ...state,
        bookMeetingLoading: false,
        bookMeetingError: action.payload,
      };
    case BOOK_MEETING_RESET:
      return {
        ...state,
        bookMeetingSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        bookMeetingError: null,
      };
    default:
      return state;
  }
};

export const cancelMeetingReducer = (state = { cancelMeetingData: {} }, action) => {
  switch (action.type) {
    case CANCEL_MEETING_REQUEST:
      return {
        ...state,
        cancelMeetingLoading: true,
      };
    case CANCEL_MEETING_SUCCESS:
      return {
        cancelMeetingLoading: false,
        cancelMeetingSuccess: true,
        cancelMeetingData: action.payload,
      };
    case CANCEL_MEETING_FAIL:
      return {
        ...state,
        cancelMeetingLoading: false,
        cancelMeetingError: action.payload,
      };
    case CANCEL_MEETING_RESET:
      return {
        ...state,
        cancelMeetingSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        cancelMeetingError: null,
      };
    default:
      return state;
  }
};

export const getDateWiseMeetingReducer = (
  state = { getDateWiseMeetingData: {} },
  action
) => {
  switch (action.type) {
    case GET_DATE_WISE_MEETING_REQUEST:
      return {
        getDateWiseMeetingLoading: true,
      };
    case GET_DATE_WISE_MEETING_SUCCESS:
      return {
        ...state,
        getDateWiseMeetingLoading: false,
        getDateWiseMeetingData: action.payload,
      };
    case GET_DATE_WISE_MEETING_FAIL:
      return {
        ...state,
        getDateWiseMeetingLoading: false,
        getDateWiseMeetingData: null,
        getDateWiseMeetingError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        getDateWiseMeetingError: null,
      };
    default:
      return state;
  }
};

export const deleteMeetingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MEETING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        isMeetingDeleted: true,
        message: action.payload,
      };

    case DELETE_MEETING_FAIL:
      return {
        ...state,
        loading: false,
        deleteMeetingError: action.payload,
      };
    case DELETE_MEETING_RESET:
      return {
        ...state,
        isMeetingDeleted: false,
        deleteMeetingError: null,
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