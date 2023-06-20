import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { sidebarToggleReducer } from "./redux/reducers/sidebarToggleReducer";
import { loginReducer } from "./redux/reducers/authenticationReducer";
import { createDesignationReducer, createUserReducer, createUserTypeReducer, deleteUserReducer, loadDesignationReducer, loadInternalUserReducer, loadUserDetailsReducer, loadUserTypeReducer, updateUserReducer } from "./redux/reducers/userReducer";
import { approveCustomerReducer, createCustomerReducer, createCustomerTypeReducer, declineCustomerReducer, deleteCustomerReducer, loadConcernTypeReducer, loadCustomerDetailsReducer, loadCustomerReducer, loadCustomerTypeReducer, updateCustomerReducer, uploadCustomerDataReducer } from "./redux/reducers/customerReducer";
import { createProjectReducer, deleteProjectReducer, loadProjecReducer, updateProjectReducer } from "./redux/reducers/projectReducer";
import { createPartnerReducer, createPartnerServiceReducer, createPartnerServiceTypeReducer, createPartnerTypeReducer, deletePartnerReducer, deletePartnerServiceReducer, loadPartnerDetailsReducer, loadPartnerReducer, loadPartnerServiceDetailsReducer, loadPartnerServiceReducer, loadPartnerServiceTypeReducer, loadPartnerTypeReducer, updatePartnerReducer, updatePartnerServiceReducer, uploadPartnerImageReducer } from "./redux/reducers/partnerReducer";
import { acceptNewCardAllotmentReqReducer, allocateCardReducer, createCardCounterReducer, disburseCardReducer, disbursedCardDetailReducer, loadAllotedCardReducer, loadAllRequestedCardHistoryReducer, loadCardCounterReducer, loadCardTypeReducer, loadDisbursedCardReducer, loadNewAllotmentCardReqReducer, loadVoidCardHistoryReducer } from "./redux/reducers/cardManagementReducer";
import { createSpecialDayReducer, deleteSpecialDayReducer, loadSpecialDayReducer, sendSpecialDayReducer, updateSpecialDayReducer } from "./redux/reducers/specialDayReducer";
import { createNewsReducer, deleteNewsReducer, loadNewsReducer,loadNewsDetailsReducer, updateNewsReducer } from "./redux/reducers/newsReducer";
import { approveOfferReducer, createOfferReducer, deActiveOfferReducer, deleteOfferReducer, loadOfferReducer, updateOfferReducer } from "./redux/reducers/offerReducer";
import { createVendorReducer, createVendorTypeReducer, loadPointHistoryDetailsReducer, loadPointListReducer, loadtotalCashoutPointReducer, loadVendorListReducer, loadVendorTypeReducer } from "./redux/reducers/pointManagerReducer";
import { acticeDeactiveLifeStyleToggleReducer, createLifeStyleReducer, deleteLifeStyleReducer, loadLifeStyleReducer, updateLifeStyleReducer } from "./redux/reducers/lifeStyleReducer";
import { approveCashoutReqReducer, createCashoutOptionReducer, declineCashoutReqReducer, deleteCashoutOptionReducer, disburseCashoutReqReducer, loadCashoutApprovalListReducer, loadCashoutDeclineListReducer, loadCashoutDisburseListReducer, loadCashoutOptionListReducer, loadCashoutReqListReducer } from "./redux/reducers/cashoutManagementReducer";
import { loadDashboardReducer } from "./redux/reducers/dashboardReducer";
import { addNewLoungeReducer, deleteLoungeTimingReducer, deleteNewLoungeReducer, editNewLoungeReducer, loadAllLoungeReducer, loadTimingByLoungeReducer, loungeTimingToggleReducer, newLoungeActivationToggleReducer, setLoungeTimingReducer } from "./redux/reducers/loungeManagementReducer";
import { bookMeetingReducer, cancelMeetingReducer, deleteMeetingReducer, getAllLoungeReducer, getDateWiseMeetingReducer, getFreeLoungeTimingReducer } from "./redux/reducers/meetingManagementReducer";
import { loadAllSettingsReducer, toggleLoungeMeetingReducer } from "./redux/reducers/settingsReducer";
import { loadUnreadNotificationReducer, readNotificationReducer } from "./redux/reducers/notificationReducer";
import { generateCashoutReportReducer, generateCustomerReportReducer, generatePartnerReportReducer, generateUserReportReducer, loadReportReducer } from "./redux/reducers/reportReducer";

const reducer = combineReducers({
  toggleSidebar: sidebarToggleReducer,

  login: loginReducer,

  loadDashboard: loadDashboardReducer,
  
  loadInternalUser: loadInternalUserReducer,
  createUsers: createUserReducer,
  updateUsers:updateUserReducer,
  deleteUser :deleteUserReducer,
  createUserType: createUserTypeReducer,
  loadUserType: loadUserTypeReducer,
  createDesignation: createDesignationReducer,
  loadDesignation: loadDesignationReducer,
  loadUserDetails: loadUserDetailsReducer,

  createCustomerType: createCustomerTypeReducer,
  uploadCustomer: uploadCustomerDataReducer,
  loadCustomer: loadCustomerReducer,
  loadCustomerDetails:loadCustomerDetailsReducer,
  createCustomers: createCustomerReducer,
  approveCustomers:approveCustomerReducer,
  loadCustomerType: loadCustomerTypeReducer,
  declineCustomer: declineCustomerReducer,
  deleteCustomer: deleteCustomerReducer,
  updateCustomer: updateCustomerReducer,
  
  loadConcernType: loadConcernTypeReducer,
  
  loadProjects: loadProjecReducer,
  createProjects: createProjectReducer,
  updateProjects: updateProjectReducer,
  deleteProject: deleteProjectReducer,
  
  loadPartners: loadPartnerReducer,
  createPartnerType: createPartnerTypeReducer,
  loadPartnerType: loadPartnerTypeReducer,

  createPartners: createPartnerReducer,
  updatePartners: updatePartnerReducer,
  loadPartnerDetails: loadPartnerDetailsReducer,
  deletePartner: deletePartnerReducer,
  uploadPartnerImage: uploadPartnerImageReducer,

  loadAllotedCard: loadAllotedCardReducer,
  allocateCards: allocateCardReducer,
  loadDisbursedCards: loadDisbursedCardReducer,
  disbursedCardDetails: disbursedCardDetailReducer,
  disburseCards: disburseCardReducer,
  loadCardType: loadCardTypeReducer,
  loadVoidCardHistory: loadVoidCardHistoryReducer,
  loadAllRequestedCardHistory: loadAllRequestedCardHistoryReducer,
  createCardCounter:createCardCounterReducer,
  loadCardCounter: loadCardCounterReducer,
  loadNewAllotmentCardReq: loadNewAllotmentCardReqReducer,
  acceptNewCardAllotmentReq: acceptNewCardAllotmentReqReducer,

  loadPartnerService: loadPartnerServiceReducer,
  loadPartnerServiceDetails:loadPartnerServiceDetailsReducer,
  createPartnerService: createPartnerServiceReducer,
  updatePartnerService: updatePartnerServiceReducer,
  deletePartnerService: deletePartnerServiceReducer,
  loadPartnerServiceType:loadPartnerServiceTypeReducer,
  createPartnerServiceType: createPartnerServiceTypeReducer,

  loadSpecialDay: loadSpecialDayReducer,
  sendSpecialDay: sendSpecialDayReducer,
  createSpecialDay: createSpecialDayReducer,
  deleteSpecialDay: deleteSpecialDayReducer,
  updateSpecialDay: updateSpecialDayReducer,
  
  loadNews: loadNewsReducer,
  loadNewsDetails: loadNewsDetailsReducer,
  createNews: createNewsReducer,
  deleteNews: deleteNewsReducer,
  updateNews: updateNewsReducer,

  loadOffer: loadOfferReducer,
  createOffer: createOfferReducer,
  approveOffer: approveOfferReducer,
  deActiveOffer: deActiveOfferReducer,
  updateOffer: updateOfferReducer,
  deleteOffer: deleteOfferReducer,

  loadLifeStyle: loadLifeStyleReducer,
  createLifeStyle: createLifeStyleReducer,
  acticeDeactiveLifeStyleToggle: acticeDeactiveLifeStyleToggleReducer,
  updateLifeStyle: updateLifeStyleReducer,
  deleteLifeStyl: deleteLifeStyleReducer,

  loadPointList: loadPointListReducer,
  loadPointHistoryDetails: loadPointHistoryDetailsReducer,
  loadtotalCashoutPoint: loadtotalCashoutPointReducer,
  
  loadVendorList: loadVendorListReducer,
  createVendor: createVendorReducer,
  createVendorType: createVendorTypeReducer,
  loadVendorType: loadVendorTypeReducer,
  
  loadCashoutReqList: loadCashoutReqListReducer,
  loadCashoutApprovalList: loadCashoutApprovalListReducer,
  loadCashoutDisburseList: loadCashoutDisburseListReducer,
  loadCashoutDeclineList: loadCashoutDeclineListReducer,
  approveCashoutReq: approveCashoutReqReducer,
  declineCashoutReq: declineCashoutReqReducer,
  disburseCashoutReq: disburseCashoutReqReducer,
  createCashoutOption: createCashoutOptionReducer,
  loadCashoutOptionList: loadCashoutOptionListReducer,
  deleteCashoutOption: deleteCashoutOptionReducer,

  loadAllLounge: loadAllLoungeReducer,
  addNewLounge: addNewLoungeReducer,
  editNewLounge: editNewLoungeReducer,
  deleteNewLounge: deleteNewLoungeReducer,
  newLoungeActivationToggle: newLoungeActivationToggleReducer,
  loadTimingByLounge: loadTimingByLoungeReducer,
  setLoungeTiming: setLoungeTimingReducer,
  deleteLoungeTiming: deleteLoungeTimingReducer,
  loungeTimingToggle: loungeTimingToggleReducer,

  getAllLounge: getAllLoungeReducer,
  getFreeLoungeTiming: getFreeLoungeTimingReducer,
  bookMeeting: bookMeetingReducer,
  cancelMeeting: cancelMeetingReducer,
  getDateWiseMeeting: getDateWiseMeetingReducer,
  deleteMeeting: deleteMeetingReducer,

  loadAllSettings: loadAllSettingsReducer,
  toggleLoungeMeeting: toggleLoungeMeetingReducer,

  loadUnreadNotification: loadUnreadNotificationReducer,
  readNotification: readNotificationReducer,

  generateUserReport: generateUserReportReducer,
  generatePartnerReport: generatePartnerReportReducer,
  generateCustomerReport: generateCustomerReportReducer,
  generateCashoutReport: generateCashoutReportReducer,
  loadReport: loadReportReducer,
});
let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
