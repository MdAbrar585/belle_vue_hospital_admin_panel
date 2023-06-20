import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import customer from "../../assets/icons/admins.png";
import cardAllocate from "../../assets/icons/card-allocate.png";
// import team from "../../assets/icons/team (1).png";
// import bell from "../../assets/icons/bell.png";
import "./Dashboard.css";
// import DashboardCard from "./DashboardCard";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardFunc } from "../../redux/actions/dashboardAction";
import NewLoader from "../loader/NewLoader";

const Dashbaord = () => {
  let [defaultLoader, setDefaultLoader] = useState(false);

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const { isOpen } = useSelector((state) => state.toggleSidebar);

  const { loadDashboardLoading, loadDashboardData } = useSelector(
    (state) => state.loadDashboard
  );
  console.log(loadDashboardData?.data);

  // const data = [
  //   {
  //     name: "Group A",
  //     value: loadDashboardData?.data?.cashout?.todays_cash_disbursement,
  //   },
  //   {
  //     name: "Group B",
  //     value: loadDashboardData?.data?.cashout?.yesterdays_cash_disbursement,
  //   },
  // ];
  const totalLoungeData = [
    {
      name: "Group A",
      value: loadDashboardData?.data?.lounges?.active_lounges,
    },
    {
      name: "Group B",
      value: loadDashboardData?.data?.lounges?.inactive_lounges,
    },
  ];
  const cashDisbursementData = [
    {
      name: "Group A",
      value: parseInt(
        loadDashboardData?.data?.cashout?.todays_cash_disbursement
      ),
    },
    {
      name: "Group B",
      value: parseInt(
        loadDashboardData?.data?.cashout?.yesterdays_cash_disbursement
      ),
    },
  ];
  const COLORS = ["#023047", "#8ECAE6"];

  useEffect(() => {
    setDefaultLoader(true);
    if (token != null) {
      dispatch(loadDashboardFunc(token?.access_token));
    }
  }, [dispatch, token]);

  return (
    <div>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadDashboardLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="wrap-component m-5">
                <>
                  <div className="row">
                    <div className="col-md-3">
                      <div
                        style={{ backgroundColor: "#023047" }}
                        className="d-flex justify-content-between w-100 dash-card"
                      >
                        <div className="d-flex align-items-end">
                          <div className="">
                            <h4>
                              {
                                loadDashboardData?.data.users
                                  .total_customers
                              }
                            </h4>
                            <h6>Total Active Customers</h6>
                          </div>
                        </div>
                        <div>
                          <div>
                            <img src={customer} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div
                        style={{ backgroundColor: "#126782" }}
                        className="d-flex justify-content-between w-100 dash-card"
                      >
                        <div className="d-flex align-items-end">
                          <div className="">
                            <h4>
                              {loadDashboardData?.data.users.total_partners}
                            </h4>
                            <h6>Total Partners</h6>
                          </div>
                        </div>
                        <div>
                          <div>
                            <img src={customer} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div
                        style={{ backgroundColor: "#126782" }}
                        className="d-flex justify-content-between w-100 dash-card"
                      >
                        <div className="d-flex align-items-end">
                          <div className="">
                            <h4>
                              {
                                loadDashboardData?.data.cards
                                  .total_allocatted_cards
                              }
                            </h4>
                            <h6>Total Allocated Card</h6>
                          </div>
                        </div>
                        <div>
                          <div>
                            <img src={customer} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div
                        style={{ backgroundColor: "#126782" }}
                        className="d-flex justify-content-between w-100 dash-card"
                      >
                        <div className="d-flex align-items-end">
                          <div className="">
                            <h4>
                              {
                                loadDashboardData?.data.cards
                                  .total_disbursed_cards
                              }
                            </h4>
                            <h6>Total Disbursed Card</h6>
                          </div>
                        </div>
                        <div>
                          <div>
                            <img src={customer} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="total-lounge-card">
                        <div>
                          <h4 className="" style={{ color: "#fff" }}>
                            Total Lounges
                          </h4>
                        </div>

                        <div>
                          <PieChart
                            width={isOpen ? 300 : 400}
                            height={300}
                            // onMouseEnter={onPieEnter}
                          >
                            <Pie
                              data={totalLoungeData}
                              cx={170}
                              cy={110}
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {totalLoungeData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </div>

                        <div>
                          <div className="d-flex align-items-center">
                            <div className="active-block"></div>
                            <span className="ml-2 text-white">
                              Active Lounges
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="de-active-block"></div>

                            <span className="ml-2 text-white">
                              Deactive Lounges
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="total-lounge-card">
                        <div>
                          <h4 className="" style={{ color: "#fff" }}>
                            Total Cash Disbrustment
                          </h4>
                        </div>

                        <div style={{ width: "100%", height: 300 }}>
                          <ResponsiveContainer>
                            <PieChart
                              width={isOpen ? 300 : 400}
                              height={300}
                              // onMouseEnter={onPieEnter}
                            >
                              <Pie
                                data={cashDisbursementData}
                                cx={230}
                                cy={140}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {cashDisbursementData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        <div>
                          <div className="d-flex align-items-center">
                            <div className="active-block"></div>
                            <span className="ml-2 text-white">
                              Todays Cash Disbursment
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="de-active-block"></div>

                            <span className="ml-2 text-white">
                              Yesterdays Cash Disbursment
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div style={{ marginTop: "25px" }} className="row">
                        <div className="col-md-12">
                          <div
                            style={{ backgroundColor: "#023047" }}
                            className="d-flex justify-content-between w-100 dash-card"
                          >
                            <div className="d-flex align-items-end">
                              <div className="">
                                <h4>
                                  {
                                    loadDashboardData?.data.cashout
                                      .total_cashout_requests
                                  }
                                </h4>
                                <h6>Total Cash Out Request</h6>
                              </div>
                            </div>
                            <div>
                              <div>
                                <img src={cardAllocate} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{ marginTop: "20px" }}
                          className="col-md-12"
                        >
                          <div
                            style={{ backgroundColor: "#023047" }}
                            className="d-flex justify-content-between w-100 dash-card"
                          >
                            <div className="d-flex align-items-end">
                              <div className="">
                                <h4>
                                  {
                                    loadDashboardData?.data.users
                                      .total_in_house_admins
                                  }
                                </h4>
                                <h6>Total In House Admin </h6>
                              </div>
                            </div>
                            <div>
                              <div>
                                <img src={cardAllocate} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </Sidebar>
          )}
        </>
      )}
    </div>
  );
};

export default Dashbaord;
