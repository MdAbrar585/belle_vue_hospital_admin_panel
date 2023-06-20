import React from "react";
import edit from "../../assets/icons/back-in-time.png";
import active from "../../assets/icons/check_1.png";
import deactive from "../../assets/icons/disable.png";
import deleteIcon from "../../assets/icons/delete_w.png";
import { Typography } from "@mui/material";
import { Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import SetLoungeTiming from "./SetLoungeTiming";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  deleteNewLoungeFunc,
  newLoungeActivationToggleFunc,
} from "../../redux/actions/loungeManagementAction";
import Tooltip from "@mui/material/Tooltip";
import { deleteMeetingFunc } from "../../redux/actions/meetingManagementAction";

const MeetingListCard = ({ meetinglist }) => {
  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [loungId, setLoungeId] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));


  //   const handleSetTime = (data) => {
  //     console.log("Set The Time!", data);
  //   };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteMeetingFunc(token?.access_token, loungId));
      ////console.log("Deleted");
    }
    // console.log("No");

    setDeleteDialogOpen(false);
  };

  const handlToggleDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(newLoungeActivationToggleFunc(token?.access_token, loungId));
      ////console.log("Deleted");
    }
    // console.log("No");

    setToggleDialogOpen(false);
  };

  const handleToggle = (deleteData) => {
    //console.log(delteData);
    setLoungeId(deleteData);
    setToggleDialogOpen(true);
  };

  const handleDelete = (deleteData) => {
    //console.log(delteData);
    setLoungeId(deleteData);
    setDeleteDialogOpen(true);
  };

  const handleClick = (right, open, data) => {
    console.log("click", data);
    setLoungeId(data);
    setState({ ...state, [right]: open });
  };

  return (
    <div className="col-md-3">
      <div
        style={{ backgroundColor: "#023047" }}
        className="d-flex justify-content-between w-100 dash-card"
      >
        <div>
          <h5>Meeting Name : {meetinglist.name} </h5>
          <h6>Date : {meetinglist.date}</h6>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            Guests : {meetinglist.guests}
          </Typography>
        </div>

        <div className="d-flex align-items-end">
          <div className="d-flex">
            {/* {meetinglist.is_active === 0 ? (
              <Tooltip title="Not Active Yet! Click Here To Active.">
                <img
                  src={active}
                  alt=""
                  //   onClick={() => handleToggle(lounglist.id)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Click Here To Deactive.">
                <img
                  src={deactive}
                  alt=""
                  //   onClick={() => handleToggle(lounglist.id)}
                />
              </Tooltip>
            )}

            <img
              style={{ marginLeft: "5px" }}
              src={edit}
              alt=""
              //   onClick={() => handleClick("right", true, lounglist.id)}
            /> */}
            <img
              style={{ marginLeft: "5px" }}
              src={deleteIcon}
              alt=""
                onClick={() => handleDelete(meetinglist.id)}
            />
          </div>
        </div>
      </div>
      <Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do you want to delete this Meeting?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you click yes lounge will be deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", padding: "40px" }}>
            <Button
              style={{
                backgroundColor: "#023047",
                padding: "12px 42px 12px 42px",
                color: "#fff",
              }}
              onClick={() => handleDeleteDialogClose("Yes")}
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
              onClick={() => handleDeleteDialogClose("No")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default MeetingListCard;
