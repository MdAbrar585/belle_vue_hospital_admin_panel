import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllSettingsFunc,
  toggleLoungeMeetingSettingFunc,
} from "../../redux/actions/settingsAction";
import { TOGGLE_LOUNGE_MEETING_RESET } from "../../redux/constants/settingsConstant";
import { useAlert } from "react-alert";
import Loader from "../loader/Loader";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Setting = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [tState, setTState] = useState(false);

  const handleToggleClick = (d) => {
    console.log("click", d);
    setToggleDialogOpen(true);
  };

  const handlToggleDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(toggleLoungeMeetingSettingFunc(token?.access_token));
      ////console.log("Deleted");
    }
    // console.log("No");

    setToggleDialogOpen(false);
  };

  //   const handleToggle = (deleteData) => {
  //     //console.log(delteData);
  //     // setLoungeId(deleteData);
  //     setToggleDialogOpen(true);
  //   };

  const { toggleLoungeMeetingData, toggleLoungeMeetingSuccess } = useSelector(
    (state) => state.toggleLoungeMeeting
  );

  const { allSettingsLoading, allSettingsData, allSettingsError } = useSelector(
    (state) => state.loadAllSettings
  );
  console.log(allSettingsData);
  useEffect(() => {
    setDefaultLoader(true);
    if (toggleLoungeMeetingSuccess) {
      //   console.log(toggleLoungeMeetingData?.data[0]);
      if (toggleLoungeMeetingData?.data[0].status === 0) {
        alert.success("Lounge and Meeting Deactive Successfully!");
      } else {
        alert.success("Lounge and Meeting Active Successfully!");
      }
      // navigate("/course");
      //   setState({ right: false });
      // dispatch(loadCourseData(token.accessToken, 1));
      // console.log("success", toggleLoungeMeetingSuccess);
      dispatch({ type: TOGGLE_LOUNGE_MEETING_RESET });
      //   dispatch(loungeTimingToggleFunc(token?.access_token));
    }

    // if (isLoungeTimingDeleted) {
    //   console.log(isLoungeTimingDeleted);
    //   alert.error("Lounge Timing Deleted Successfully!");

    //   dispatch({ type: DELETE_LOUNGE_TIMING_RESET });
    //   // dispatch(loadCustomer(token?.access_token));
    // }

    if (token != null) {
      dispatch(loadAllSettingsFunc(token?.access_token));
    }
  }, [
    dispatch,
    token,
    toggleLoungeMeetingSuccess,
    alert,
    toggleLoungeMeetingData?.data,
  ]);
  return (
    <>
      <div className="mt-3">
        {/* <h1>Setting</h1> */}
        {!defaultLoader ? (
          <Loader />
        ) : (
          <>
            {allSettingsData?.data.length === 0 ? (
              <p>There Is No Settings Available.</p>
            ) : (
              <FormGroup>
                {allSettingsData?.data[0].status === 0 ? (
                  <FormControlLabel
                    control={<Switch {...label} unchecked />}
                    label="Toggle Lounge & Meeting Setting"
                    onClick={(e) => handleToggleClick(e.target.value)}
                  />
                ) : (
                  <FormControlLabel
                    control={<Switch {...label} checked />}
                    label="Toggle lounge meeting setting"
                    onClick={(e) => handleToggleClick(e.target.value)}
                  />
                )}
              </FormGroup>
            )}
          </>
        )}
      </div>
      <Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={toggleDialogOpen}
          onClose={handlToggleDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"If You Want To Confirm Click Yes!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* If you click yes lounge will be deleted. */}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
            <Button
              style={{
                backgroundColor: "#023047",
                padding: "12px 42px 12px 42px",
                color: "#fff",
              }}
              onClick={() => handlToggleDialogClose("Yes")}
              autoFocus
            >
              Yes
            </Button>
            <Button
              style={{
                backgroundColor: "#023047",
                padding: "12px 42px 12px 42px",
                color: "#fff",
              }}
              autoFocus
              onClick={() => handlToggleDialogClose("No")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </>
  );
};

export default Setting;
