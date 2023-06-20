import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
// import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CreateSpecialDay from "./CreateSpecialDay";
import SpecialDayCard from "./SpecialDayCard";
import {
  deleteSpecialDayfunc,
  loadSpecialDay,
} from "../../redux/actions/specialDayAction";
import SendSpecialDayWish from "./SendSpecialDayWish";
import { DELETE_SPECIAL_DAY_RESET } from "../../redux/constants/specialDayConstant";
import { useAlert } from "react-alert";
import NewLoader from "../loader/NewLoader";
import { Pagination, Stack } from "@mui/material";

const SpecialDayList = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // const [specialDayId, setSpecialDayId] = useState("");

  const [state, setState] = useState({ right: false });

  const [stateSendWish, setStateSendWish] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const toggleDrawerSendWish = (anchor, open) => (event) => {
    setStateSendWish({ ...state, [anchor]: open });
  };

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (right, open) => {
    // console.log("click");
    setState({ ...state, [right]: open });
  };

  const handleClickSendWish = (right, open) => {
    // console.log("click");
    setStateSendWish({ ...state, [right]: open });
  };

  console.log(token?.access_token);

  // const studentData = {
  //   data: [],
  //   count: 12,
  //   totalPage: 2,
  //   limit: 10,
  //   page: 1,
  // };
  const [pages, setPages] = useState(1);
  const handleChange = (e, p) => {
    console.log(p);
    setPages(p);
    // _DATA.jump(p);
  };

  const handleDeleteDialogClose = (param) => {
    if (param === "Yes") {
      console.log("Yes");
      dispatch(deleteSpecialDayfunc(token?.access_token));
      ////console.log("Deleted");
    }
    // console.log("No");

    setDeleteDialogOpen(false);
  };
  const { specialDayLoading, specialDayData } = useSelector(
    (state) => state.loadSpecialDay
  );

  const { isSpecialDayDeleted } = useSelector(
    (state) => state.deleteSpecialDay
  );

  // const handleDelete = (deleteData) => {
  //   //console.log(delteData);
  //   setSpecialDayId(deleteData);
  //   setDeleteDialogOpen(true);
  // };

  console.log(specialDayData);

  useEffect(() => {
    setDefaultLoader(true);

    if (isSpecialDayDeleted) {
      console.log(isSpecialDayDeleted);
      alert.error("Special Day Deleted Successfully!");

      dispatch({ type: DELETE_SPECIAL_DAY_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    const myForm = new FormData();
    myForm.set("per_page", 6);
    myForm.set("page_number", pages);

    if (token != null) {
      dispatch(loadSpecialDay(token?.access_token,myForm));
    }
  }, [dispatch, token, isSpecialDayDeleted, alert,pages]);

  return (
    <Sidebar>
      <div>
        <Navbar />
        {!defaultLoader ? (
          <NewLoader />
        ) : (
          <>
            {specialDayLoading ? (
              <NewLoader />
            ) : (
              <div className="m-4">
                <div className="d-flex justify-content-between">
                  <h1>Special Day Dashboard</h1>
                  <div>
                    <Button
                      style={{ background: "#023047", marginRight: "5px" }}
                      onClick={() => handleClick("right", true)}
                      variant="contained"
                    >
                      Create A Wish
                    </Button>

                    <Button
                      style={{ background: "#023047" }}
                      onClick={() => handleClickSendWish("right", true)}
                      variant="contained"
                    >
                      Send A Wish
                    </Button>
                  </div>
                </div>
                <Stack spacing={2}>
                    <Pagination
                      className="mt-2 mr-4"
                      count={specialDayData?.meta?.last_page}
                      variant="outlined"
                      shape="rounded"
                      size="small"
                      page={pages}
                      color="info"
                      onChange={handleChange}
                      hidePrevButton
                      hideNextButton
                    />
                  </Stack>

                <div className="row mt-4">
                  {specialDayData.data.map((special, i) => (
                    <SpecialDayCard
                      key={i}
                      specialDay={special}
                      specialDayData={specialDayData}
                      setState={setState}
                    ></SpecialDayCard>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <Fragment>
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
            <DialogActions
              style={{ justifyContent: "center", padding: "40px" }}
            >
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

          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            <CreateSpecialDay
              pages={pages}
              setState={setState}
              handleClick={handleClick}
            ></CreateSpecialDay>
          </Drawer>

          <Drawer
            anchor={"right"}
            open={stateSendWish["right"]}
            onClose={toggleDrawerSendWish("right", false)}
          >
            <SendSpecialDayWish
              pages={pages}
              setStateSendWish={setStateSendWish}
              handleClickSendWish={handleClickSendWish}
            ></SendSpecialDayWish>
          </Drawer>
        </Fragment>
      </div>
    </Sidebar>
  );
};

export default SpecialDayList;
