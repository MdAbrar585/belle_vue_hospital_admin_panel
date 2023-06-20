import "./App.css";
import Login from "./component/authentication/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashbaord from "./component/dashboard/Dashbaord";
import UserManagement from "./component/userManagement/UserManagement";
import UserList from "./component/userManagement/UserList";
import ProtectedRoute from "./component/route/ProtectedRoute";
import CustomerList from "./component/customerManagement/CustomerList";
import ProjectList from "./component/projectManagement/ProjectList";
import PartnerList from "./component/partnerManagement/PartnerList";
import AllotedCardList from "./component/cardManagement/AllotedCardList";
import DisbursedCardList from "./component/cardManagement/DisbursedCardList";
import AllotedCardDetails from "./component/cardManagement/AllotedCardDetails";
import CustomerApprovalList from "./component/customerManagement/CustomerApprovalList";
import NewCardAllotment from "./component/cardManagement/NewCardAllotment";
import PartnerServiceList from "./component/partnerManagement/PartnerServiceList";
import SpecialDayList from "./component/specialDayManagement/SpecialDayList";
import AllVoidCardHistories from "./component/cardManagement/AllVoidCardHistories";
import AllRequestedCardHistories from "./component/cardManagement/AllRequestedCardHistories";
import VendorList from "./component/pointManager/VendorList";
import TransectionList from "./component/pointManager/TransectionList";
import CustomerDetails from "./component/customerManagement/CustomerDetails";
import NewsList from "./component/newsManagement/NewsList";
import PointManager from "./component/pointManager/PointManager";
import ServiceRedemptionPanel from "./component/partnerManagement/ServiceRedemptionPanel";
import CashoutApprovalList from "./component/cashoutManagement/CashoutApprovalList";
import CashoutDeclineList from "./component/cashoutManagement/CashoutDeclineList";
import CashoutDisburseList from "./component/cashoutManagement/CashoutDisburseList";
import CashoutRequestList from "./component/cashoutManagement/CashoutRequestList";
import OfferList from "./component/offerManagement/OfferList";
import PointListDetails from "./component/pointManager/PointListDetails";
import LifeStyleList from "./component/lifeStyleManagement/LifeStyleList";
import PartnerListDetails from "./component/partnerManagement/PartnerListDetails";
import NewsDetails from "./component/newsManagement/NewsDetails";
import PartnerServiceListDetails from "./component/partnerManagement/PartnerServiceListDetails";
import LoungeList from "./component/loungeManagement/LoungeList";
import MeetingList from "./component/meetingManagement/MeetingList";
import Setting from "./component/settings/Setting";
import UserProfile from "./component/userManagement/UserProfile";
import ReportList from "./component/reportManagement/ReportList";
function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <Router>
        {/* <Sidebar loginpage={loginpage}> */}
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Dashbaord />} />
            <Route path="/dashboard" element={<Dashbaord />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/usermanagement/userlist" element={<UserList />} />
            <Route path="/usermanagement/userprofile/:userProfileId" element={<UserProfile />} />
            <Route
              path="/customermanagement/customerlist"
              element={<CustomerList />}
            />
            <Route
              path="/customermanagement/customerdetail/:customerId"
              element={<CustomerDetails />}
            />
            <Route
              path="/customermanagement/customeraprovallist"
              element={<CustomerApprovalList />}
            />
            <Route
              path="/projectmanagement/projectlist"
              element={<ProjectList />}
            />
            <Route
              path="/partnermanagement/partnerlist"
              element={<PartnerList />}
            />
            <Route
              path="/partnermanagement/partnerlistdetails/:partnerId"
              element={<PartnerListDetails />}
            />
            <Route
              path="/partnermanagement/partnerservicelist"
              element={<PartnerServiceList />}
            />

            <Route
              path="/partnermanagement/partnerservicelistdetails/:partnerServiceListId"
              element={<PartnerServiceListDetails />}
            />

            <Route
              path="/partnermanagement/serviceredemptionpanel"
              element={<ServiceRedemptionPanel />}
            />
            <Route
              path="/cardmanagement/allotedcardlist"
              element={<AllotedCardList />}
            />
            <Route
              path="/cardmanagement/allotedcardlistdetails/:allotedCardId"
              element={<AllotedCardDetails />}
            />

            <Route
              path="/cardmanagement/disbursedcardlist"
              element={<DisbursedCardList />}
            />
            <Route
              path="/cardmanagement/cardallotment"
              element={<PartnerList />}
            />
            <Route
              path="/cardmanagement/allvoidcardhistories"
              element={<AllVoidCardHistories />}
            />
            <Route
              path="/newcardmanagement/newcardallotment"
              element={<NewCardAllotment />}
            />
            <Route
              path="/newcardmanagement/allrequestedcardhistories"
              element={<AllRequestedCardHistories />}
            />

            <Route
              path="/newsmanagement/newslistdetails/:newsId"
              element={<NewsDetails />}
            />

            <Route
              path="/specialdaymanagement/specialdaylist"
              element={<SpecialDayList />}
            />

            <Route
              path="/transectionManagement/pointmanager"
              element={<PointManager />}
            />

            <Route
              path="/pointmanagement/pointmanagementdetails/:userId"
              element={<PointListDetails />}
            />
            <Route
              path="/transectionManagement/vendorlist"
              element={<VendorList />}
            />

            <Route
              path="/transectionManagement/transectionlist"
              element={<TransectionList />}
            />

            <Route
              path="/cashoutmanagement/cashoutlist"
              element={<CashoutRequestList />}
            />

            <Route
              path="/cashoutmanagement/cashoutapprovallist"
              element={<CashoutApprovalList />}
            />

            <Route
              path="/cashoutmanagement/cashoutdisburselist"
              element={<CashoutDisburseList />}
            />

            <Route
              path="/cashoutmanagement/cashoutdeclinelist"
              element={<CashoutDeclineList />}
            />
            <Route path="/newsmanagement/newslist" element={<NewsList />} />

            <Route path="/offermanagement/offerlist" element={<OfferList />} />

            <Route
              path="/lifestylemanagement/lifestylelist"
              element={<LifeStyleList />}
            />

            <Route
              path="/loungemanagement/loungelist"
              element={<LoungeList />}
            />

            <Route
              path="/meetingmanagement/meetinglist"
              element={<MeetingList />}
            />

            <Route path="/reports" element={<ReportList />} />
          </Route>

          {/* <Route path="/forgot-password" element={<ForgotPassWord />} /> */}

          <Route path="/login" element={<Login />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
        {/* </Sidebar> */}
      </Router>
    </div>
  );
}

export default App;
