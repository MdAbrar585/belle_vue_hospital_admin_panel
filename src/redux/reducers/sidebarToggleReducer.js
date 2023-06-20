import {
  REVERSE_SIDEBAR_TOGGLE,
  SIDEBAR_TOGGLE,
} from "../constants/sidabarToggleConstant";
export const sidebarToggleReducer = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        isOpen: action.payload,
      };
    case REVERSE_SIDEBAR_TOGGLE:
      return {
        isOpen: action.payload,
      };
    default:
      return state;
  }
};
