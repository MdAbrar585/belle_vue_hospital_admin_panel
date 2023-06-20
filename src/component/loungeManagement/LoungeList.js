import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllLoungeFunc,
  loungeTimingToggleFunc,
} from "../../redux/actions/loungeManagementAction";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Button from "@mui/material/Button";
import LoungeListCard from "./LoungeListCard";
import { Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import AddLounge from "./AddLounge";
import {
  DELETE_LOUNGE_TIMING_RESET,
  DELETE_NEW_LOUNGE_RESET,
  TOGGLE_LOUNGE_TIMING_RESET,
  TOGGLE_NEW_LOUNGE_ACTIVATION_RESET,
} from "../../redux/constants/loungeManagementConstant";
import { useAlert } from "react-alert";
import Setting from "../settings/Setting";
import NewLoader from "../loader/NewLoader";

const LoungeList = () => {
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

  const { loadAllLoungeLoading, loadAllLoungeData, loadAllLoungeError } =
    useSelector((state) => state.loadAllLounge);

  const { isNewLoungeDeleted, deleteNewLoungeError } = useSelector(
    (state) => state.deleteNewLounge
  );

  const { newLoungeActivationToggleSuccess, newLoungeActivationToggleLoading } =
    useSelector((state) => state.newLoungeActivationToggle);

  const { loungeTimingToggleSuccess } = useSelector(
    (state) => state.loungeTimingToggle
  );

  const { isLoungeTimingDeleted } = useSelector(
    (state) => state.deleteLoungeTiming
  );

  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  console.log("loadAllLoungeData == >", loadAllLoungeData?.data);

  useEffect(() => {
    setDefaultLoader(true);

    if (loungeTimingToggleSuccess) {
      // alert.success("Student Added Successfully");
      // navigate("/course");
      //   setState({ right: false });
      // dispatch(loadCourseData(token.accessToken, 1));
      // console.log("success", loungeTimingToggleSuccess);
      dispatch({ type: TOGGLE_LOUNGE_TIMING_RESET });
      dispatch(loungeTimingToggleFunc(token?.access_token));
    }

    if (newLoungeActivationToggleSuccess) {
      // alert.success("Student Added Successfully");
      // navigate("/course");
      setState({ right: false });
      // dispatch(loadCourseData(token.accessToken, 1));
      // console.log("success", newLoungeActivationToggleSuccess);
      dispatch({ type: TOGGLE_NEW_LOUNGE_ACTIVATION_RESET });
      dispatch(loadAllLoungeFunc(token?.access_token));
    }

    if (isNewLoungeDeleted) {
      console.log(isNewLoungeDeleted);
      alert.error("Lounge Deleted Successfully!");

      dispatch({ type: DELETE_NEW_LOUNGE_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    if (isLoungeTimingDeleted) {
      console.log(isLoungeTimingDeleted);
      alert.error("Lounge Timing Deleted Successfully!");

      dispatch({ type: DELETE_LOUNGE_TIMING_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    if (token != null) {
      dispatch(loadAllLoungeFunc(token?.access_token));
    }
  }, [
    dispatch,
    token,
    isNewLoungeDeleted,
    alert,
    newLoungeActivationToggleSuccess,
    isLoungeTimingDeleted,
    loungeTimingToggleSuccess,
  ]);

  return (
    <>
      {!defaultLoader ? (
        <NewLoader />
      ) : (
        <>
          {loadAllLoungeLoading ? (
            <NewLoader />
          ) : (
            <Sidebar>
              <Navbar />

              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Lounge List</h1>
                  <div>
                    <Button
                      style={{ background: "#023047", marginRight: "5px" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Add Lounge
                    </Button>
                  </div>
                </div>
                <Setting />
                <div className="row mt-4">
                  {loadAllLoungeData?.data.map((lounge, i) => (
                    <LoungeListCard key={i} lounglist={lounge}></LoungeListCard>
                  ))}
                </div>
              </div>

              <Fragment>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  <AddLounge
                    setState={setState}
                    handleClick={handleClick}
                  ></AddLounge>
                </Drawer>
              </Fragment>
            </Sidebar>
          )}
        </>
      )}
    </>
  );
};

export default LoungeList;
