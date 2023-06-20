import React from "react";
import edit from "../../assets/icons/back-in-time.png";
import active from "../../assets/icons/check_1.png";
import deactive from "../../assets/icons/disable.png";
import deleteIcon from "../../assets/icons/delete_w.png";
import { Typography } from "@mui/material";
import { Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SetLoungeTiming from "./SetLoungeTiming";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { deleteNewLoungeFunc, newLoungeActivationToggleFunc } from "../../redux/actions/loungeManagementAction";
import Tooltip from "@mui/material/Tooltip";

const LoungeListCard = ({ lounglist }) => {
  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // let [defaultLoader, setDefaultLoader] = useState(false);

  const [state, setState] = useState({ right: false });

  const [loungId, setLoungeId] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);

  const { isOpen } = useSelector((state) => state.toggleSidebar);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  console.log("lounglist==)>>>", lounglist);

  //   const handleSetTime = (data) => {
  //     console.log("Set The Time!", data);
  //   };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteNewLoungeFunc(token?.access_token, loungId));
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
        style={{ backgroundColor: "#023047", width: isOpen ? "256px" : "100%" }}
        className="d-flex justify-content-between dash-card"
      >
        <div>
          <h4>{lounglist.name}</h4>
          <h6>Total Capacity : {lounglist.capacity}</h6>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            Address : {lounglist.address}
          </Typography>
        </div>

        <div className="d-flex align-items-end">
          <div className="d-flex">
            {lounglist.is_active === 0 ? (
              <Tooltip title="Not Active Yet! Click Here To Active.">
                <img
                  src={active}
                  alt=""
                  onClick={() => handleToggle(lounglist.id)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Click Here To Deactive.">
                <img
                  src={deactive}
                  alt=""
                  onClick={() => handleToggle(lounglist.id)}
                />
              </Tooltip>
            )}

            <img
              style={{ marginLeft: "5px" }}
              src={edit}
              alt=""
              onClick={() => handleClick("right", true, lounglist.id)}
            />
            <img
              style={{ marginLeft: "5px" }}
              src={deleteIcon}
              alt=""
              onClick={() => handleDelete(lounglist.id)}
            />
          </div>
        </div>
      </div>

      <Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <SetLoungeTiming
            loungId={loungId}
            setState={setState}
            handleClick={handleClick}
          ></SetLoungeTiming>
        </Drawer>

        <Dialog
          fullScreen={fullScreen}
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="responsive-dialog-title"
          style={{ textAlign: "center", width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Do you want to delete this Lounge?"}
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
    </div>
  );
};

export default LoungeListCard;
