import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getDateWiseMeetingFunc } from "../../redux/actions/meetingManagementAction";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Button from "@mui/material/Button";
import MeetingListCard from "./MeetingListCard";
import { DELETE_MEETING_RESET } from "../../redux/constants/meetingManagementConstant";
import { Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import AddMeeting from "./AddMeeting";
import NewLoader from "../loader/NewLoader";

const MeetingList = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const date = new Date();

  let [dateForMeeting, setDateForMeeting] = useState(
    moment(date).format("YYYY-MM-DD")
  );

  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  const handleDateChange = (data) => {
    console.log("click", data);
    setDateForMeeting(data);
    // setState({ ...state, [right]: open });
  };

  const { getDateWiseMeetingData, getDateWiseMeetingLoading } = useSelector(
    (state) => state.getDateWiseMeeting
  );
  // console.log("date", getDateWiseMeetingData?.data.length);
  const { isMeetingDeleted } = useSelector((state) => state.deleteMeeting);

  useEffect(() => {
    setDefaultLoader(true);

    if (isMeetingDeleted) {
      console.log(isMeetingDeleted);
      alert.error("Meeting Deleted Successfully!");

      dispatch({ type: DELETE_MEETING_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }
    // if (loungeTimingToggleSuccess) {
    //   // alert.success("Student Added Successfully");
    //   // navigate("/course");
    //   //   setState({ right: false });
    //   // dispatch(loadCourseData(token.accessToken, 1));
    //   // console.log("success", loungeTimingToggleSuccess);
    //   dispatch({ type: TOGGLE_LOUNGE_TIMING_RESET });
    //   dispatch(loungeTimingToggleFunc(token?.access_token));
    // }

    const myForm = new FormData();

    myForm.set("date", dateForMeeting);

    if (token != null) {
      dispatch(getDateWiseMeetingFunc(token?.access_token, myForm));
    }
  }, [dispatch, token, dateForMeeting, isMeetingDeleted, alert]);
  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {getDateWiseMeetingLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Meeting List</h1>
                  <div>
                    <Button
                      style={{ background: "#023047", marginRight: "5px" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Book Meeting
                    </Button>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-6">
                    <label>Date of Birth</label>
                    {/* <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}
                    <input
                      name="dob"
                      type="date"
                      className="form-control"
                      onChange={(e) => handleDateChange(e.target.value)}
                      defaultValue={dateForMeeting}
                      // {...register("dob")}
                      // className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                    />
                    {/* <span className="text-danger">{errors.dob?.message}</span> */}
                  </div>
                </div>
                {!defaultLoader ? (
                  <NewLoader />
                ) : (
                  <div className="row mt-4">
                    {getDateWiseMeetingData?.data.length === 0 ? (
                      <p
                        className="text-center w-100"
                        style={{ fontSize: "25px", fontWeight: "900" }}
                      >
                        No meeting found in {dateForMeeting}
                      </p>
                    ) : (
                      <Fragment>
                        {getDateWiseMeetingData?.data.map((meeting, i) => (
                          <MeetingListCard
                            key={i}
                            meetinglist={meeting}
                          ></MeetingListCard>
                        ))}
                      </Fragment>
                    )}
                  </div>
                )}
              </div>

              <Fragment>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  <AddMeeting
                    setState={setState}
                    handleClick={handleClick}
                  ></AddMeeting>
                </Drawer>
              </Fragment>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default MeetingList;
