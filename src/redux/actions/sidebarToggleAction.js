import {
  REVERSE_SIDEBAR_TOGGLE,
  SIDEBAR_TOGGLE,
} from "../constants/sidabarToggleConstant";

export const toggleSidebar = () => {
  return {
    type: SIDEBAR_TOGGLE,
    payload: false,
  };
};
export const reverseToggleSidebar = () => {
  return {
    type: REVERSE_SIDEBAR_TOGGLE,
    payload: true,
  };
};
