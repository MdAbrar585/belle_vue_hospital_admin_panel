import React, { useState } from "react";
// import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
// import eOstadLogo from "../../assets/logo/e-ostad-logo_1.png";
// import eOstadLogo_mini from "../../assets/logo/e-ostad-logo-2.png";
// import dash from "../../assets/sidebar-icons/005-dashboard-3.png";
// import student from "../../assets/icons/course.png";
// import instructor from "../../assets/icons/course.png";
// import subscription from "../../assets/icons/course.png";
// import submission from "../../assets/icons/course.png";
// import report from "../../assets/icons/course.png";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/actions/sidebarToggleAction";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import user from "../../assets/icons/user.png";
import dashboard from "../../assets/icons/dashboard.png";
import user2 from "../../assets/icons/user.png";
import projectManagement1 from "../../assets/icons/folder.png";
import projectManagement from "../../assets/icons/process.png";
import userList from "../../assets/icons/userList.png";
import customer from "../../assets/icons/customer (2).png";
import cardIcon from "../../assets/icons/credit.png";
import cardAllotment from "../../assets/icons/id-card.png";
import newCard from "../../assets/icons/credit-card.png";
import specialDay from "../../assets/icons/gift.png";
import pointsIcon from "../../assets/icons/target.png";
import cashoutIcon from "../../assets/icons/takeover.png";
import newsIcon from "../../assets/icons/newspaper.png";
import lifeStyleIcon from "../../assets/icons/lifestyle.png";
import offerIcon from "../../assets/icons/offer.png";
import lounge from "../../assets/icons/lounge.png";
import loungeList from "../../assets/icons/list_lounge.png";
import meeting from "../../assets/icons/meeting.png";
import meetingList from "../../assets/icons/meeting_list.png";
import setting from "../../assets/icons/profit-report.png";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <img src={dashboard} alt="" />,
  },
  {
    path: "/projectmanagement",
    name: "Project Management",
    icon: <img src={projectManagement1} alt="" />,
    subRoutes: [
      {
        path: "/projectmanagement/projectlist",
        name: "Project List",
        icon: <img src={userList} alt="" />,
      },
      // {
      //   path: "/usermanagement/userlist1",
      //   name: "User List1",
      //   icon: <img src={user2} alt="" />,
      // },
    ],
  },
  {
    path: "/usermanagement",
    name: "User Management",
    icon: <img src={user2} alt="" />,
    subRoutes: [
      {
        path: "/usermanagement/userlist",
        name: "User List",
        icon: <img src={userList} alt="" />,
      },
      // {
      //   path: "/usermanagement/userlist1",
      //   name: "User List1",
      //   icon: <img src={user2} alt="" />,
      // },
    ],
  },
  {
    path: "/customermanagement",
    name: "Customer Management",
    icon: <img src={customer} alt="" />,
    subRoutes: [
      {
        path: "/customermanagement/customerlist",
        name: "Customer List",
        icon: <img src={userList} alt="" />,
      },
      {
        path: "/customermanagement/customeraprovallist",
        name: "Customer Approval List",
        icon: <img src={userList} alt="" />,
      },
      // {
      //   path: "#",
      //   name: "Customer List1",
      //   icon: <img src={user2} alt="" />,
      // },
    ],
  },
  {
    path: "/partnermanagement",
    name: "Partner Management",
    icon: <img src={projectManagement} alt="" />,
    subRoutes: [
      {
        path: "/partnermanagement/partnerlist",
        name: "Partner List",
        icon: <img src={userList} alt="" />,
      },
      {
        path: "/partnermanagement/partnerservicelist",
        name: "Partner Service List",
        icon: <img src={userList} alt="" />,
      },
      // {
      //   path: "/partnermanagement/serviceredemptionpanel",
      //   name: "Service Redemption Panel",
      //   icon: <img src={userList} alt="" />,
      // },
      // {
      //   path: "/usermanagement/userlist1",
      //   name: "User List1",
      //   icon: <img src={user2} alt="" />,
      // },
    ],
  },
  {
    path: "/cardmanagement",
    name: "Card Management",
    icon: <img src={cardIcon} alt="" />,
    subRoutes: [
      {
        path: "/cardmanagement/allotedcardlist",
        name: "Card Allotment",
        icon: <img src={cardAllotment} alt="" />,
      },
      {
        path: "/cardmanagement/disbursedcardlist",
        name: "Disbursed Card List",
        icon: <img src={userList} alt="" />,
      },
      {
        path: "/cardmanagement/allvoidcardhistories",
        name: "Void Card List",
        icon: <img src={userList} alt="" />,
      },
      // {
      //   path: "/usermanagement/userlist1",
      //   name: "User List1",
      //   icon: <img src={user2} alt="" />,
      // },
    ],
  },
  {
    path: "/newcardmanagement",
    name: "New Card Management",
    icon: <img src={newCard} alt="" />,
    subRoutes: [
      {
        path: "/newcardmanagement/newcardallotment",
        name: "New Card Request",
        icon: <img src={cardAllotment} alt="" />,
      },
      {
        path: "/newcardmanagement/allrequestedcardhistories",
        name: "Requested Card List",
        icon: <img src={cardAllotment} alt="" />,
      },
    ],
  },
  {
    path: "/specialdaymanagement",
    name: "Special Day Management",
    icon: <img src={specialDay} alt="" />,
    subRoutes: [
      {
        path: "/specialdaymanagement/specialdaylist",
        name: "Dashboard",
        icon: <img src={cardAllotment} alt="" />,
      },
    ],
  },
  {
    path: "/transectionManagement",
    name: "Point Manager",
    icon: <img src={pointsIcon} alt="" />,
    subRoutes: [
      {
        path: "/transectionManagement/pointmanager",
        name: "Point Manager",
        icon: <img src={cardAllotment} alt="" />,
      },
      {
        path: "/transectionManagement/vendorlist",
        name: "Own Venture List",
        icon: <img src={cardAllotment} alt="" />,
      },
      {
        path: "/transectionManagement/transectionlist",
        name: "Transection List",
        icon: <img src={cardAllotment} alt="" />,
      },
    ],
  },
  {
    path: "/cashoutmanagement",
    name: "Cashout Management",
    icon: <img src={cashoutIcon} alt="" />,
    subRoutes: [
      {
        path: "/cashoutmanagement/cashoutlist",
        name: "Cashout Request List",
        icon: <img src={cardAllotment} alt="" />,
      },
      {
        path: "/cashoutmanagement/cashoutapprovallist",
        name: "Cashout Approved List",
        icon: <img src={cardAllotment} alt="" />,
      },
      {
        path: "/cashoutmanagement/cashoutdisburselist",
        name: "Cashout Disbursed List",
        icon: <img src={cardAllotment} alt="" />,
      },
      {
        path: "/cashoutmanagement/cashoutdeclinelist",
        name: "Cashout Declined List",
        icon: <img src={cardAllotment} alt="" />,
      },
    ],
  },
  {
    path: "/newsmanagement",
    name: "News Management",
    icon: <img src={newsIcon} alt="" />,
    subRoutes: [
      {
        path: "/newsmanagement/newslist",
        name: "News List",
        icon: <img src={cardAllotment} alt="" />,
      },
    ],
  },
  {
    path: "/offermanagement",
    name: "Offer Management",
    icon: <img src={offerIcon} alt="" />,
    subRoutes: [
      {
        path: "/offermanagement/offerlist",
        name: "Offer List",
        icon: <img src={cardAllotment} alt="" />,
      },
    ],
  },
  {
    path: "/lifestylemanagement",
    name: "Life Style Management",
    icon: <img src={lifeStyleIcon} alt="" />,
    subRoutes: [
      {
        path: "/lifestylemanagement/lifestylelist",
        name: "Life Style List",
        icon: <img src={lifeStyleIcon} alt="" />,
      },
    ],
  },
  {
    path: "/loungemanagement",
    name: "Lounge Management",
    icon: <img src={lounge} alt="" />,
    subRoutes: [
      {
        path: "/loungemanagement/loungelist",
        name: "Lounge List",
        icon: <img src={loungeList} alt="" />,
      },
    ],
  },
  {
    path: "/meetingmanagement",
    name: "Meeting Management",
    icon: <img src={meeting} alt="" />,
    subRoutes: [
      {
        path: "/meetingmanagement/meetinglist",
        name: "Meeting List",
        icon: <img src={meetingList} alt="" />,
      },
    ],
  },
  {
    path: "/reports",
    name: "Report List",
    icon: <img src={setting} alt="" />,
    subRoutes: [
      {
        path: "/reports",
        name: "Reports",
        icon: <img src={meetingList} alt="" />,
      },
    ],
  },
];
const Sidebar = ({ children, loginpage }) => {
  // console.log(routes);
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.toggleSidebar);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // console.log("loggedInUser", loggedInUser.data.attributes);
  // const [setIsOpen] = useState(false);

  // console.log(isOpen);

  //   const inputAnimation = {
  //     hidden: {
  //       width: 0,
  //       padding: 0,
  //       transition: {
  //         duration: 0.2,
  //       },
  //     },
  //     show: {
  //       width: "140px",
  //       padding: "5px 15px",
  //       transition: {
  //         duration: 0.2,
  //       },
  //     },
  //   };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "355px" : "75px",
            minHeight: "100vh",
            backgroundColor: "#fff",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={loginpage ? `sidebar ` : `sidebar-none`}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Stack className="mr-2" direction="row" spacing={5}>
                    <Avatar alt="Remy Sharp" src={user} />
                  </Stack>
                  <div>
                    <h6>
                      {loggedInUser.data.attributes.first_name +
                        " " +
                        loggedInUser.data.attributes.last_name}
                    </h6>
                    <h6>
                      <Link
                        style={{textDecoration:"none",color:"#023047"}}
                        to={
                          "/usermanagement/userprofile/" + loggedInUser.data.id
                        }
                      >
                        {loggedInUser.data.attributes.email}
                      </Link>{" "}
                    </h6>
                  </div>
                  <div></div>
                  {/* <img className="sidbar-header-logo" src={course} alt="" /> */}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              {/* <FaBars onClick={toggle} /> */}
              {!isOpen && (
                <Stack className="mr-2" direction="row" spacing={5}>
                  <Avatar alt="Remy Sharp" src={user} />
                </Stack>
                // <img
                //   style={{ width: "100%" }}
                //   src={course}
                //   alt=""
                //   onClick={toggle}
                // />
              )}
            </div>
          </div>
          {/* <div className="search">
              <div className="search_icon">
                <BiSearch />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.input
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={inputAnimation}
                    type="text"
                    placeholder="Search"
                  />
                )}
              </AnimatePresence>
            </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    // setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main style={{ backgroundColor: "#EDEDED", height: "100%" }}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
