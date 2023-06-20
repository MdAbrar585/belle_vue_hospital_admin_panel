import { CLEAR_ERRORS, LOAD_DASHBOARD_FAIL, LOAD_DASHBOARD_REQUEST, LOAD_DASHBOARD_SUCCESS } from "../constants/dashboardConstant";

export const loadDashboardReducer = (
    state = { loadDashboardData: {} },
    action
  ) => {
    switch (action.type) {
      case LOAD_DASHBOARD_REQUEST:
        return {
          loadDashboardLoading: true,
        };
      case LOAD_DASHBOARD_SUCCESS:
        return {
          ...state,
          loadDashboardLoading: false,
          loadDashboardData: action.payload,
        };
      case LOAD_DASHBOARD_FAIL:
        return {
          ...state,
          loadDashboardLoading: false,
          loadDashboardData: null,
          loadDashboardError: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          loadDashboardError: null,
        };
      default:
        return state;
    }
};